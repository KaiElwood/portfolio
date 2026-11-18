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
    <div ref={root} id="strava-garden" className="running-garden space-y-4">
      <div className="min-w-0 max-w-prose">
        <h1 className="page-title">A year in bloom</h1>
        <p className="mb-6 max-w-prose text-garden-muted">A flower for each running day. Select a flower to see the route in the center.</p>
        <div className="inline-grid grid-cols-[auto_auto] items-center gap-3 text-sm">
          <label htmlFor="sg-year">Year</label>
          <div className="relative">
            <select id="sg-year" className="h-11 w-24 appearance-none rounded-none border border-garden-border bg-garden-surface py-2 pl-3 pr-9 text-base leading-normal text-garden-ink sm:text-sm" />
            <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-garden-muted">
              <path d="m2 4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid w-full min-w-0 max-w-[560px] gap-4">
        <div id="sg-plot" className="min-w-0" />
        <p id="sg-detail" className="min-h-12 text-sm tabular-nums" aria-live="polite" />
        <p id="sg-route-key" className="text-xs text-garden-muted" hidden />
        <p id="sg-legend" className="text-xs text-garden-muted" />
        <div id="sg-palette-key" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-garden-muted" />
      </div>
    </div>
  );
}
