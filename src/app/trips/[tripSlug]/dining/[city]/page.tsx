import { staticTripSlugs, staticCitySlugs } from '@/lib/firestore';
import DiningClient from '@/components/DiningClient';

export async function generateStaticParams() {
  return staticTripSlugs().flatMap(({ tripSlug }) =>
    staticCitySlugs(tripSlug).map(({ city }) => ({ tripSlug, city }))
  );
}

export default function DiningPage() {
  return <DiningClient />;
}
