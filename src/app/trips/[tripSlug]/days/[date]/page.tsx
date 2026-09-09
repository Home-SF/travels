import { staticTripSlugs, fetchDays } from '@/lib/firestore';
import DayPageClient from '@/components/DayPageClient';

export async function generateStaticParams() {
  // Fetch all real dates from Firestore so Next.js pre-generates an RSC payload
  // for every day. Without this, client-side navigation to real date URLs fails
  // because only the 'index' sentinel shell existed.
  const trips = staticTripSlugs();
  const allParams: { tripSlug: string; date: string }[] = [];

  for (const { tripSlug } of trips) {
    try {
      const days = await fetchDays(tripSlug);
      const validDays = days.filter(d => d.date && d.date !== 'index');
      for (const day of validDays) {
        allParams.push({ tripSlug, date: day.date });
      }
      // Sentinel fallback if trip has no days yet
      if (validDays.length === 0) {
        allParams.push({ tripSlug, date: 'index' });
      }
    } catch {
      allParams.push({ tripSlug, date: 'index' });
    }
  }

  return allParams;
}

export default function DayPage() {
  return <DayPageClient />;
}
