'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface MapMarker {
  id: string;
  num?: number;
  name: string;
  address: string;
  neighborhood: string;
  lat: number;
  lon: number;
  type: 'restaurant' | 'activity';
  reserved?: boolean;
  href: string;        // link to card page
}

export interface HotelPin {
  name: string;
  address: string;
  lat: number;
  lon: number;
}

interface MapViewProps {
  markers: MapMarker[];
  hotel: HotelPin;
  city: string;
  neighborhoods: string[];
  tripSlug: string;
}

// ── Leaflet loader ─────────────────────────────────────────────────────────────
let leafletLoaded = false;
function loadLeaflet(): Promise<void> {
  if (leafletLoaded || (typeof window !== 'undefined' && (window as Window & { L?: unknown }).L)) {
    leafletLoaded = true;
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => { leafletLoaded = true; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ── Marker icon factories ─────────────────────────────────────────────────────
function makeIcon(L: LType, label: string, color: string, textColor = '#fff') {
  const size = 28;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="14" cy="14" r="13" fill="${color}" stroke="white" stroke-width="2"/>
    <text x="14" y="18.5" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="${textColor}">${label}</text>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

function makeHotelIcon(L: LType) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
    <rect x="2" y="2" width="32" height="32" rx="6" fill="#333" stroke="white" stroke-width="2"/>
    <text x="18" y="23" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="white">H</text>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22],
  });
}

// ── Lazy type for Leaflet ─────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LType = any;
type LeafletMap = ReturnType<LType['map']>;
type LeafletMarker = ReturnType<LType['marker']>;

// ── Component ─────────────────────────────────────────────────────────────────
export default function MapView({ markers, hotel, city, neighborhoods, tripSlug }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<LeafletMap | null>(null);
  const markersRef   = useRef<LeafletMarker[]>([]);

  const [activeType, setActiveType]   = useState<'all' | 'restaurant' | 'activity'>('all');
  const [activeHood, setActiveHood]   = useState<string>('all');
  const [ready, setReady]             = useState(false);

  // Colour scheme per city
  const cityColor = city === 'paris' ? '#E1512B' : city === 'london' ? '#1D4E89' : '#1B7A5C';

  // ── Init map ────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then(() => {
      if (cancelled || !containerRef.current) return;
      const L = (window as Window & { L: LType }).L;

      const map = L.map(containerRef.current, {
        center: [hotel.lat, hotel.lon],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Hotel marker
      const hotelMarker = L.marker([hotel.lat, hotel.lon], { icon: makeHotelIcon(L), zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(`<div class="map-popup"><strong>${hotel.name}</strong><div class="map-popup-addr">${hotel.address}</div><em class="map-popup-tag hotel-tag">Hotel</em></div>`);

      mapRef.current = map;
      markersRef.current = [hotelMarker];

      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Rebuild markers when filter changes ─────────────────────────────────────
  const rebuildMarkers = useCallback(() => {
    if (!mapRef.current || !ready) return;
    const L = (window as Window & { L: LType }).L;
    const map = mapRef.current;

    // Remove all but hotel (index 0)
    markersRef.current.slice(1).forEach(m => m.remove());
    markersRef.current = [markersRef.current[0]];

    const filtered = markers.filter(m => {
      if (activeType !== 'all' && m.type !== activeType) return false;
      if (activeHood !== 'all' && m.neighborhood !== activeHood) return false;
      return true;
    });

    filtered.forEach(m => {
      const isRest = m.type === 'restaurant';
      const label  = m.num != null ? String(m.num) : '•';

      let color: string;
      if (isRest) {
        color = m.reserved ? '#2E7D32' : cityColor;
      } else {
        color = '#6A4FC1'; // purple for activities
      }

      const icon = makeIcon(L, label, color);
      const typeLabel = isRest
        ? (m.reserved ? 'Restaurant · Reserved' : 'Restaurant')
        : 'Sight / Activity';

      const popup = `<div class="map-popup">
        <strong>${m.name}</strong>
        <div class="map-popup-addr">${m.address}</div>
        <em class="map-popup-tag">${typeLabel}</em>
        <a class="map-popup-link" href="${m.href}">View details →</a>
      </div>`;

      const marker = L.marker([m.lat, m.lon], { icon }).addTo(map).bindPopup(popup);
      markersRef.current.push(marker);
    });
  }, [markers, activeType, activeHood, cityColor, ready]);

  useEffect(() => { rebuildMarkers(); }, [rebuildMarkers]);

  // ── Neighbourhood options (sorted) ──────────────────────────────────────────
  const hoodOptions = ['all', ...neighborhoods];

  // ── Counts for toggles ───────────────────────────────────────────────────────
  const restCount = markers.filter(m => m.type === 'restaurant').length;
  const actCount  = markers.filter(m => m.type === 'activity').length;

  return (
    <div className="map-shell">
      {/* ── Toolbar ── */}
      <div className="map-toolbar">
        {/* Type toggle */}
        <div className="map-toggle-group">
          {(['all', 'restaurant', 'activity'] as const).map(t => (
            <button
              key={t}
              className={`map-toggle${activeType === t ? ' active' : ''}`}
              onClick={() => setActiveType(t)}
              style={activeType === t ? { background: cityColor, borderColor: cityColor } : undefined}
            >
              {t === 'all'        ? `All (${restCount + actCount})`   :
               t === 'restaurant' ? `Dining (${restCount})`           :
                                    `Sights (${actCount})`}
            </button>
          ))}
        </div>

        {/* Neighbourhood dropdown */}
        <select
          className="map-hood-select"
          value={activeHood}
          onChange={e => setActiveHood(e.target.value)}
        >
          <option value="all">All areas</option>
          {hoodOptions.slice(1).map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      {/* Legend */}
      <div className="map-legend-strip">
        <span className="map-legend-dot" style={{ background: cityColor }} /> Dining
        <span className="map-legend-dot" style={{ background: '#2E7D32' }} /> Reserved
        <span className="map-legend-dot" style={{ background: '#6A4FC1' }} /> Sight
        <span className="map-legend-dot map-legend-hotel">H</span> Hotel
      </div>

      {/* Map container */}
      <div ref={containerRef} className="map-container" />
    </div>
  );
}
