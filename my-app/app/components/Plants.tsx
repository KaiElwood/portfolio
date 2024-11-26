class Flower {
  x: number;
  y: number;
  segments: number;
  weight: number;
  length: number;
  phase: number;
  rotationSpeed: number;
  windSpeed: number;
  noisePos: number;
  noiseInc: number;
  maxWindSpeed: number;
  stemColor: string;
  stemPoints: {x: number; y: number}[];
  numPetals: number;
  petals: Petal[];

  constructor(x: number, y: number, segments: number, weight: number, length: number, rotationSpeed: number, windSpeed: number, maxWindSpeed: number, noisePos?: number, stemColor?: string) {
    this.x = x;
    this.y = y;
    this.segments = segments;
    this.weight = weight;
    this.length = length;
    this.phase = 0;
    this.rotationSpeed = rotationSpeed;
    this.windSpeed = windSpeed;
    this.noisePos = noisePos || 0;
    this.noiseInc = 0.01;
    this.maxWindSpeed = maxWindSpeed;
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
    this.noisePos += this.noiseInc;
    // this.swayFlower(p, this.noisePos, this.windSpeed, this.noiseInc);
    this.drawStem(p);
    this.drawFlower(p);
    // this.rotatePetals(p);
    this.windSpeed = p.noise(this.noisePos) * this.maxWindSpeed;
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
    const { weight, stemColor, stemPoints, noisePos, windSpeed } = this;
    const stemBase = stemPoints[0];
    p.push();
    p.translate(stemBase.x, stemBase.y);
    p.rotate(p.radians(windSpeed));
    p.beginShape();
    p.noFill();
    p.stroke(stemColor);
    p.strokeWeight(weight);

    stemPoints.forEach((point, i) => {
      // if (i === 0 || i === 1) {
      //   p.curveVertex(0,0);
      // } else {
        // console.log(stemBase.x, stemBase.y, point.x, point.y);

        p.curveVertex(-(stemBase.x - point.x), -(stemBase.y - point.y));
      // }
      // p.push();
      // p.curveVertex(-point.x, -point.y);
      // p.pop();
    });

    p.endShape();
    p.pop();
  }

  drawFlower(p: any) {
    this.drawPetals(p);
  }

  drawPetals(p: any) {
    p.noStroke();
    const stemBase = this.stemPoints[0];
    p.push();
    p.translate(stemBase.x, stemBase.y);
    p.rotate(p.radians(this.windSpeed));
    this.petals.forEach((petal, index) => {
      // petal.draw(p);
      p.fill(petal.color);
      p.ellipse(-(stemBase.x - petal.petalCenterX), -(stemBase.y - petal.petalCenterY), petal.petalSize, petal.petalSize);
    });
    p.pop();
  }

  rotatePetals(p: any) {
    let { stemPoints } = this;
    let { x: centerX, y: centerY } = stemPoints[this.stemPoints.length - 1];
    this.petals.forEach((petal) => {
      petal.rotate(p, centerX, centerY);
    });
  }

  // sway function can be thought of as a sine wave
  swayFlower(p: any, noisePos: number, amplitude: number, noiseInc: number) {
    // amplitude is the distance that it sways from one side to the other

    const basePoint = this.stemPoints[0];
    // if point is first or last, then i need it to affect two points. best option may be to use petals
    for (let i = 2; i < this.stemPoints.length - 1; i++) {
      const { x, y } = this.stemPoints[i];
      const noiseValue = p.noise(noisePos);
      const angle = (p.radians(noiseValue) * amplitude);
      console.log(angle);
      const translatedX = x - basePoint.x;
      const translatedY = y - basePoint.y;

      const rotatedX = translatedX * p.cos(angle) - translatedY * p.sin(angle);
      const rotatedY = translatedX * p.sin(angle) + translatedY * p.cos(angle);

      const newX = rotatedX + basePoint.x;
      const newY = rotatedY + basePoint.y;
      // console.log(newX, newY);
      // let swayOffset = amplitude * Math.sin(p.TWO_PI * frequency * time);
      // this.petals[i].sway(p, angle, rotationSpeed);
      this.stemPoints[i] = { x: newX, y: newY };
      if ( i === this.stemPoints.length - 2) {
        this.stemPoints[i+1] = { x: newX, y: newY };
      }
    }
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