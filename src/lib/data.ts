// ============================================================
// Travel App — data loading utilities (reads from /data/)
// All functions are synchronous reads at build time (Next.js SSG)
// ============================================================
import fs from 'fs';
import path from 'path';
import { Trip, Restaurant, Activity, Day } from '@/types';

const DATA_ROOT = path.join(process.cwd(), 'data', 'trips');

function readJSON<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

// ── Trips ────────────────────────────────────────────────────

export function getAllTrips(): Trip[] {
  const slugs = fs.readdirSync(DATA_ROOT).filter(d =>
    fs.statSync(path.join(DATA_ROOT, d)).isDirectory()
  );
  return slugs
    .map(slug => readJSON<Trip>(path.join(DATA_ROOT, slug, 'trip.json')))
    .sort((a, b) => (a.startDate ?? '9999').localeCompare(b.startDate ?? '9999'));
}

export function getTrip(slug: string): Trip {
  return readJSON<Trip>(path.join(DATA_ROOT, slug, 'trip.json'));
}

// ── Restaurants ──────────────────────────────────────────────

export function getRestaurants(tripSlug: string, city?: string): Restaurant[] {
  const all = readJSON<Restaurant[]>(
    path.join(DATA_ROOT, tripSlug, 'restaurants.json')
  );
  return city ? all.filter(r => r.city === city) : all;
}

// ── Activities ───────────────────────────────────────────────

export function getActivities(tripSlug: string, city?: string): Activity[] {
  const all = readJSON<Activity[]>(
    path.join(DATA_ROOT, tripSlug, 'activities.json')
  );
  return city ? all.filter(a => a.city === city) : all;
}

// ── Days ─────────────────────────────────────────────────────

export function getDays(tripSlug: string, city?: string): Day[] {
  const all = readJSON<Day[]>(
    path.join(DATA_ROOT, tripSlug, 'days.json')
  );
  return city ? all.filter(d => d.city === city) : all;
}

export function getDay(tripSlug: string, date: string): Day | undefined {
  const all = readJSON<Day[]>(
    path.join(DATA_ROOT, tripSlug, 'days.json')
  );
  return all.find(d => d.date === date);
}

// ── Static param helpers (for Next.js generateStaticParams) ──

export function tripSlugs() {
  return fs.readdirSync(DATA_ROOT)
    .filter(d => fs.statSync(path.join(DATA_ROOT, d)).isDirectory())
    .map(slug => ({ tripSlug: slug }));
}

export function citySlugs(tripSlug: string) {
  const trip = getTrip(tripSlug);
  return trip.cities.map(c => ({ city: c.slug }));
}

export function dateSlugs(tripSlug: string) {
  const days = getDays(tripSlug);
  return days.map(d => ({ date: d.date }));
}
