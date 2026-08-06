'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Capacitor } from '@capacitor/core';
import {
  collection, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

const MAX_DIMENSION = 3200;
const JPEG_QUALITY  = 0.82;
const COLLECTION    = 'photos';

function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }

function parseExifDateTime(str: string) {
  const m = /^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/.exec(str);
  if (!m) return null;
  return { date: `${m[1]}-${m[2]}-${m[3]}`, time: `${m[4]}:${m[5]}:${m[6]}` };
}

function fallbackDateTime() {
  const d = new Date();
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
    estimated: true,
  };
}

async function readExifDate(file: File) {
  if (!/^image\/jpe?g$/i.test(file.type)) return null;
  try {
    const exifr = await import('exifr');
    const tags  = await exifr.parse(file, ['DateTimeOriginal', 'DateTime']);
    const raw   = tags?.DateTimeOriginal || tags?.DateTime;
    if (!raw) return null;
    if (raw instanceof Date) {
      return {
        date: `${raw.getFullYear()}-${pad(raw.getMonth()+1)}-${pad(raw.getDate())}`,
        time: `${pad(raw.getHours())}:${pad(raw.getMinutes())}:${pad(raw.getSeconds())}`,
      };
    }
    return parseExifDateTime(String(raw));
  } catch { return null; }
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
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('toBlob failed')), 'image/jpeg', JPEG_QUALITY);
    };
    img.onerror = e => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

async function uploadPhoto(file: File) {
  if (!/^image\//.test(file.type)) return;
  const dt   = (await readExifDate(file)) ?? fallbackDateTime();
  const blob = await resizeToBlob(file);
  const path = `photos/${dt.date}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
  const sRef = storageRef(storage, path);
  await uploadBytes(sRef, blob, { contentType: 'image/jpeg' });
  const url  = await getDownloadURL(sRef);
  await addDoc(collection(db, COLLECTION), {
    date: dt.date, time: dt.time, estimated: !!(dt as { estimated?: boolean }).estimated,
    filename: file.name, url, storagePath: path, addedAt: serverTimestamp(),
  });
}

async function pickPhotosNative(): Promise<File[]> {
  const { Camera } = await import('@capacitor/camera');
  const result = await Camera.pickImages({ quality: 90, limit: 0 });
  const files: File[] = [];
  for (let i = 0; i < result.photos.length; i++) {
    const photo = result.photos[i];
    try {
      const blob = await fetch(photo.webPath!).then(r => r.blob());
      files.push(new File([blob], `photo_${i+1}.jpg`, { type: 'image/jpeg' }));
    } catch { /* skip */ }
  }
  return files;
}

export default function PhotoFabButton() {
  const [mounted, setMounted]   = useState(false);
  const [status,  setStatus]    = useState('');
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => { setMounted(true); }, []);

  if (!isNative || !mounted) return null;

  const slot = document.getElementById('above-fab-slot');
  if (!slot) return null;

  async function onNativePick() {
    try {
      setStatus('Opening photo library…');
      const files = await pickPhotosNative();
      if (!files.length) { setStatus(''); return; }
      setStatus(`Uploading ${files.length} photo${files.length > 1 ? 's' : ''}…`);
      let done = 0;
      for (const f of files) {
        try { await uploadPhoto(f); done++; } catch { /* skip */ }
      }
      setStatus(`${done} of ${files.length} uploaded.`);
      setTimeout(() => setStatus(''), 3000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!msg.includes('cancel')) setStatus('Could not open photo library.');
      else setStatus('');
    }
  }

  return createPortal(
    <>
      {status && <div className="photo-upload-status">{status}</div>}
      <button className="photo-fab" type="button" onClick={onNativePick}>
        📷 Add Photos
      </button>
    </>,
    slot
  );
}
