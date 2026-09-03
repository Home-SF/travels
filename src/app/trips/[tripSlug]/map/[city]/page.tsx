import { getTrip, getRestaurants, getActivities, tripSlugs, citySlugs } from '@/lib/data';
import Nav from '@/components/Nav';
import MapView, { MapMarker, HotelPin } from '@/components/MapView';

export async function generateStaticParams() {
  return tripSlugs().flatMap(({ tripSlug }) =>
    citySlugs(tripSlug).map(({ city }) => ({ tripSlug, city }))
  );
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ tripSlug: string; city: string }>;
}) {
  const { tripSlug, city } = await params;
  const trip      = getTrip(tripSlug);
  const cityInfo  = trip.cities.find(c => c.slug === city);
  const restaurants = getRestaurants(tripSlug, city);
  const activities  = getActivities(tripSlug, city);

  // ── Build hotel pin ──────────────────────────────────────────────────────────
  const hotel: HotelPin = {
    name:    cityInfo?.hotel        ?? 'Hotel',
    address: cityInfo?.hotelAddress ?? '',
    lat:     cityInfo?.lat          ?? 0,
    lon:     cityInfo?.lon          ?? 0,
  };

  // ── Build unified marker list ─────────────────────────────────────────────────
  const markers: MapMarker[] = [
    // Restaurants with known coordinates
    ...restaurants
      .filter(r => r.lat && r.lon)
      .map(r => ({
        id:           r.id,
        num:          r.num,
        name:         r.name,
        address:      r.address,
        neighborhood: r.neighborhood ?? '',
        lat:          r.lat!,
        lon:          r.lon!,
        type:         'restaurant' as const,
        reserved:     r.reserved,
        href:         `/trips/${tripSlug}/dining/${city}#${r.id}`,
      })),
    // Activities with known coordinates
    ...activities
      .filter(a => a.lat && a.lon)
      .map(a => ({
        id:           a.id,
        name:         a.name,
        address:      a.address,
        neighborhood: a.neighborhood ?? '',
        lat:          a.lat!,
        lon:          a.lon!,
        type:         'activity' as const,
        href:         `/trips/${tripSlug}/activities/${city}#${a.id}`,
      })),
  ];

  // ── Build sorted neighborhood list ───────────────────────────────────────────
  const rawHoods = Array.from(new Set(markers.map(m => m.neighborhood).filter(Boolean)));

  // For Paris: sort arrondissements numerically, then other labels after
  const neighborhoods = rawHoods.sort((a, b) => {
    // Extract leading number if present (e.g. "1er", "2e", "10e", "18e")
    const numA = parseInt(a.replace(/\D.*/, ''));
    const numB = parseInt(b.replace(/\D.*/, ''));
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    if (!isNaN(numA)) return -1;
    if (!isNaN(numB)) return 1;
    return a.localeCompare(b);
  });

  const reserved = restaurants.filter(r => r.reserved).length;

  return (
    <>
      <Nav trip={trip} currentCity={city} />
      <header className="day-hero">
        <div className="wrap">
          <span className={`tag ${city}`}>{cityInfo?.name ?? city}</span>
          <h1>Map</h1>
          <p className="sub">
            {restaurants.filter(r => r.lat).length} dining ·{' '}
            {activities.filter(a => a.lat).length} sights ·{' '}
            {reserved} reserved
          </p>
        </div>
      </header>
      <MapView
        markers={markers}
        hotel={hotel}
        city={city}
        neighborhoods={neighborhoods}
        tripSlug={tripSlug}
      />
    </>
  );
}
