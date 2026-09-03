import { staticTripSlugs } from '@/lib/firestore';
import TripHomeClient from '@/components/TripHomeClient';

export async function generateStaticParams() {
  return staticTripSlugs();
}

export default function TripHome() {
  return <TripHomeClient />;
}
