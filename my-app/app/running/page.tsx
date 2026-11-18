import type { Metadata } from 'next';
import RunningGarden from '../components/RunningGarden';

export const metadata: Metadata = {
  title: "Running garden · Kai's Garden",
  description: 'A year of running, in bloom.',
};

export default function Page() {
  return (
    <div className="page-section">
      <h1 className="page-title">A year in bloom</h1>
      <p className="mb-8 max-w-prose text-garden-muted">A flower for each running day. Choose a year, then select a flower to explore a run. Move your cursor through the garden to stir the wind.</p>
      <RunningGarden />
      <p className="mt-8 text-xs text-garden-muted">From my Strava export · Dates in New York time · Distances in miles</p>
    </div>
  );
}
