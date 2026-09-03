'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip, fetchDays } from '@/lib/firestore';
import Nav from '@/components/Nav';
import RouteTrack from '@/components/RouteTrack';
import Link from 'next/link';
import { Trip, Day } from '@/types';

export default function TripHomeClient() {
  const { tripSlug } = useParams<{ tripSlug: string }>();
  const [trip, setTrip]     = useState<Trip | null>(null);
  const [days, setDays]     = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripSlug) return;
    Promise.all([fetchTrip(tripSlug), fetchDays(tripSlug)])
      .then(([t, d]) => { setTrip(t); setDays(d); })
      .finally(() => setLoading(false));
  }, [tripSlug]);

  if (loading) return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Loading…</p>;
  if (!trip)   return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Trip not found.</p>;

  return (
    <>
      <Nav trip={trip} />
      <header className="hero"><div className="wrap">
        <p className="eyebrow">{trip.subtitle} &middot; {trip.dates}</p>
        <h1>{trip.title}</h1>
        {trip.travelers.length > 0 && (
          <div className="travelers">
            {trip.travelers.map(t => <span key={t}>{t}</span>)}
          </div>
        )}
        {trip.route.length > 0 && <RouteTrack stops={trip.route} />}
      </div></header>

      {trip.cities.map(city => {
        const cityDays = days.filter(d => d.city === city.slug);
        return (
          <section key={city.slug} className={`city-section ${city.slug}`}>
            <div className="wrap">
              <div className="city-head">
                <h2 style={{ color: city.color }}>{city.name}</h2>
                {city.hotel && (
                  <div className="hotel">Staying at<br /><b>{city.hotel}</b></div>
                )}
              </div>
              <div className="day-grid">
                {cityDays.map(day => (
                  <Link
                    key={day.date}
                    className="day-card"
                    href={`/trips/${tripSlug}/days/${day.date}`}
                    style={{ borderLeftColor: city.color }}
                  >
                    <div className="num">DAY<br />{String(day.dayNum).padStart(2, '0')}</div>
                    <div className="dd">{day.label}</div>
                    <div className="kk">{day.title}</div>
                  </Link>
                ))}
                {cityDays.length === 0 && (
                  <p style={{ color: 'var(--ink-faint)', fontStyle: 'italic', gridColumn: '1/-1' }}>
                    No days yet — add days in Firestore
                  </p>
                )}
              </div>
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <Link className="back" href={`/trips/${tripSlug}/dining/${city.slug}`}>
                  {city.name} Dining
                </Link>
                <Link className="back" href={`/trips/${tripSlug}/activities/${city.slug}`}>
                  {city.name} Sights
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <footer><div className="wrap">{trip.title} &middot; {trip.year}</div></footer>
    </>
  );
}
