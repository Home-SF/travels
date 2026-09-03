import { staticTripSlugs, staticCitySlugs } from '@/lib/firestore';
import ActivitiesClient from '@/components/ActivitiesClient';

export async function generateStaticParams() {
  return staticTripSlugs().flatMap(({ tripSlug }) =>
    staticCitySlugs(tripSlug).map(({ city }) => ({ tripSlug, city }))
  );
}

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
