import { staticTripSlugs } from '@/lib/firestore';
import DayPageClient from '@/components/DayPageClient';

export async function generateStaticParams() {
  // We only pre-render trip-level routes; date sub-routes are handled
  // client-side. For static export we need a minimal set that lets
  // Next.js create the [date] shell. We return a sentinel date per trip
  // and rely on the SPA rewrite in firebase.json for real date navigation.
  return staticTripSlugs().map(({ tripSlug }) => ({ tripSlug, date: 'index' }));
}

export default function DayPage() {
  return <DayPageClient />;
}
