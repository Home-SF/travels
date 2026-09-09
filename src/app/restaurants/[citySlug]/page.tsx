import { staticCityRestaurantSlugs } from '@/lib/firestore';
import CityRestaurantsClient from '@/components/CityRestaurantsClient';

export async function generateStaticParams() {
  return staticCityRestaurantSlugs();
}

export default function CityRestaurantsPage() {
  return <CityRestaurantsClient />;
}
