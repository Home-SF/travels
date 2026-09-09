import { Restaurant } from '@/types';

export default function RestaurantCard({
  restaurant: r,
  cityGuide = false,
  onDelete,
}: {
  restaurant: Restaurant;
  cityGuide?: boolean;
  onDelete?: (id: string) => void;
}) {
  return (
    <div
      className={`rest-card ${r.reserved ? 'reserved' : 'not-reserved'}`}
      id={r.id}
    >
      <div className="rest-card-head">
        <div className="rest-title">
          <span className="rest-num">{r.num}</span>
          <h3>{r.name}</h3>
        </div>
        {!cityGuide && (
          <span className={`rest-status ${r.reserved ? 'reserved' : 'not-reserved'}`}>
            {r.reserved ? 'Reservation confirmed' : 'No reservation yet'}
          </span>
        )}
        {cityGuide && onDelete && (
          <button
            className="rest-delete-btn"
            aria-label={`Delete ${r.name}`}
            onClick={() => onDelete(r.id)}
          >
            ×
          </button>
        )}
      </div>
      <div className="rest-addr">
        {r.address}
        {r.neighborhood && (
          <span className="rest-neighborhood">{r.neighborhood}</span>
        )}
      </div>
      {r.hours && <div className="rest-hours">{r.hours}</div>}
      {r.visitNote && <div className="rest-visit">{r.visitNote}</div>}
      {r.cancelNote && <div className="rest-cancel">{r.cancelNote}</div>}
      <div className="rlinks">
        {r.links.website && (
          <a href={r.links.website} target="_blank" rel="noopener">Website</a>
        )}
        {r.links.menu && r.links.menu !== r.links.website && (
          <a href={r.links.menu} target="_blank" rel="noopener">Menu</a>
        )}
        {r.links.reserve && (
          <a href={r.links.reserve} target="_blank" rel="noopener">Reserve</a>
        )}
        {r.links.michelin && (
          <a className="rlink-michelin" href={r.links.michelin.url} target="_blank" rel="noopener">
            Michelin &middot; {r.links.michelin.rating}
          </a>
        )}
        {r.links.infatuation && (
          <a className="rlink-infatuation" href={r.links.infatuation} target="_blank" rel="noopener">
            Infatuation
          </a>
        )}
        {r.links.notes?.map((note, i) => (
          <span key={i} className="rlink-muted">{note}</span>
        ))}
      </div>
    </div>
  );
}
