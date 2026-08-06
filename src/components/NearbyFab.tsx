'use client';

import { useState } from 'react';

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16`,
      { headers: { Accept: 'application/json' } }
    );
    const data = await res.json();
    return data?.display_name ?? null;
  } catch {
    return null;
  }
}

export default function NearbyFab() {
  const [status, setStatus] = useState('');

  async function handleClick() {
    if (!navigator.geolocation) {
      setStatus("Location isn't available in this browser.");
      return;
    }
    setStatus('Finding your location…');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        const address = await reverseGeocode(lat, lon);
        const whereText = address ?? `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
        const question =
          `I'm currently near ${whereText}. What's within easy walking distance — ` +
          `restaurants, cafes, parks, and interesting sights? Please suggest a few options with a short description of each.`;
        try {
          await navigator.clipboard.writeText(question);
          window.open('https://claude.ai', '_blank');
          setStatus('Question copied — paste it (Cmd/Ctrl+V) in the new Claude tab.');
        } catch {
          window.open('https://claude.ai', '_blank');
          setStatus(`Copy this into Claude: "${question}"`);
        }
      },
      () => setStatus('Location permission was denied or unavailable.'),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }

  return (
    <>
      {status && <div className="nearby-status">{status}</div>}
      <button type="button" className="nearby-fab" onClick={handleClick}>
        &#128506; What&apos;s Nearby?
      </button>
    </>
  );
}
