"use client";

import dynamic from 'next/dynamic';

const DynamicFlowerSketch = dynamic(() => import('./components/FlowerSketch'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-1 flex-col pt-20 md:pt-28">
      <div>
        <h1 className="page-title">Hi, I'm Kai</h1>
        <p className="intro-text">Welcome to my garden! Here, you can scroll through my passion projects and explorations in data viz or read my thoughts on saving our planet.</p>
      </div>
      <div className="mt-auto pt-12" aria-hidden="true">
        <div className="garden-canvas aspect-[8/3] w-full max-w-[800px]">
          <DynamicFlowerSketch />
        </div>
      </div>
    </div>
  );
}
