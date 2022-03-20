import p5 from "p5";
const R = require('ramda');
//import {ramda as R} from "ramda";

const sketch = (p: p5) => {

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(150);
        p.stroke(0, 50);
        p.fill(255, 200);
        const xStart: number = p.random(10);
        let yNoise: number = p.random(10);
        const yNoiseStart: number = p.random(10);
        p.translate(p.width / 2, p.height / 2, 0);
        const xCoordinates: number[] = R.range(-Math.floor(p.width / 8), Math.floor(p.width / 8), 3);
        const yCoordinates: number[] = R.range(-Math.floor(p.height / 8), Math.floor(p.height / 8), 3);
        yCoordinates.forEach( (y: number) => {
            yNoise += 0.02;
            let xNoise: number = xStart;
            xCoordinates.forEach((x: number) => {
                xNoise += 0.02;
                drawPoint(p, x, y, p.noise(xNoise, yNoise))
            });
        });
    };

    p.draw = () => {};
};

const drawPoint = (p: p5, x: number, y: number, noiseFactor: number) => {
    const amplification: number = 4;
    p.push();
    p.translate(x * noiseFactor * amplification, y * noiseFactor * amplification, -y);
    const edgeSize: number = noiseFactor * 26;
    p.ellipse(0, 0, edgeSize, edgeSize);
    p.pop();
};

new p5(sketch);
