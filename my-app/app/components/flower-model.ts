const TAU = Math.PI * 2;

// Stable shapes: rerenders and resizes never reroll the petals.
export function flowerForm(key: string) {
  let seed = 2166136261;
  for (const character of key) { seed ^= character.charCodeAt(0); seed = Math.imul(seed, 16777619) >>> 0; }
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const count = 1 + Math.floor(random() * 7), rotation = random() * TAU;
  const dots = Array.from({ length: count }, (_, i) => ({
    angle: rotation + (i === 0 ? .72 : i / count * TAU) + (random() - .5) * .75,
    radius: .65 + random() * .7,
    orbit: .72 + random() * .65,
  }));
  const meanRadius = dots.reduce((sum, dot) => sum + dot.radius, 0) / count;
  const meanOrbit = dots.reduce((sum, dot) => sum + dot.orbit, 0) / count;
  for (const dot of dots) { dot.radius /= meanRadius; dot.orbit /= meanOrbit; }
  return { dots, stemPhase: random() * TAU, stemFrequency: 1.1 + random() * .9 };
}

type Flower = { petals: number; form: ReturnType<typeof flowerForm> };
export type FlowerMotion = { q: number; v: number };

export function stemDynamics(run: Flower, length: number, groundRadius: number, maxStem: number) {
  const flex = .85 + length / maxStem, stiffness = (10 + run.petals * .5) / flex;
  const reference = maxStem * .3;
  // Drag torque about the root; used when the running garden rotates.
  const moment1 = groundRadius * length ** 2 / 2 + length ** 3 / 3;
  const moment2 = groundRadius ** 2 * length ** 2 / 2 + 2 * groundRadius * length ** 3 / 3 + length ** 4 / 4;
  const reference1 = groundRadius * reference ** 2 / 2 + reference ** 3 / 3;
  const reference2 = groundRadius ** 2 * reference ** 2 / 2 + 2 * groundRadius * reference ** 3 / 3 + reference ** 4 / 4;
  const a = groundRadius ** 2, b = 2 * groundRadius * length, c = length ** 2;
  const normalization = a / 6 + b / 8 + c / 10;
  // Clamped root, flexible tip: the base stays planted as the stem bends.
  const tangent = (t: number) => (a * (t / 2 - t * t / 2 + t ** 3 / 6) + b * (t / 3 - t * t / 4 + t ** 4 / 24) + c * (t / 4 - t * t / 6 + t ** 5 / 60)) / normalization;
  const midAngles = Array.from({ length: 8 }, (_, i) => tangent((i + .5) / 8));
  const endAngles = Array.from({ length: 9 }, (_, i) => tangent(i / 8));
  const amplitude = Math.min(6, length * .15);
  const waviness = Array.from({ length: 9 }, (_, i) => {
    if (i === 0 || i === 8) return 0;
    const t = i / 8;
    return Math.sin(Math.PI * t) * amplitude * (.75 * Math.sin(t * TAU * run.form.stemFrequency + run.form.stemPhase) + .25 * Math.sin(t * TAU * 2.7 - run.form.stemPhase));
  });
  return { flex, stiffness, naturalFrequency: Math.sqrt(stiffness), dragLinear: .12 * moment1 / reference1, dragQuadratic: .012 * moment2 / reference2, accelerationLag: .003 * moment1 / reference1, midAngles, endAngles, waviness, segmentLength: length / 8, renderPoints: Array.from({ length: 9 }, () => [0, 0]) };
}

export function advanceFlowerSpring(motion: FlowerMotion, dynamics: ReturnType<typeof stemDynamics>, petals: number, wind: number, dt: number) {
  const swing = Math.hypot(motion.q, motion.v / dynamics.naturalFrequency);
  const damping = .65 + petals * .025 + .65 / (1 + swing * 14);
  motion.v += (dynamics.stiffness * (wind - motion.q) - damping * motion.v) * dt;
  motion.q += motion.v * dt;
}

export function stemGeometry(dynamics: ReturnType<typeof stemDynamics>, bend: number) {
  const q = Math.max(-1.65, Math.min(1.65, bend));
  const points = dynamics.renderPoints;
  let x = 0, y = 0;
  for (let i = 1; i <= 8; i++) {
    const midAngle = q * dynamics.midAngles[i - 1];
    x += Math.sin(midAngle) * dynamics.segmentLength;
    y -= Math.cos(midAngle) * dynamics.segmentLength;
    const wave = dynamics.waviness[i], angle = q * dynamics.endAngles[i];
    points[i][0] = x + Math.cos(angle) * wave;
    points[i][1] = y + Math.sin(angle) * wave;
  }
  let path = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)], p1 = points[i], p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
    path += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  // A crooked resting stem can end away from the bending centerline.
  // Attach the bloom to the actual last point so wind never detaches it.
  return { path, x: points[8][0], y: points[8][1], rotation: q * 180 / Math.PI };
}

// One-dimensional gradient noise (the Perlin approach), centered on zero.
// Sample slowly through time for a breeze that changes direction smoothly.
export function breezeNoise(position: number) {
  const cell = Math.floor(position), t = position - cell;
  const gradient = (index: number) => {
    let hash = Math.imul(index ^ 0x9e3779b9, 0x85ebca6b);
    hash = Math.imul(hash ^ (hash >>> 16), 0xc2b2ae35);
    return ((hash ^ (hash >>> 16)) >>> 0) / 4294967295 * 2 - 1;
  };
  const fade = t * t * t * (t * (t * 6 - 15) + 10);
  return 2 * ((1 - fade) * gradient(cell) * t + fade * gradient(cell + 1) * (t - 1));
}
