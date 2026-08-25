// ============================================================
// assets/app.js — Core helpers shared across all pages
// ============================================================

import { db } from './firebase-config.js';
import {
  collection, doc, getDocs, getDoc, query, orderBy, where, limit
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

export { db };

// ── URL params ────────────────────────────────────────────

export function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ── Firestore helpers ─────────────────────────────────────

/** Fetch a single trip document. */
export async function fetchTrip(tripId) {
  const snap = await getDoc(doc(db, 'trips', tripId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Fetch all trips ordered by start date descending. */
export async function fetchAllTrips() {
  const snap = await getDocs(query(collection(db, 'trips'), orderBy('dates.start', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Fetch all days for a trip, ordered by date. */
export async function fetchDays(tripId) {
  const snap = await getDocs(
    query(collection(db, 'trips', tripId, 'days'), orderBy('date', 'asc'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Fetch a single day document. */
export async function fetchDay(tripId, date) {
  const snap = await getDoc(doc(db, 'trips', tripId, 'days', date));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Fetch restaurants for a trip. Optionally filter by city. */
export async function fetchRestaurants(tripId, city = null) {
  let q = collection(db, 'trips', tripId, 'restaurants');
  if (city) {
    q = query(q, where('city', '==', city), orderBy('order', 'asc'));
  } else {
    q = query(q, orderBy('city', 'asc'), orderBy('order', 'asc'));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Fetch activities for a trip. Optionally filter by city. */
export async function fetchActivities(tripId, city = null) {
  let q = collection(db, 'trips', tripId, 'activities');
  if (city) {
    q = query(q, where('city', '==', city), orderBy('order', 'asc'));
  } else {
    q = query(q, orderBy('city', 'asc'), orderBy('order', 'asc'));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Fetch all photos for a trip, ordered by date ascending. */
export async function fetchPhotos(tripId) {
  const snap = await getDocs(
    query(collection(db, 'trips', tripId, 'photos'), orderBy('date', 'asc'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Fetch recent checkins for a trip (most recent first). */
export async function fetchCheckins(tripId, maxCount = 30) {
  const q = query(
    collection(db, 'checkins'),
    where('tripId', '==', tripId),
    orderBy('timestamp', 'desc'),
    limit(maxCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Rendering helpers ─────────────────────────────────────

/** Build the shared site nav. tripLabel is optional e.g. "Paris & London 2026". */
export function renderNav(tripId = null, tripLabel = null, activePage = '') {
  const tripLinks = tripId ? `
    <li><a href="trip.html?id=${tripId}" class="${activePage==='trip'?'active':''}">Overview</a></li>
    <li><a href="restaurants.html?trip=${tripId}" class="${activePage==='restaurants'?'active':''}">Dining</a></li>
    <li><a href="activities.html?trip=${tripId}" class="${activePage==='activities'?'active':''}">Activities</a></li>
    <li><a href="photos.html?trip=${tripId}" class="${activePage==='photos'?'active':''}">Photos</a></li>
    <li><a href="location-map.html?trip=${tripId}" class="${activePage==='map'?'active':''}">Map</a></li>
    <li><a href="live-status.html?trip=${tripId}" class="${activePage==='live'?'active':''}">Live</a></li>
  ` : '';

  const tripLabelHtml = tripLabel
    ? `<span class="site-nav__trip-label">${escHtml(tripLabel)}</span>`
    : '';

  return `
    <nav class="site-nav">
      <div class="site-nav__inner">
        <a class="site-nav__wordmark" href="index.html">Travels<span>✈</span></a>
        <ul class="site-nav__links">
          <li><a href="index.html" class="${activePage==='home'?'active':''}">All Trips</a></li>
          ${tripLinks}
        </ul>
        ${tripLabelHtml}
      </div>
    </nav>
  `;
}

/** Simple loading skeleton. */
export function renderLoading(msg = 'Loading…') {
  return `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>${msg}</p>
    </div>
  `;
}

/** Simple empty state. */
export function renderEmpty(msg = 'Nothing here yet.') {
  return `<div class="empty-state"><p>${msg}</p></div>`;
}

/** Escape HTML entities. */
export function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Format ISO date "2026-08-12" → "August 12, 2026". */
export function fmtDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const names = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December'];
  return `${names[m-1]} ${d}, ${y}`;
}

/** Format ISO date range. */
export function fmtDateRange(start, end) {
  if (!start) return '';
  const s = fmtDate(start);
  if (!end || end === start) return s;
  const [, em, ed] = end.split('-').map(Number);
  const names = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December'];
  return `${s} – ${names[em-1]} ${ed}`;
}

/** City pill HTML. */
export function cityPill(city, label) {
  return `<span class="city-pill ${escHtml(city)}">${escHtml(label || city)}</span>`;
}

/** Render city pills from a trip's cities array. */
export function renderCityPills(cities = []) {
  return cities.map(c => cityPill(c.id, c.name)).join('');
}

/** Render site footer. */
export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <a href="index.html">travels.luckycommons.com</a> · ${year}
    </footer>
  `;
}
