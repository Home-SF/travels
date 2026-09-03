import { staticTripSlugs, staticCitySlugs } from '@/lib/firestore';
import MapClient from '@/components/MapClient';

export async function generateStaticParams() {
  return staticTripSlugs().flatMap(({ tripSlug }) =>
    staticCitySlugs(tripSlug).map(({ city }) => ({ tripSlug, city }))
  );
}

export default function MapPage() {
  return <MapClient />;
}
