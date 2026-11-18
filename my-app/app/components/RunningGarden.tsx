"use client";

import { useEffect, useRef } from 'react';
import data from '../running/runs.json';
import routes from '../running/route-shapes.json';
import { mountRunningGarden } from './running-garden';

export default function RunningGarden() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    return mountRunningGarden(root.current, data, routes);
  }, []);

  return (
    <div ref={root} id="strava-garden" className="running-garden flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
      <div className="min-w-0 lg:w-80 lg:shrink-0 xl:w-96">
        <h1 className="page-title">A year in bloom</h1>
        <p className="mb-8 max-w-prose text-garden-muted">A flower for each running day. Choose a year, then select a flower to see the route in the center. Move your cursor through the garden to stir the wind.</p>
        <label className="flex items-center gap-3 text-sm" htmlFor="sg-year">
          Year
          <select id="sg-year" className="min-h-11 rounded-none border border-garden-border bg-garden-surface px-3 py-2 text-garden-ink" />
        </label>
        <p className="mt-8 text-xs text-garden-muted">From my Strava export · Dates in New York time · Distances in miles</p>
      </div>
      <div className="grid min-w-0 flex-1 gap-4">
        <div id="sg-plot" className="min-w-0" />
        <p id="sg-detail" className="min-h-12 text-sm tabular-nums" aria-live="polite" />
        <p id="sg-route-key" className="text-xs text-garden-muted" hidden />
        <p id="sg-legend" className="text-xs text-garden-muted" />
        <div id="sg-palette-key" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-garden-muted" />
      </div>
    </div>
  );
}
