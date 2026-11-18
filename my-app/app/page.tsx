"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicFlowerSketch = dynamic(() => import('./components/FlowerSketch'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="home-scene">
      <div className="home-copy">
        <h1 className="home-title">A few things<br />I've been growing.</h1>
        <p>Hi, I'm Kai. I make things with data and code, and spend a lot of time outside.</p>
        <p className="mt-6">
          You can wander through <Link className="garden-link text-garden-coral" href="/running">my running garden</Link> or explore <Link className="garden-link text-garden-lilac" href="/portfolio">a few projects</Link>.
        </p>
      </div>
      <div className="flower-panel" aria-hidden="true">
        <div className="garden-canvas"><DynamicFlowerSketch /></div>
      </div>
    </div>
  );
}
