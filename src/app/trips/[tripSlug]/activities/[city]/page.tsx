import { getTrip, getActivities, tripSlugs, citySlugs } from '@/lib/data';
import Nav from '@/components/Nav';
import ActivityCard from '@/components/ActivityCard';

export async function generateStaticParams() {
  return tripSlugs().flatMap(({ tripSlug }) =>
    citySlugs(tripSlug).map(({ city }) => ({ tripSlug, city }))
  );
}

export default async function ActivitiesPage({ params }: { params: Promise<{ tripSlug: string; city: string }> }) {
  const { tripSlug, city } = await params;
  const trip = getTrip(tripSlug);
  const cityInfo = trip.cities.find(c => c.slug === city);
  const acts = getActivities(tripSlug, city);

  return (
    <>
      <Nav trip={trip} currentCity={city} />
      <header className="day-hero"><div className="wrap">
        <span className={`tag ${city}`}>{cityInfo?.name ?? city}</span>
        <h1>Sights</h1>
        <p className="sub">{acts.length} places</p>
      </div></header>

      <section><div className="wrap">
        {acts.length === 0
          ? <p className="empty-day">No activities yet -- populate activities.json</p>
          : <div className={`act-list ${city}`}>
              {acts.map(a => <ActivityCard key={a.id} activity={a} />)}
            </div>
        }
      </div></section>

      <footer><div className="wrap">{trip.title} &middot; {cityInfo?.name} Sights</div></footer>
    </>
  );
}
