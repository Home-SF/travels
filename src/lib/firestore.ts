// ============================================================
// Travel App — Firestore data service (client-side)
// Replaces src/lib/data.ts (which used fs/JSON reads at build time)
// All functions are async and safe to call from 'use client' components.
// ============================================================
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Trip, TripCity, TripStop, Day, DayEvent, DayFlight, Restaurant, Activity } from '@/types';
import { getCityColors } from '@/lib/cityColors';

// ── Firestore raw shape helpers ──────────────────────────────

function normalizeTripCity(raw: DocumentData, slug: string): TripCity {
  const colors = getCityColors(slug);
  return {
    slug,
    name:         raw.name        ?? slug,
    color:        raw.color       ?? colors.color,
    colorSoft:    raw.colorSoft   ?? colors.colorSoft,
    hotel:        raw.hotel       ?? raw.hotelName ?? '',
    hotelAddress: raw.hotelAddress ?? '',
    dates:        raw.dates       ?? '',
    lat:          raw.lat         ?? 0,
    lon:          raw.lon         ?? raw.lng ?? 0,
    arrival:      raw.arrival     ?? '',
  } as TripCity;
}

function normalizeTrip(raw: DocumentData, slug: string): Trip {
  // Travelers can be strings or {name, email, id} objects in Firestore
  const rawTravelers: unknown[] = raw.travelers ?? [];
  const travelers: string[] = rawTravelers.map(t =>
    typeof t === 'string' ? t : (t as { name?: string }).name ?? ''
  ).filter(Boolean);

  // Cities stored as array or map
  let cities: TripCity[] = [];
  if (Array.isArray(raw.cities)) {
    cities = raw.cities.map((c: DocumentData) =>
      normalizeTripCity(c, c.slug ?? c.id ?? '')
    );
  } else if (raw.cities && typeof raw.cities === 'object') {
    cities = Object.entries(raw.cities).map(([citySlug, cData]) =>
      normalizeTripCity(cData as DocumentData, citySlug)
    );
  }

  // Inject colors where missing
  cities = cities.map(c => {
    if (!c.color || c.color === '') {
      const colors = getCityColors(c.slug);
      return { ...c, color: colors.color, colorSoft: colors.colorSoft };
    }
    return c;
  });

  // Dates: prefer top-level dates string, else build from dates.start/end
  let datesStr: string = raw.dates ?? '';
  if (!datesStr && raw.dates && typeof raw.dates === 'object') {
    const { start, end } = raw.dates as { start?: string; end?: string };
    datesStr = [start, end].filter(Boolean).join(' – ');
  }

  // Year
  const year: number = raw.year ??
    (raw.startDate ? new Date(raw.startDate).getFullYear() :
    (datesStr ? parseInt(datesStr.slice(-4)) : new Date().getFullYear()));

  // Route
  const route: TripStop[] = (raw.route ?? []).map((s: DocumentData) => ({
    code: s.code ?? s.iata ?? '',
    city: s.city ?? s.name ?? '',
    date: s.date ?? '',
  }));

  return {
    slug,
    title:     raw.title    ?? slug,
    subtitle:  raw.subtitle ?? '',
    dates:     datesStr,
    year,
    coverCity: raw.coverCity ?? (cities[0]?.slug ?? ''),
    startDate: raw.startDate ?? raw.start ?? '',
    travelers,
    route,
    cities,
  };
}

// ── Day normalization ────────────────────────────────────────
// Firestore days (old trips) use kicker/displayDate/isTravel field names.
// New trips use title/label/dayNum. We normalize to the TypeScript Day type.

function normalizeDay(
  raw: DocumentData,
  dayNum: number,
  prevDate?: string,
  nextDate?: string
): Day {
  const events: DayEvent[] = (raw.events ?? raw.schedule ?? []).map((e: DocumentData) => ({
    time:          e.time         ?? '',
    title:         e.title        ?? e.name ?? '',
    note:          e.note         ?? e.description ?? undefined,
    address:       e.address      ?? undefined,
    metroStation:  e.metroStation ?? undefined,
    mapUrl:        e.mapUrl       ?? undefined,
    placeholder:   e.placeholder  ?? false,
    links:         e.links        ?? undefined,
  }));

  const flights: DayFlight[] = (raw.flights ?? []).map((f: DocumentData) => ({
    flightNum: f.flightNum ?? f.flight ?? '',
    route:     f.route     ?? '',
    seats:     (f.seats ?? []).map((s: DocumentData) => ({
      name:  s.name  ?? '',
      seat:  s.seat  ?? '',
      class: s.class ?? undefined,
    })),
  }));

  // Support both new schema (label, title) and old Firestore schema (displayDate, kicker)
  const label   = raw.label   ?? raw.displayDate ?? raw.date ?? '';
  const title   = raw.title   ?? raw.kicker      ?? label;
  const weekday = raw.weekday ?? '';

  return {
    date:       raw.date  ?? '',
    label,
    weekday,
    dayNum:     raw.dayNum ?? dayNum,
    city:       raw.city   ?? raw.citySlug ?? '',
    title,
    subtitle:   raw.subtitle   ?? undefined,
    sunsetTime: raw.sunsetTime ?? undefined,
    holiday:    raw.holiday    ?? undefined,
    hotel:      raw.hotel      ?? undefined,
    flights:    flights.length > 0 ? flights : undefined,
    events,
    prevDate:   prevDate ?? raw.prevDate ?? undefined,
    nextDate:   nextDate ?? raw.nextDate ?? undefined,
  };
}

