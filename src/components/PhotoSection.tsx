'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  collection, query, where, onSnapshot,
  addDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

// ── Constants ──────────────────────────────────────────────────────────────────
const MAX_DIMENSION = 3200;
const JPEG_QUALITY  = 0.82;
const COLLECTION    = 'photos';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Photo {
  id: string;
  date: string;
  time: string;
  estimated: boolean;
  filename: string;
  url: string;
  storagePath: string;
}

interface DateTimeResult {
  date: string;
  time: string;
  estimated?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }

function fmtTime(t: string) {
  if (!t) return '';
  const [hStr, m] = t.split(':');
  const h   = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = h % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function parseExifDateTime(str: string): DateTimeResult | null {
  const m = /^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/.exec(str);
  if (!m) return null;
  return { date: `${m[1]}-${m[2]}-${m[3]}`, time: `${m[4]}:${m[5]}:${m[6]}` };
}

function fallbackDateTime(): DateTimeResult {
  const d = new Date();
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
    estimated: true,
  };
}

async function readExifDate(file: File): Promise<DateTimeResult | null> {
  if (!/^image\/jpe?g$/i.test(file.type)) return null;
  try {
    const exifr = await import('exifr');
    const tags  = await exifr.parse(file, ['DateTimeOriginal', 'DateTime']);
    const raw   = tags?.DateTimeOriginal || tags?.DateTime;
    if (!raw) return null;
    if (raw instanceof Date) {
      return {
        date: `${raw.getFullYear()}-${pad(raw.getMonth() + 1)}-${pad(raw.getDate())}`,
        time: `${pad(raw.getHours())}:${pad(raw.getMinutes())}:${pad(raw.getSeconds())}`,
      };
    }
    return parseExifDateTime(String(raw));
  } catch {
    return null;
  }
}

function resizeToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width: w, height: h } = img;
      if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
        if (w > h) { h = Math.round(h * (MAX_DIMENSION / w)); w = MAX_DIMENSION; }
        else        { w = Math.round(w * (MAX_DIMENSION / h)); h = MAX_DIMENSION; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('canvas.toBlob failed'));
      }, 'image/jpeg', JPEG_QUALITY);
    };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

function sanitizeFilename(name: string) {
  return (name || 'photo.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function uploadPhoto(file: File): Promise<Photo | null> {
  if (!/^image\//.test(file.type)) return null;
  const exifDT = await readExifDate(file);
  const dt     = exifDT ?? fallbackDateTime();
  let blob: Blob;
  try { blob = await resizeToBlob(file); }
  catch { return null; }
  const path  = `photos/${dt.date}/${Date.now()}-${sanitizeFilename(file.name)}`;
  const sRef  = storageRef(storage, path);
  await uploadBytes(sRef, blob, { contentType: 'image/jpeg' });
  const url   = await getDownloadURL(sRef);
  const docData = {
    date: dt.date, time: dt.time, estimated: !!dt.estimated,
    filename: file.name, url, storagePath: path,
    addedAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTION), docData);
  return { id: docRef.id, ...docData } as Photo;
}

async function removePhoto(id: string, storagePath: string) {
  try { await deleteDoc(doc(db, COLLECTION, id)); } catch { /* ignore */ }
  try { await deleteObject(storageRef(storage, storagePath)); } catch { /* ignore */ }
}

// ── Lightbox ───────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="photo-lightbox" onClick={onClose}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function PhotoSection({ date }: { date: string }) {
  const [photos,   setPhotos]   = useState<Photo[]>([]);
  const [status,   setStatus]   = useState('');
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Real-time listener — updates when anyone uploads from another device
  useEffect(() => {
    const q     = query(collection(db, COLLECTION), where('date', '==', date));
    const unsub = onSnapshot(q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Photo));
        items.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        setPhotos(items);
      },
      () => setStatus('Could not load photos.')
    );
    return unsub;
  }, [date]);

  const handleFiles = useCallback(async (files: File[]) => {
    const imageFiles = files.filter((f) => /^image\//.test(f.type));
    if (!imageFiles.length) { setStatus('No image files found.'); return; }
    setStatus(`Uploading ${imageFiles.length} photo${imageFiles.length > 1 ? 's' : ''}…`);
    let done = 0;
    for (const f of imageFiles) {
      try { if (await uploadPhoto(f)) done++; } catch { /* skip */ }
    }
    setStatus(`${done} of ${imageFiles.length} photo${imageFiles.length > 1 ? 's' : ''} uploaded.`);
  }, []);


  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) handleFiles(Array.from(e.target.files));
    e.target.value = '';
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files.length) handleFiles(Array.from(e.dataTransfer.files));
  }

  return (
    <div className="photos-section">
      <h3>Photos from this day</h3>
      <p className="photos-note">
        Shared with everyone — photos sort automatically by the date the photo was taken.
      </p>

            {/* Web: drag-and-drop zone (native handled by PhotoFabButton) */}
      <div
        className={`photo-dropzone${dragging ? ' dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
        onDragOver={(e)  => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
        onDrop={onDrop}
      >
        <span className="dz-label">Drop photos here or click to add</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={onInputChange}
        />
      </div>

      {status && <div className="photo-status">{status}</div>}

      {/* Gallery */}
      {photos.length === 0 ? (
        <div className="photo-empty">No photos added for this day yet.</div>
      ) : (
        <div className="photo-grid">
          {photos.map((p) => (
            <div key={p.id} className="photo-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.filename}
                loading="lazy"
                onClick={() => setLightbox(p)}
              />
              <div className="photo-cap">
                <span>
                  {fmtTime(p.time)}
                  {p.estimated && (
                    <em title="No camera date found — using upload date"> (est.)</em>
                  )}
                </span>
                <button
                  type="button"
                  className="photo-del"
                  title="Remove photo"
                  onClick={() => removePhoto(p.id, p.storagePath)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <Lightbox src={lightbox.url} alt={lightbox.filename} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
