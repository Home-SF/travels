import Link from 'next/link';
import { Trip } from '@/types';

export default function TripCard({ trip }: { trip: Trip }) {
  const cover = trip.cities.find(c => c.slug === trip.coverCity) ?? trip.cities[0];
  const accentColor = cover?.color ?? '#241F1B';

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="trip-card"
      style={{ borderTopColor: accentColor }}
    >
      <div className="trip-card-eyebrow" style={{ color: accentColor }}>
        {trip.dates}
      </div>
      <h2 className="trip-card-title">{trip.title}</h2>
      <p className="trip-card-sub">{trip.subtitle}</p>
      <div className="trip-card-cities">
        {trip.cities.map(c => (
          <span key={c.slug} style={{ background: c.colorSoft, color: c.color }}>
            {c.name}
          </span>
        ))}
      </div>
      {trip.travelers.length > 0 && (
        <div className="trip-card-travelers">
          {trip.travelers.length} travelers
        </div>
      )}
    </Link>
  );
}
