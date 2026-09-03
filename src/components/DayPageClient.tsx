'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip, fetchDay } from '@/lib/firestore';
import Nav from '@/components/Nav';
import DayEventCard from '@/components/DayEventCard';
import PhotoSection from '@/components/PhotoSection';
import PhotoFabButton from '@/components/PhotoFabButton';
import Link from 'next/link';
import { Trip, Day } from '@/types';

export default function DayPageClient() {
  const { tripSlug, date } = useParams<{ tripSlug: string; date: string }>();
  const [trip, setTrip]   = useState<Trip | null>(null);
  const [day, setDay]     = useState<Day | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!tripSlug || !date) return;
    Promise.all([fetchTrip(tripSlug), fetchDay(tripSlug, date)])
      .then(([t, d]) => {
        setTrip(t);
        if (!d) setNotFound(true);
        else setDay(d);
      })
      .finally(() => setLoading(false));
  }, [tripSlug, date]);

  if (loading)   return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Loading…</p>;
  if (notFound || !trip || !day)
    return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Day not found.</p>;

  const cityInfo = trip.cities.find(c => c.slug === day.city);

  return (
    <>
      <Nav trip={trip} currentCity={day.city} />

      <header className="day-hero"><div className="wrap">
        <span className={`tag ${day.city}`}>{cityInfo?.name ?? day.city}</span>
        <div className="num">
          Day {day.dayNum}
          {day.sunsetTime && (
            <span className="sunset-time">Sunset {day.sunsetTime}</span>
          )}
        </div>
        {day.holiday && <div className="holiday-note">{day.holiday}</div>}
        <h1>{day.label}</h1>
        <p className="weekday">{day.weekday}{day.title !== day.label ? ` · ${day.title}` : ''}</p>
        {day.hotel && (
          <div className="hotel-line">Staying at <b>{day.hotel}</b></div>
        )}
      </div></header>

      <section><div className="wrap">
        {day.events.length === 0
          ? <p className="empty-day">No events planned yet.</p>
          : <div className="timeline">
              <h3>Schedule</h3>
              {day.events.map((e, i) => <DayEventCard key={i} event={e} />)}
            </div>
        }
      </div></section>

      <PhotoFabButton />
      <div className="wrap">
        <PhotoSection date={date} />
      </div>

      <div className="wrap"><div className="pager">
        {day.prevDate
          ? <Link href={`/trips/${tripSlug}/days/${day.prevDate}`}>
              <span className="plabel">Previous</span>
              <span className="pdate">{day.prevDate}</span>
            </Link>
          : <span />
        }
        {day.nextDate
          ? <Link href={`/trips/${tripSlug}/days/${day.nextDate}`} className="next">
              <span className="plabel">Next</span>
              <span className="pdate">{day.nextDate}</span>
            </Link>
          : <span />
        }
      </div></div>

      <footer><div className="wrap">{trip.title} &middot; {day.label}</div></footer>
    </>
  );
}
