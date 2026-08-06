import { Activity } from '@/types';

export default function ActivityCard({ activity: a }: { activity: Activity }) {
  return (
    <div className={`act-card ${a.planned ? 'act-planned' : ''}`}>
      <h3>{a.name}</h3>
      {a.address && <div className="rest-addr">{a.address}</div>}
      {a.hours && <div className="rest-hours">{a.hours}</div>}
      {a.fee && <div className="act-fee">{a.fee}</div>}
      {a.facts.map((fact, i) => (
        <div key={i} className={`act-fact ${fact.known ? 'act-known' : ''}`}>
          <span className="act-fact-label">{fact.label}</span> {fact.text}
        </div>
      ))}
      {a.website && (
        <a href={a.website} target="_blank" rel="noopener" className="act-website">
          Website &rarr;
        </a>
      )}
    </div>
  );
}
