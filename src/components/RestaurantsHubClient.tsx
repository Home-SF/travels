'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { fetchCityRestaurants } from '@/lib/firestore';

import citiesConfig from '@/config/cities-config.json';

// Deduplicate cities by slug (a city can appear in multiple trips)
const uniqueCities = Array.from(
  new Map(citiesConfig.map(c => [c.slug, c])).values()
);

// Group by continent, cities already sorted alphabetically in config
const continents = Array.from(new Set(uniqueCities.map(c => c.continent)));

export default function RestaurantsHubClient() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      uniqueCities.map(c =>
        fetchCityRestaurants(c.slug).then(rs => ({ slug: c.slug, count: rs.length }))
      )
    ).then(results => {
      const map: Record<string, number> = {};
      results.forEach(r => { map[r.slug] = r.count; });
      setCounts(map);
      setLoading(false);
    });
  }, []);

  const totalCities = uniqueCities.length;

  return (
    <>
      <Nav />
      <header className="day-hero">
        <div className="wrap">
          <h1>Restaurant Guides</h1>
          <p className="sub">{totalCities} cities</p>
        </div>
      </header>
      <section>
        <div className="wrap">
          {loading ? (
            <p style={{ color: 'var(--ink-faint)', padding: '40px 0' }}>Loading…</p>
          ) : (
            continents.map(continent => (
              <div key={continent} className="rest-hub-trip">
                <h2 className="rest-hub-trip-title">{continent}</h2>
                <div className="city-rest-grid">
                  {uniqueCities
                    .filter(c => c.continent === continent)
                    .map(c => {
                      const count = counts[c.slug] ?? 0;
                      return (
                        <Link key={c.slug} className="city-rest-card" href={`/restaurants/${c.slug}`}>
                          <span className="city-rest-region">{c.region}</span>
                          <h3 style={{ margin: 0 }}>{c.name}</h3>
                          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
                            {count === 0 ? 'No entries yet' : `${count} restaurants`}
                          </p>
                          <span className="city-rest-cta">View guide →</span>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <footer>
        <div className="wrap">Restaurant Guides</div>
      </footer>
    </>
  );
}