// ── Public fetch functions ───────────────────────────────────

export async function fetchAllTrips(): Promise<Trip[]> {
  const snap = await getDocs(collection(db, 'trips'));
  const trips = snap.docs.map(d => normalizeTrip(d.data(), d.id));
  return trips.sort((a, b) =>
    (a.startDate ?? '9999').localeCompare(b.startDate ?? '9999')
  ).reverse(); // newest first
}

export async function fetchTrip(slug: string): Promise<Trip> {
  const snap = await getDoc(doc(db, 'trips', slug));
  if (!snap.exists()) throw new Error(`Trip not found: ${slug}`);
  return normalizeTrip(snap.data(), slug);
}

export async function fetchDays(tripSlug: string, city?: string): Promise<Day[]> {
  const colRef = collection(db, 'trips', tripSlug, 'days');
  const q = city
    ? query(colRef, where('city', '==', city), orderBy('date'))
    : query(colRef, orderBy('date'));

  const snap = await getDocs(q);
  type RawDay = DocumentData & { id: string; date?: string };
  const rawDays: RawDay[] = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Compute prevDate / nextDate from the sorted list
  return rawDays.map((raw, idx) =>
    normalizeDay(
      raw,
      idx + 1,
      idx > 0                  ? rawDays[idx - 1].date : undefined,
      idx < rawDays.length - 1 ? rawDays[idx + 1].date : undefined
    )
  );
}

export async function fetchDay(tripSlug: string, date: string): Promise<Day | undefined> {
  // Fetch all days to get prev/next context
  const all = await fetchDays(tripSlug);
  return all.find(d => d.date === date);
}

export async function fetchRestaurants(tripSlug: string, city?: string): Promise<Restaurant[]> {
  const colRef = collection(db, 'trips', tripSlug, 'restaurants');
  const snap = await getDocs(colRef);
  const all = snap.docs.map(d => {
    const raw = d.data();
    return {
      id:           d.id,
      num:          raw.num          ?? 0,
      city:         raw.city         ?? '',
      name:         raw.name         ?? '',
      address:      raw.address      ?? '',
      neighborhood: raw.neighborhood ?? '',
      hours:        raw.hours        ?? '',
      reserved:     raw.reserved     ?? false,
      visitNote:    raw.visitNote    ?? undefined,
      cancelNote:   raw.cancelNote   ?? undefined,
      lat:          raw.lat          ?? undefined,
      lon:          raw.lon ?? raw.lng ?? undefined,
      links:        raw.links        ?? {},
    } as Restaurant;
  });
  return city ? all.filter(r => r.city === city) : all;
}

export async function fetchActivities(tripSlug: string, city?: string): Promise<Activity[]> {
  const colRef = collection(db, 'trips', tripSlug, 'activities');
  const snap = await getDocs(colRef);
  const all = snap.docs.map(d => {
    const raw = d.data();
    return {
      id:           d.id,
      city:         raw.city         ?? '',
      name:         raw.name         ?? '',
      address:      raw.address      ?? '',
      hours:        raw.hours        ?? '',
      fee:          raw.fee          ?? '',
      facts:        raw.facts        ?? [],
      website:      raw.website      ?? '',
      planned:      raw.planned      ?? false,
      lat:          raw.lat          ?? undefined,
      lon:          raw.lon ?? raw.lng ?? undefined,
      neighborhood: raw.neighborhood ?? undefined,
    } as Activity;
  });
  return city ? all.filter(a => a.city === city) : all;
}

// ── Static param helpers (for generateStaticParams) ──────────
// These read trips-config.json (not Firestore) at build time
// so Next.js static export can enumerate routes.

import tripsConfig from '@/config/trips-config.json';

export function staticTripSlugs(): { tripSlug: string }[] {
  return tripsConfig.map(t => ({ tripSlug: t.slug }));
}

export function staticCitySlugs(tripSlug: string): { city: string }[] {
  const trip = tripsConfig.find(t => t.slug === tripSlug);
  return (trip?.cities ?? []).map(city => ({ city }));
}
