'use client';
import { useEffect, useState } from 'react';
import {
  collection, query, where, onSnapshot,
  deleteDoc, doc,
} from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

// ── Constants ──────────────────────────────────────────────────────────────────
const COLLECTION = 'photos';

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

// ── Helpers ────────────────────────────────────────────────────────────────────
function fmtTime(t: string) {
  if (!t) return '';
  const [hStr, m] = t.split(':');
  const h    = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = h % 12 || 12;
  return `${h12}:${m} ${ampm}`;
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
  const [error,    setError]    = useState('');
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    const q     = query(collection(db, COLLECTION), where('date', '==', date));
    const unsub = onSnapshot(q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Photo));
        items.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        setPhotos(items);
      },
      () => setError('Could not load photos.')
    );
    return unsub;
  }, [date]);

  return (
    <div className="photos-section">
      <h3>Photos from this day</h3>
      <p className="photos-note">
        Tap &ldquo;Add Photos&rdquo; to upload — photos sort automatically by when they were taken.
      </p>

      {error && <div className="photo-status">{error}</div>}

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
