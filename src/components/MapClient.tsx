'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip, fetchRestaurants, fetchActivities } from '@/lib/firestore';
import Nav from '@/components/Nav';
import MapView, { MapMarker, HotelPin } from '@/components/MapView';
import { Trip, Restaurant, Activity } from '@/types';

export default function MapClient() {
  const { tripSlug, city } = useParams<{ tripSlug: string; city: string }>();
  const [trip, setTrip]               = useState<Trip | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [activities, setActivities]   = useState<Activity[]>([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    if (!tripSlug || !city) return;
    Promise.all([
      fetchTrip(tripSlug),
      fetchRestaurants(tripSlug, city),
      fetchActivities(tripSlug, city),
    ])
      .then(([t, r, a]) => { setTrip(t); setRestaurants(r); setActivities(a); })
      .finally(() => setLoading(false));
  }, [tripSlug, city]);

  if (loading) return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Loading map…</p>;
  if (!trip)   return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Trip not found.</p>;

  const cityInfo = trip.cities.find(c => c.slug === city);

  const hotel: HotelPin = {
    name:    cityInfo?.hotel        ?? 'Hotel',
    address: cityInfo?.hotelAddress ?? '',
    lat:     cityInfo?.lat          ?? 0,
    lon:     cityInfo?.lon          ?? 0,
  };

  const markers: MapMarker[] = [
    ...restaurants
      .filter(r => r.lat && r.lon)
      .map(r => ({
        id:           r.id,
        num:          r.num,
        name:         r.name,
        address:      r.address,
        neighborhood: r.neighborhood ?? '',
        lat:          r.lat!,
        lon:          r.lon!,
        type:         'restaurant' as const,
        reserved:     r.reserved,
        href:         `/trips/${tripSlug}/dining/${city}#${r.id}`,
      })),
    ...activities
      .filter(a => a.lat && a.lon)
      .map(a => ({
        id:           a.id,
        name:         a.name,
        address:      a.address,
        neighborhood: a.neighborhood ?? '',
        lat:          a.lat!,
        lon:          a.lon!,
        type:         'activity' as const,
        href:         `/trips/${tripSlug}/activities/${city}#${a.id}`,
      })),
  ];

  const rawHoods = Array.from(new Set(markers.map(m => m.neighborhood).filter(Boolean)));
  const neighborhoods = rawHoods.sort((a, b) => {
    const numA = parseInt(a.replace(/\D.*/, ''));
    const numB = parseInt(b.replace(/\D.*/, ''));
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    if (!isNaN(numA)) return -1;
    if (!isNaN(numB)) return 1;
    return a.localeCompare(b);
  });

  const reserved = restaurants.filter(r => r.reserved).length;

  return (
    <>
      <Nav trip={trip} currentCity={city} />
      <header className="day-hero">
        <div className="wrap">
          <span className={`tag ${city}`}>{cityInfo?.name ?? city}</span>
          <h1>Map</h1>
          <p className="sub">
            {restaurants.filter(r => r.lat).length} dining ·{' '}
            {activities.filter(a => a.lat).length} sights ·{' '}
            {reserved} reserved
          </p>
        </div>
      </header>
      <MapView
        markers={markers}
        hotel={hotel}
        city={city}
        neighborhoods={neighborhoods}
        tripSlug={tripSlug}
      />
    </>
  );
}
