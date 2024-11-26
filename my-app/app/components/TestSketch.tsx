"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from "react";
import { P5CanvasInstance, type Sketch } from "@p5-wrapper/react";

const NextReactP5Wrapper = dynamic(() => import('@p5-wrapper/next').then(mod => mod.NextReactP5Wrapper), {
  ssr: false
});

const simpleSketch = (p: P5CanvasInstance) => {
  p.setup = () => {
    p.createCanvas(800, 300);
  };
  p.draw = () => {
    p.background(255);
    p.rect(50, 50, 100, 100);  // Simple test shape
  };
};

export default function FlowerSketch() {

  return (
      <NextReactP5Wrapper sketch={simpleSketch} />
  );
}