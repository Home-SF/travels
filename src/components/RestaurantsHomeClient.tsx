'use client';
import Link from 'next/link';
import Nav from '@/components/Nav';
import citiesConfig from '@/config/cities-config.json';

export default function RestaurantsHomeClient() {
  return (
    <>
      <Nav />
      <header className="day-hero">
        <div className="wrap">
          <h1>Restaurants</h1>
          <p className="sub">City dining guides</p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <div className="city-rest-grid">
            {citiesConfig.map(city => (
              <Link
                key={city.slug}
                href={`/restaurants/${city.slug}`}
                className="city-rest-card"
              >
                <span className={`tag ${city.slug}`}>{city.name}</span>
                <span className="city-rest-region">{city.region}</span>
                <span className="city-rest-cta">View Dining Guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">Restaurants · City Dining Guides</div>
      </footer>
    </>
  );
}
