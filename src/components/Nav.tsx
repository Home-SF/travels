import Link from 'next/link';
import { Trip } from '@/types';

interface NavProps {
  trip?: Trip;
  currentCity?: string;
}

export default function Nav({ trip, currentCity }: NavProps) {
  // Show "← back to trip home" only on sub-pages (dining, activities, day detail)
  const showBackToTrip = trip && currentCity;

  return (
    <nav className="topnav">
      <div className="wrap">
        {/* Row 1: brand only — nothing on the right so Dynamic Island stays clear */}
        <Link className="brand" href="/">&#9992; Travel</Link>

        {/* Row 2: ← back to trip (sub-pages only) + city pill links */}
        {trip && (
          <div className="navlinks">
            {showBackToTrip && (
              <Link className="nav-back-trip" href={`/trips/${trip.slug}`}>
                &larr; {trip.title}
              </Link>
            )}
            {trip.cities.map(city => (
              <Link key={city.slug} className="back" href={`/trips/${trip.slug}/dining/${city.slug}`}>
                {city.name} Dining
              </Link>
            ))}
            {trip.cities.map(city => (
              <Link key={city.slug} className="back" href={`/trips/${trip.slug}/activities/${city.slug}`}>
                {city.name} Sights
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
