import dynamic from 'next/dynamic';

import React, { useEffect } from "react";
import { P5CanvasInstance, type Sketch } from "@p5-wrapper/react";
import { getData } from "./Flowers";
import "./classes.css";

const NextReactP5Wrapper = dynamic(() => import('@p5-wrapper/next').then(mod => mod.NextReactP5Wrapper), {
	ssr: false
});

const sketch: Sketch = (p: P5CanvasInstance) => {
	console.log("this is working");
	let temperatureData: number, humidityData: number, pressureData: number;
	let dataReady = false;
	const fetchData = async () => {
		const data = await getData();
		temperatureData = data.temp;
		humidityData = data.humidity;
		pressureData = data.pressure;
	};

	p.setup = () => {
		console.log('p5 setup is running');
		p.createCanvas(800, 300);

		temperatureData = 24;
		humidityData = 80;
		pressureData = 900;
		dataReady = true;
		// (async () => {
		// 	await fetchData();
		//   })();
	}

	// TODO: draw plants slowly depending on data, 
	// then rotate flowers around plants and slowly move them from side to side

	// drawplants could return the end coordinates of each plant stem
	// plant return data would be like:
	// { 
	//  stem: {
	// 	 point1: {x: 0, y: 0}, 
	// 	 point2: {x: 0, y: 0}, 
	// 	 point3: {x: 0, y: 0}, 
	//	},
	//  flowers: {x: 0, y: 0},
	// }
	// could then slowly "grow" the flowers from the end of the stem
	// could then rotate the flowers around the stem
	// each creation of a flower would turn into a generation of a flower data
	// then code would change everything else

	p.draw = () => {
		p.rect(50, 50, 100, 100);  
		if(dataReady) {
			p.drawPlants();
			p.noLoop();
		} 
	}


	p.drawPlant = (x, y, size) => {
		// Customize your plant drawing here.
		// This example creates a plant with a stem, leaves, and a flower.
	  
		// Stem
		p.stroke(35, 100, 35);
		p.strokeWeight(size * 0.1);
		p.line(x, y, x, y - size);
	  
		// Leaves
		p.fill(50, 200, 50);
		p.noStroke();
		for (let i = 0; i < 3; i++) {
		  const leafHeight = size * 0.25;
		  const leafWidth = size * 0.5;
		  const leafY = y - size * (i + 1) / 4;
		  p.ellipse(x - leafWidth / 2, leafY, leafWidth, leafHeight);
		  p.ellipse(x + leafWidth / 2, leafY, leafWidth, leafHeight);
		}
	  
		// Flower
		p.fill(255, 100, 100);
		const flowerSize = size * 0.3;
		const flowerCenterY = y - size;
		for (let angle = 0; angle < p.TWO_PI; angle += p.PI / 4) {
		  const petalX = x + p.cos(angle) * flowerSize;
		  const petalY = flowerCenterY + p.sin(angle) * flowerSize;
		  p.ellipse(petalX, petalY, flowerSize, flowerSize);
		}
	  
		// Flower center
		p.fill(255, 255, 0);
		p.ellipse(x, flowerCenterY, flowerSize * 0.6, flowerSize * 0.6);
	}
	
	p.drawPlants = () => {
	  p.background(255);
	
	  const numberOfPlants = p.map(temperatureData, 0, 50, 1, 7);
	  for (let i = 0; i < numberOfPlants; i++) {
		const x = p.random(p.width);
		const y = p.height;
		const size = p.random(30, 200) + p.map(humidityData, 0, 100, 0, 20)
		// drawPlant(x, y, size);
		p.makeFlowers(x,y,6,1,size);
	  }
	}
	
	p.makePetals = (finalPoint, length)=> {
		const { x,y } = finalPoint;
		// Flower
		p.noStroke()
		let xoff = 0
		let numPetals = p.random(5)
		p.fill(255, 100, 100);
		  const flowerCenterY = y;
		  for (let angle = 0; angle < p.TWO_PI; angle += p.PI / numPetals) {
			xoff += 0.5;
			const flowerSize = length * p.noise(xoff) * 0.3;
			const petalX = x + p.cos(angle) * flowerSize;
			const petalY = flowerCenterY + p.sin(angle) * flowerSize;
			p.ellipse(petalX, petalY, flowerSize, flowerSize);
		  }
	  }
	  
	  p.makeFlowers = (x, y, segments, weight, length) => {
		let stemPoints = p.makeStems(x, y, segments, weight, length)
		// console.log(stemPoints[segments])
		p.makePetals(stemPoints[segments], length)
	  }
	  
	p.makeStems = (x: number, y: number, segments: number, weight: number, length: number): {x: number, y: number}[] => {
		p.beginShape()
		p.noFill()
		let xoff = 0
		// Add the first point
		p.stroke('black')
		p.strokeWeight(weight)
		p.curveVertex(x, y)
		p.curveVertex(x, y)
		xoff = xoff + 0.5;
		let n = p.noise(xoff) * 3;
		  p.strokeWeight(n)
		
		// Save points for visualization later
		let points = [{x: x, y: y}] //<----- Add initial point here
		
		// Draw line
		for (let i = 0; i < segments; i++){
		  // Get random y
		  let xRand = p.random(-(p.width * 0.025), p.width * 0.025);
		  
		  // let droop = random(length/10, length/3)
		  let nextYPoint = -(length / segments)
		  
		  // Add point to curve
		  // nextYPoint = i == segments-1 ? droop : -(length / segments)
		  p.curveVertex(x += xRand, y += nextYPoint);
		  
		  // Save point
		  points.push({x: x, y: y})
		  
		}
		p.curveVertex(x, y)
		p.endShape()
		return points;
	  }
};

export default function FlowerSketch() {
    return (
        <NextReactP5Wrapper sketch={sketch} />
    );
}