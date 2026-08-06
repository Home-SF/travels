import { getTrip, getDay, tripSlugs, dateSlugs } from '@/lib/data';
import Nav from '@/components/Nav';
import DayEventCard from '@/components/DayEventCard';
import PhotoSection from '@/components/PhotoSection';
import PhotoFabButton from '@/components/PhotoFabButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return tripSlugs().flatMap(({ tripSlug }) =>
    dateSlugs(tripSlug).map(({ date }) => ({ tripSlug, date }))
  );
}

export default async function DayPage({ params }: { params: Promise<{ tripSlug: string; date: string }> }) {
  const { tripSlug, date } = await params;
  const trip = getTrip(tripSlug);
  const day  = getDay(tripSlug, date);
  if (!day) return notFound();
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
