'use client';
import { useEffect, useState } from 'react';
import { fetchAllTrips } from '@/lib/firestore';
import Nav from '@/components/Nav';
import TripCard from '@/components/TripCard';
import { Trip } from '@/types';

export default function HomeClient() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTrips()
      .then(setTrips)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Nav />
      <header className="hero"><div className="wrap">
        <h1>Trips</h1>
        <p className="eyebrow">{loading ? '…' : `${trips.length} planned`}</p>
      </div></header>

      <section><div className="wrap">
        {loading
          ? <p style={{ color: 'var(--ink-faint)', fontStyle: 'italic' }}>Loading trips…</p>
          : <div className="trip-shelf">
              {trips.map(t => <TripCard key={t.slug} trip={t} />)}
            </div>
        }
      </div></section>

      <footer><div className="wrap">Trip Planner</div></footer>
    </>
  );
}
