'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip, fetchActivities } from '@/lib/firestore';
import Nav from '@/components/Nav';
import ActivityCard from '@/components/ActivityCard';
import { Trip, Activity } from '@/types';

export default function ActivitiesClient() {
  const { tripSlug, city } = useParams<{ tripSlug: string; city: string }>();
  const [trip, setTrip]             = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    if (!tripSlug || !city) return;
    Promise.all([fetchTrip(tripSlug), fetchActivities(tripSlug, city)])
      .then(([t, a]) => { setTrip(t); setActivities(a); })
      .finally(() => setLoading(false));
  }, [tripSlug, city]);

  const cityInfo = trip?.cities.find(c => c.slug === city);

  if (loading) return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Loading…</p>;
  if (!trip)   return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Trip not found.</p>;

  return (
    <>
      <Nav trip={trip} currentCity={city} />
      <header className="day-hero"><div className="wrap">
        <span className={`tag ${city}`}>{cityInfo?.name ?? city}</span>
        <h1>Sights</h1>
        <p className="sub">{activities.length} places</p>
      </div></header>

      <section><div className="wrap">
        {activities.length === 0
          ? <p className="empty-day">No activities yet — add them in Firestore</p>
          : <div className={`act-list ${city}`}>
              {activities.map(a => <ActivityCard key={a.id} activity={a} />)}
            </div>
        }
      </div></section>

      <footer><div className="wrap">{trip.title} &middot; {cityInfo?.name} Sights</div></footer>
    </>
  );
}
