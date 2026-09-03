'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip, fetchRestaurants } from '@/lib/firestore';
import Nav from '@/components/Nav';
import RestaurantCard from '@/components/RestaurantCard';
import { Trip, Restaurant } from '@/types';

export default function DiningClient() {
  const { tripSlug, city } = useParams<{ tripSlug: string; city: string }>();
  const [trip, setTrip]               = useState<Trip | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    if (!tripSlug || !city) return;
    Promise.all([fetchTrip(tripSlug), fetchRestaurants(tripSlug, city)])
      .then(([t, r]) => { setTrip(t); setRestaurants(r); })
      .finally(() => setLoading(false));
  }, [tripSlug, city]);

  const cityInfo  = trip?.cities.find(c => c.slug === city);
  const reserved  = restaurants.filter(r => r.reserved);

  if (loading) return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Loading…</p>;
  if (!trip)   return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Trip not found.</p>;

  return (
    <>
      <Nav trip={trip} currentCity={city} />
      <header className="day-hero"><div className="wrap">
        <span className={`tag ${city}`}>{cityInfo?.name ?? city}</span>
        <h1>Dining</h1>
        <p className="sub">
          {restaurants.length} restaurants &middot; {reserved.length} reserved
        </p>
      </div></header>

      <section><div className="wrap">
        {restaurants.length === 0
          ? <p className="empty-day">No restaurants yet — add them in Firestore</p>
          : <div className={`rest-list ${city}`}>
              {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
        }
      </div></section>

      <footer><div className="wrap">{trip.title} &middot; {cityInfo?.name} Dining</div></footer>
    </>
  );
}
