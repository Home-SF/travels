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
  deleteDoc,
  query,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Trip, TripCity, TripStop, Day, DayEvent, DayFlight, Restaurant, Activity } from '@/types';
import { getCityColors } from '@/lib/cityColors';
import tripsConfig from '@/config/trips-config.json';
import citiesConfig from '@/config/cities-config.json';

// ── Module-level cache (browser session; reset on hard refresh) ──────────────
// Caching + in-flight deduplication prevents the hang that occurs when the
// day page tries to fetch data that the trip page already started fetching,
// and avoids duplicate Firestore reads on client-side navigation.

let   _allTrips:       Trip[]       | null = null;
let   _allTripsFetch:  Promise<Trip[]>     | null = null;

const _tripCache:      Map<string, Trip>         = new Map();
const _tripFetching:   Map<string, Promise<Trip>> = new Map();

const _daysCache:      Map<string, Day[]>         = new Map();
const _daysFetching:   Map<string, Promise<Day[]>> = new Map();

const _restCache:      Map<string, Restaurant[]>         = new Map();
const _restFetching:   Map<string, Promise<Restaurant[]>> = new Map();

const _actCache:       Map<string, Activity[]>         = new Map();
const _actFetching:    Map<string, Promise<Activity[]>> = new Map();

const _cityRestCache:     Map<string, Restaurant[]>         = new Map();
const _cityRestFetching:  Map<string, Promise<Restaurant[]>> = new Map();

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

  // Dates: prefer top-level string, else build from dates.start/end object
  let datesStr: string = typeof raw.dates === 'string' ? raw.dates : '';
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

type RawDay = DocumentData & { id: string; date?: string };

function normalizeDay(
  raw: RawDay,
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
  if (_allTrips) return _allTrips;
  if (!_allTripsFetch) {
    _allTripsFetch = (async () => {
      const snap = await getDocs(collection(db, 'trips'));
      const trips = snap.docs.map(d => normalizeTrip(d.data(), d.id));
      _allTrips = trips.sort((a, b) =>
        (a.startDate ?? '9999').localeCompare(b.startDate ?? '9999')
      ).reverse();
      _allTripsFetch = null;
      return _allTrips;
    })();
  }
  return _allTripsFetch;
}

export async function fetchTrip(slug: string): Promise<Trip> {
  if (_tripCache.has(slug)) return _tripCache.get(slug)!;
  if (!_tripFetching.has(slug)) {
    const p = (async () => {
      const snap = await getDoc(doc(db, 'trips', slug));
      if (!snap.exists()) throw new Error(`Trip not found: ${slug}`);
      const trip = normalizeTrip(snap.data(), slug);
      _tripCache.set(slug, trip);
      _tripFetching.delete(slug);
      return trip;
    })();
    _tripFetching.set(slug, p);
  }
  return _tripFetching.get(slug)!;
}

export async function fetchDays(tripSlug: string, city?: string): Promise<Day[]> {
  // Always fetch and cache the full unfiltered list; apply city filter in-memory
  if (!_daysCache.has(tripSlug) && !_daysFetching.has(tripSlug)) {
    const p = (async () => {
      const colRef = collection(db, 'trips', tripSlug, 'days');
      const snap = await getDocs(query(colRef, orderBy('date')));
      const rawDays: RawDay[] = snap.docs.map(d => ({ id: d.id, ...d.data() } as RawDay));
      const days = rawDays.map((raw, idx) =>
        normalizeDay(
          raw,
          idx + 1,
          idx > 0                  ? rawDays[idx - 1].date : undefined,
          idx < rawDays.length - 1 ? rawDays[idx + 1].date : undefined
        )
      );
      _daysCache.set(tripSlug, days);
      _daysFetching.delete(tripSlug);
      return days;
    })();
    _daysFetching.set(tripSlug, p);
  }
  const allDays = _daysCache.has(tripSlug)
    ? _daysCache.get(tripSlug)!
    : await _daysFetching.get(tripSlug)!;
  return city ? allDays.filter(d => d.city === city) : allDays;
}

export async function fetchDay(tripSlug: string, date: string): Promise<Day | undefined> {
  const all = await fetchDays(tripSlug);
  return all.find(d => d.date === date);
}

