"use client";

import { useEffect, useRef } from 'react';
import data from '../running/runs.json';
import { mountRunningGarden } from './running-garden';

export default function RunningGarden() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    return mountRunningGarden(root.current, data);
  }, []);

  return (
    <div ref={root} id="strava-garden" className="running-garden">
      <label className="flex items-center gap-3 text-sm" htmlFor="sg-year">
        Year
        <select id="sg-year" className="min-h-11 rounded-none border border-garden-border bg-garden-surface px-3 py-2 text-garden-ink" />
      </label>
      <div id="sg-plot" className="min-w-0" />
      <p id="sg-detail" className="min-h-12 text-sm tabular-nums" aria-live="polite" />
      <p id="sg-legend" className="text-xs text-garden-muted" />
      <div id="sg-palette-key" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-garden-muted" />
    </div>
  );
}
