'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { fetchCityRestaurants, deleteRestaurant } from '@/lib/firestore';
import Nav from '@/components/Nav';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/types';

import citiesConfig from '@/config/cities-config.json';

export default function CityRestaurantsClient() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!citySlug) return;
    fetchCityRestaurants(citySlug)
      .then(setRestaurants)
      .finally(() => setLoading(false));
  }, [citySlug]);

  const handleDelete = useCallback(async (id: string) => {
    if (!citySlug) return;
    if (!confirm('Remove this restaurant from the guide?')) return;
    setDeleting(id);
    try {
      await deleteRestaurant(citySlug, id);
      setRestaurants(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete restaurant. Check console for details.');
    } finally {
      setDeleting(null);
    }
  }, [citySlug]);

  const meta = citiesConfig.find(c => c.slug === citySlug) ?? {
    name: citySlug,
    region: '',
  };

  if (loading) return <p style={{ padding: 40, color: 'var(--ink-faint)' }}>Loading…</p>;

  return (
    <>
      <Nav />
      <header className="day-hero">
        <div className="wrap">
          <span className={`tag ${citySlug}`}>{meta.name}</span>
          <h1>Restaurants</h1>
          <p className="sub">{restaurants.length} places · {meta.region}</p>
        </div>
      </header>
      <section>
        <div className="wrap">
          {restaurants.length === 0 ? (
            <p className="empty-day">No restaurants yet — add them in Firestore.</p>
          ) : (
            <div className={`rest-list ${citySlug}`}>
              {restaurants.map(r => (
                <div
                  key={r.id}
                  style={{ opacity: deleting === r.id ? 0.4 : 1, transition: 'opacity 0.2s' }}
                >
                  <RestaurantCard
                    restaurant={r}
                    cityGuide
                    onDelete={deleting ? undefined : handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <footer>
        <div className="wrap">{meta.name} Restaurant Guide</div>
      </footer>
    </>
  );
}
