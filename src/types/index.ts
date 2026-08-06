// ============================================================
// Travel App — shared TypeScript types
// ============================================================

export interface TripStop {
  code: string;
  city: string;
  date: string;
}

export interface TripCity {
  slug: string;
  name: string;
  color: string;
  colorSoft: string;
  hotel: string;
  hotelAddress: string;
  dates: string;
  lat: number;
  lon: number;
}

export interface Trip {
  slug: string;
  startDate?: string;
  title: string;
  year: number;
  subtitle: string;
  dates: string;
  coverCity: string;
  travelers: string[];
  route: TripStop[];
  cities: TripCity[];
}

export interface RestaurantLinks {
  website?: string;
  menu?: string;
  reserve?: string;
  michelin?: { url: string; rating: string };
  infatuation?: string;
  notes?: string[];
}

export interface Restaurant {
  id: string;
  num: number;
  city: string;
  name: string;
  address: string;
  neighborhood: string;
  hours: string;
  reserved: boolean;
  visitNote?: string;
  cancelNote?: string;
  lat?: number;
  lon?: number;
  links: RestaurantLinks;
}

export interface ActivityFact {
  label: string;
  text: string;
  known?: boolean;
}

export interface Activity {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  fee: string;
  facts: ActivityFact[];
  website: string;
  planned: boolean;
  lat?: number;
  lon?: number;
}

export interface DayEvent {
  time: string;
  title: string;
  note?: string;
  address?: string;
  metroStation?: string;
  mapUrl?: string;
  placeholder?: boolean;
  links?: { label: string; url: string; style?: string }[];
}

export interface FlightSeat {
  name: string;
  seat: string;
  class?: string;
}

export interface DayFlight {
  flightNum: string;
  route: string;
  seats: FlightSeat[];
}

export interface Day {
  date: string;
  label: string;
  weekday: string;
  dayNum: number;
  city: string;
  title: string;
  subtitle?: string;
  sunsetTime?: string;
  holiday?: string;
  hotel?: string;
  flights?: DayFlight[];
  events: DayEvent[];
  prevDate?: string;
  nextDate?: string;
}
