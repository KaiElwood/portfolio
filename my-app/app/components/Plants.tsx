class Flower {
  x: number;
  y: number;
  segments: number;
  weight: number;
  length: number;
  phase: number;
  rotationSpeed: number;
  swaySpeed: number;
  stemColor: string;
  stemPoints: {x: number; y: number}[];
  numPetals: number;
  petals: Petal[];

  constructor(x: number, y: number, segments: number, weight: number, length: number, rotationSpeed: number, swaySpeed: number, stemColor: string) {
    this.x = x;
    this.y = y;
    this.segments = segments;
    this.weight = weight;
    this.length = length;
    this.phase = 0;
    this.rotationSpeed = rotationSpeed;
    this.swaySpeed = swaySpeed;
    this.stemColor = stemColor ?? 'black';
    this.stemPoints = [];
    this.numPetals = Math.floor(Math.random() * 5);
    this.petals = [];
  }

  setup(p: any) {
    this.generateStemPoints(p);
    this.generatePetals(p);
  }

  draw(p: any) {
    this.drawStem(p);
    this.drawFlower(p);
    this.rotatePetals(p);
  }

  generateStemPoints(p: any) {
    let { x, y, segments, length } = this;

    this.stemPoints = [{ x: x, y: y }];
    this.stemPoints.push({ x: x, y: y });
    for (let i = 0; i < this.segments; i++) {
      let xRand = p.random(-(p.width * 0.025), p.width * 0.025);
      let nextYPoint = -(length / segments);
      this.stemPoints.push({ x: x += xRand, y: y += nextYPoint });
    }
    this.stemPoints.push({ x: x, y: y });
  }

  generatePetals(p: any) {
    const { numPetals, length } = this;
    const {x: flowerCenterX, y: flowerCenterY } = this.stemPoints[this.stemPoints.length - 1];
    let xoff = 0;
    let size = 10;
    let color = [255, 100, 100];

    for (let angle = 0; angle < p.TWO_PI; angle += p.PI / numPetals) {
      xoff += 0.5;
      const petalSize = length * p.noise(xoff) * 0.3;
      const ang = angle === 0 ? 1 : angle;
      const petalX = flowerCenterX + p.cos(ang) * petalSize;
      const petalY = flowerCenterY + p.sin(ang) * petalSize;
      const distanceFromCenter = p.dist(flowerCenterX, flowerCenterY, petalX, petalY);
      const initialAngle = p.atan2(petalY - flowerCenterY, petalX - flowerCenterX);
      let rotationSpeed = Math.random() * 0.5;
      this.petals.push(new Petal(color, petalSize, initialAngle, distanceFromCenter, rotationSpeed, flowerCenterX, flowerCenterY));
    }
  }

  drawStem(p: any) {
    const { weight, stemColor, stemPoints } = this;
    p.beginShape();
    p.noFill();
    let xoff = 0;
    p.stroke(stemColor);
    p.strokeWeight(weight);
    xoff = xoff + 0.5;
    let n = p.noise(xoff) * 3;
    p.strokeWeight(n);

    stemPoints.forEach((point) => {
      p.curveVertex(point.x, point.y);
    });

    p.endShape();
  }

  drawFlower(p: any) {
    this.drawPetals(p);
  }

  drawPetals(p: any) {
    p.noStroke();
    this.petals.forEach((petal, index) => {
      petal.draw(p);
    });
  }

  rotatePetals(p: any) {
    let { stemPoints } = this;
    let { x: centerX, y: centerY } = stemPoints[this.stemPoints.length - 1];
    this.petals.forEach((petal) => {
      petal.rotate(p, centerX, centerY);
    });
  }

  // sway function can be thought of as a sine wave
  swayFlower(p: any, time: number, amplitude: number, frequency: number) {
    // amplitude is the distance that it sways from one side to the other
    // if point is first or last, then i need it to affect two points. best option may be to use petals
    for (let i = 0; i < this.stemPoints.length; i++) {
      let swayOffset = amplitude * Math.sin(p.TWO_PI * frequency * time);
      // this.petals[i].sway(p, angle, rotationSpeed);
    }
    const x = p.cos(angle) * rotationSpeed;
    const y = p.sin(angle) * rotationSpeed;
    return { x, y };
  }

}

export default Flower;

class Petal {
  color: number[];
  petalSize: number;
  initialAngle: number;
  distanceFromCenter: number;
  rotationSpeed: number;
  phase: number;
  petalCenterY: number;
  petalCenterX: number;

  constructor(color: number[], petalSize: number, initialAngle: number, distanceFromCenter: number, rotationSpeed: number, centerX: number, centerY: number) {
    this.color = color;
    this.petalSize = petalSize;
    this.initialAngle = initialAngle;
    this.distanceFromCenter = distanceFromCenter;
    this.rotationSpeed = rotationSpeed;
    this.phase = 0;
    this.petalCenterX = centerX + Math.cos(initialAngle) * distanceFromCenter;
    this.petalCenterY = centerY + Math.sin(initialAngle) * distanceFromCenter;
  }

  draw(p: any) {
    p.fill(this.color);
    p.ellipse(this.petalCenterX, this.petalCenterY, this.petalSize, this.petalSize);
  }

  rotate(p: any, centerX: number, centerY: number) {
    this.phase += this.rotationSpeed * 0.1;
    if (this.phase > p.TWO_PI) {
      this.phase -= p.TWO_PI;
    }
    const newX = centerX + p.cos(this.initialAngle + this.phase) * this.distanceFromCenter;
    const newY = centerY + p.sin(this.initialAngle + this.phase) * this.distanceFromCenter;
    this.petalCenterX = newX;
    this.petalCenterY = newY;
  }
}