export async function fetchRestaurants(tripSlug: string, city?: string): Promise<Restaurant[]> {
  if (!_restCache.has(tripSlug) && !_restFetching.has(tripSlug)) {
    const p = (async () => {
      const snap = await getDocs(collection(db, 'trips', tripSlug, 'restaurants'));
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
      _restCache.set(tripSlug, all);
      _restFetching.delete(tripSlug);
      return all;
    })();
    _restFetching.set(tripSlug, p);
  }
  const all = _restCache.has(tripSlug)
    ? _restCache.get(tripSlug)!
    : await _restFetching.get(tripSlug)!;
  return city ? all.filter(r => r.city === city) : all;
}

export async function fetchActivities(tripSlug: string, city?: string): Promise<Activity[]> {
  if (!_actCache.has(tripSlug) && !_actFetching.has(tripSlug)) {
    const p = (async () => {
      const snap = await getDocs(collection(db, 'trips', tripSlug, 'activities'));
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
      _actCache.set(tripSlug, all);
      _actFetching.delete(tripSlug);
      return all;
    })();
    _actFetching.set(tripSlug, p);
  }
  const all = _actCache.has(tripSlug)
    ? _actCache.get(tripSlug)!
    : await _actFetching.get(tripSlug)!;
  return city ? all.filter(a => a.city === city) : all;
}

export async function fetchCityRestaurants(citySlug: string): Promise<Restaurant[]> {
  if (_cityRestCache.has(citySlug)) return _cityRestCache.get(citySlug)!;
  if (!_cityRestFetching.has(citySlug)) {
    const p = (async () => {
      // 1. Try the standalone cityRestaurants collection first
      const snap = await getDocs(
        query(collection(db, 'cityRestaurants', citySlug, 'restaurants'), orderBy('num'))
      );
      if (snap.docs.length > 0) {
        const all = snap.docs.map(d => {
          const raw = d.data();
          return {
            id:           d.id,
            num:          raw.num          ?? 0,
            city:         raw.city         ?? citySlug,
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
        _cityRestCache.set(citySlug, all);
        _cityRestFetching.delete(citySlug);
        return all;
      }

      // 2. Fall back: aggregate restaurant data from all trips that include this city
      const tripsWithCity = tripsConfig.filter(t => t.cities.includes(citySlug));
      if (tripsWithCity.length === 0) {
        _cityRestCache.set(citySlug, []);
        _cityRestFetching.delete(citySlug);
        return [];
      }
      const perTrip = await Promise.all(
        tripsWithCity.map(t => fetchRestaurants(t.slug, citySlug))
      );
      // Flatten and deduplicate by name (same restaurant may appear across trips)
      const seen = new Set<string>();
      const combined: Restaurant[] = [];
      let num = 1;
      for (const list of perTrip) {
        // Sort each trip's list by num before merging
        const sorted = [...list].sort((a, b) => (a.num ?? 0) - (b.num ?? 0));
        for (const r of sorted) {
          const key = r.name.toLowerCase().trim();
          if (!seen.has(key)) {
            seen.add(key);
            combined.push({ ...r, num: num++ });
          }
        }
      }
      _cityRestCache.set(citySlug, combined);
      _cityRestFetching.delete(citySlug);
      return combined;
    })();
    _cityRestFetching.set(citySlug, p);
  }
  return _cityRestFetching.get(citySlug)!;
}

export async function deleteRestaurant(citySlug: string, restaurantId: string): Promise<void> {
  // Only delete from the standalone city guide collection — never touches trip data
  await deleteDoc(doc(db, 'cityRestaurants', citySlug, 'restaurants', restaurantId));

  // Bust the city guide cache so subsequent fetches are fresh
  _cityRestCache.delete(citySlug);
  _cityRestFetching.delete(citySlug);
}

// ── Static param helpers (for generateStaticParams) ──────────

export function staticTripSlugs(): { tripSlug: string }[] {
  return tripsConfig.map(t => ({ tripSlug: t.slug }));
}

export function staticCitySlugs(tripSlug: string): { city: string }[] {
  const trip = tripsConfig.find(t => t.slug === tripSlug);
  return (trip?.cities ?? []).map(city => ({ city }));
}

export function staticCityRestaurantSlugs(): { citySlug: string }[] {
  return citiesConfig.map(c => ({ citySlug: c.slug }));
}
