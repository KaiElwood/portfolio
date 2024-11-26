import { _ } from "@p5-wrapper/react";

declare module 'p5' {
  interface p5InstanceExtensions {
    drawPlants: () => void;
    drawPlant: (x: number, y: number, size: number) => void;
    makeFlowers(x: number, y: number, petals: number, layers: number, size: number): void;
    makePetals(finalPoint: { x: number; y: number }, length: number): void;
    makeStems(x: number, y: number, segments: number, weight: number, length: number): {x: number, y: number}[];
  }
}