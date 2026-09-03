'use client';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

// City → IANA timezone mapping
const CITY_TZ: Record<string, string> = {
  toronto:     'America/Toronto',
  paris:       'Europe/Paris',
  london:      'Europe/London',
  tokyo:       'Asia/Tokyo',
  kualalumpur: 'Asia/Kuala_Lumpur',
  singapore:   'Asia/Singapore',
};

export interface SchedulableEvent {
  id:    number;
  date:  string;   // "2026-08-10"
  time:  string;   // "4:40 PM"
  title: string;
  note?: string;
  city:  string;   // "paris"
}

// Convert "4:40 PM" → "16:40"
function to24h(time12: string): string | null {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time12.trim());
  if (!m) return null;
  let h = parseInt(m[1]);
  const min = m[2];
  const ap  = m[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${min}`;
}

// Parse a local date+time in a given IANA timezone → JS Date (UTC)
function parseInTz(dateStr: string, time24: string, tz: string): Date {
  // Create a "guess" treating the local time as UTC
  const guess = new Date(`${dateStr}T${time24}:00Z`);

  // Ask the Intl API what that UTC instant looks like in the target tz
  const fmtParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).formatToParts(guess);

  const p: Record<string, string> = {};
  fmtParts.forEach(({ type, value }) => { p[type] = value; });

  // "What the tz says the guess looks like" vs "what we wanted"
  const guessAsLocal = new Date(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}Z`);
  const offset = guess.getTime() - guessAsLocal.getTime();

  // Shift the guess by the offset to get the correct UTC instant
  return new Date(guess.getTime() + offset);
}

async function scheduleAll(events: SchedulableEvent[]) {
  const { LocalNotifications } = await import('@capacitor/local-notifications');

  // Request permission
  const { display } = await LocalNotifications.requestPermissions();
  if (display !== 'granted') return;

  // Cancel any previously scheduled notifications
  const pending = await LocalNotifications.getPending();
  if (pending.notifications.length > 0) {
    await LocalNotifications.cancel({ notifications: pending.notifications });
  }

  const now = Date.now();
  const toSchedule: {
    id: number;
    title: string;
    body: string;
    schedule: { at: Date };
    sound: string;
    smallIcon: string;
    extra?: Record<string, string>;
  }[] = [];

  for (const evt of events) {
    const time24 = to24h(evt.time);
    if (!time24) continue;

    const tz = CITY_TZ[evt.city.toLowerCase()] ?? 'UTC';
    const eventAt  = parseInTz(evt.date, time24, tz);
    const fireAt   = new Date(eventAt.getTime() - 15 * 60 * 1000);

    // Skip past events
    if (fireAt.getTime() <= now) continue;

    toSchedule.push({
      id:       evt.id,
      title:    `In 15 min: ${evt.title}`,
      body:     evt.note ?? evt.time,
      schedule: { at: fireAt },
      sound:    'default',
      smallIcon: 'ic_stat_icon_config_sample',
    });

    // iOS cap: 60 notifications max
    if (toSchedule.length >= 60) break;
  }

  if (toSchedule.length === 0) return;
  await LocalNotifications.schedule({ notifications: toSchedule });
  console.log(`[Notifications] Scheduled ${toSchedule.length} alerts`);
}

export default function NotificationScheduler({ events }: { events: SchedulableEvent[] }) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    scheduleAll(events).catch(console.error);
  }, [events]);

  return null; // no UI
}
