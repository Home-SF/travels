import { TripStop } from '@/types';

export default function RouteTrack({ stops }: { stops: TripStop[] }) {
  return (
    <div className="route">
      <div className="route-track">
        {stops.map((stop, i) => (
          <div key={i} className="route-stop">
            <div className="dot" />
            <div className="code">{stop.code}</div>
            <div className="name">{stop.city}</div>
            <div className="rdate">{stop.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
