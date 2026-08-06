import type { Metadata } from 'next';
import './globals.css';
import NearbyFab from '@/components/NearbyFab';

export const metadata: Metadata = {
  title: 'Trip Planner',
  description: 'Paris, London & more',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="fab-stack">
          <div id="above-fab-slot" />
          <NearbyFab />
        </div>
      </body>
    </html>
  );
}
