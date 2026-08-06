import { getAllTrips } from '@/lib/data';
import TripCard from '@/components/TripCard';

export default function Home() {
  const trips = getAllTrips();
  return (
    <>
      <header className="hero"><div className="wrap">
        <h1>Trips</h1>
        <p className="eyebrow">{trips.length} planned</p>
      </div></header>

      <section><div className="wrap">
        <div className="trip-shelf">
          {trips.map(t => <TripCard key={t.slug} trip={t} />)}
        </div>
      </div></section>

      <footer><div className="wrap">Trip Planner</div></footer>
    </>
  );
}
