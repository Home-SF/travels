import { DayEvent } from '@/types';

export default function DayEventCard({ event: e }: { event: DayEvent }) {
  return (
    <div className={`event ${e.placeholder ? 'placeholder' : ''}`}>
      <div className="etime">{e.time}</div>
      <div>
        <div className="etitle">{e.title}</div>
        {e.note && <div className="enote">{e.note}</div>}
        {e.metroStation && (
          <div className="enote">🚇 {e.metroStation}</div>
        )}
        {e.address && (
          <div className="event-addr">
            <span className="addr-label">Address</span>{e.address}
          </div>
        )}
        {e.links && e.links.length > 0 && (
          <div className="rlinks" style={{ marginTop: 8 }}>
            {e.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener"
                className={link.style === 'track' ? 'track-live-link' : 'site-link-btn'}>
                {link.label}
              </a>
            ))}
          </div>
        )}
        {e.mapUrl && (
          <div className="event-map">
            <iframe src={e.mapUrl} loading="lazy" />
            <div className="event-map-cap">
              <span>{e.address}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
