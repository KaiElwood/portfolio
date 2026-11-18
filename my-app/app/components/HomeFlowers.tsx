"use client";

import { useEffect, useRef, useState } from 'react';
import { advanceFlowerSpring, breezeNoise, flowerForm, stemDynamics, stemGeometry } from './flower-model';

function createFlowers() {
  const count = 2 + Math.floor(Math.random() * 5);
  const colors = ['coral', 'lilac', 'butter'];
  return Array.from({ length: count }, (_, index) => {
    // Loose spacing leaves room for the blooms without making a tidy grid.
    const x = (index + .5 + (Math.random() - .5) * .6) * 800 / count;
    const length = 85 + Math.random() * 130;
    const bloom = length * (.055 + Math.random() * .035);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const form = flowerForm(crypto.randomUUID());
    const dynamics = stemDynamics({ form, petals: form.dots.length }, length, 0, 215);
    // As in the original p5 sketch, successive sideways steps accumulate.
    // Some stems stay almost straight; others lean, kink, or double back.
    const crookedness = 8 + Math.random() * 34;
    let offset = 0;
    dynamics.waviness = dynamics.waviness.map((_, i) => i === 0 ? 0 : (offset += (Math.random() - .5) * crookedness));
    return { x, length, bloom, color, form, dynamics, rest: stemGeometry(dynamics, 0) };
  });
}

export default function HomeFlowers() {
  const svg = useRef<SVGSVGElement>(null);
  const [flowers, setFlowers] = useState<ReturnType<typeof createFlowers>>([]);

  // Generate once in the browser, rather than rerolling on animation frames.
  useEffect(() => { setFlowers(createFlowers()); }, []);

  useEffect(() => {
    const root = svg.current;
    if (!root || !flowers.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stems = root.querySelectorAll<SVGPathElement>('[data-stem]');
    const heads = root.querySelectorAll<SVGGElement>('[data-head]');
    const motions = flowers.map(() => ({ q: 0, v: 0 }));
    let frame = 0, last = 0, time = 13.7, visible = true;

    const paint = () => flowers.forEach((flower, i) => {
      const geometry = stemGeometry(flower.dynamics, motions[i].q);
      stems[i].setAttribute('d', geometry.path);
      heads[i].setAttribute('transform', `translate(${geometry.x},${geometry.y}) rotate(${geometry.rotation})`);
    });
    const tick = (now: number) => {
      const elapsed = Math.min((now - last) / 1000, .05);
      last = now;
      // Small physics steps keep the spring stable across display refresh rates.
      const steps = Math.max(1, Math.ceil(elapsed * 120)), dt = elapsed / steps;
      for (let step = 0; step < steps; step++) {
        time += dt;
        flowers.forEach((flower, i) => {
          // One breeze travels across the bed; a smaller layer adds variation.
          const wind = .10 * breezeNoise(time * .16 - flower.x * .0012)
            + .025 * breezeNoise(time * .39 + i * 1.7);
          advanceFlowerSpring(motions[i], flower.dynamics, flower.form.dots.length, wind * flower.dynamics.flex, dt);
        });
      }
      paint();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (reduced.matches) {
        motions.forEach(motion => { motion.q = 0; motion.v = 0; });
        paint();
      } else if (!document.hidden && visible) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(root);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [flowers]);

  return (
    <svg ref={svg} viewBox="0 0 800 300" className="home-flowers" aria-hidden="true">
      {flowers.map(flower => (
        <g key={flower.x} transform={`translate(${flower.x},300)`}>
          <path data-stem d={flower.rest.path} fill="none" stroke="var(--garden-muted)" strokeWidth="1.2" strokeLinecap="round" />
          <g data-head transform={`translate(${flower.rest.x},${flower.rest.y})`} fill={`var(--garden-${flower.color})`}>
            {flower.form.dots.map((dot, i) => {
              const orbit = flower.bloom * 1.15 * dot.orbit;
              return <circle key={i} cx={Math.cos(dot.angle) * orbit} cy={Math.sin(dot.angle) * orbit} r={flower.bloom * .8 * dot.radius} />;
            })}
          </g>
        </g>
      ))}
    </svg>
  );
}
