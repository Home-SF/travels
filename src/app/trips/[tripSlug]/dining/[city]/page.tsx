import { getTrip, getRestaurants, tripSlugs, citySlugs } from '@/lib/data';
import Nav from '@/components/Nav';
import RestaurantCard from '@/components/RestaurantCard';

export async function generateStaticParams() {
  return tripSlugs().flatMap(({ tripSlug }) =>
    citySlugs(tripSlug).map(({ city }) => ({ tripSlug, city }))
  );
}

export default async function DiningPage({ params }: { params: Promise<{ tripSlug: string; city: string }> }) {
  const { tripSlug, city } = await params;
  const trip = getTrip(tripSlug);
  const cityInfo = trip.cities.find(c => c.slug === city);
  const restaurants = getRestaurants(tripSlug, city);
  const reserved = restaurants.filter(r => r.reserved);

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
          ? <p className="empty-day">No restaurants yet -- populate restaurants.json</p>
          : <div className={`rest-list ${city}`}>
              {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
        }
      </div></section>

      <footer><div className="wrap">{trip.title} &middot; {cityInfo?.name} Dining</div></footer>
    </>
  );
}
