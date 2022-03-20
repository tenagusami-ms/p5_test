import p5 from "p5";
const R = require('ramda');

const sketch = (p: p5) => {
    const xStart: number = p.random(10);
    let xNoise: number = xStart;
    let yNoise: number = p.random(10);

    p.setup = () => {
        //p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        p.createCanvas(300, 300, p.P2D);
        p.smooth();
        p.background(255);
        R.range(0, p.height).map((i: number) => i * 5).forEach((y: number) => {
            yNoise += 0.1;
            xNoise = xStart;
            R.range(0, p.width).map((i: number) => i * 5).forEach((x: number) => {
                xNoise += 0.1;
                //drawPoint(p, x, y, p.noise(xNoise, yNoise));
                // const alpha: number = Math.round(p.noise(xNoise, yNoise) * 255);
                // p.stroke(0, alpha);
                // p.line(x, y, x + 1, y + 1);

                //drawPoint2(p, x, y, p.noise(xNoise, yNoise));
                drawPoint3(p, x, y, p.noise(xNoise, yNoise));
            });
        });
    };

    p.draw = () => {
    };
};

const drawPoint = (p: p5, x: number, y: number, noiseFactor: number) => {
  const len: number = 10 * noiseFactor;
  p.rect(x, y, len, len);
};

const drawPoint2 = (p: p5, x: number, y: number, noiseFactor: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(noiseFactor * 2 * Math.PI);
    p.stroke(0, 150);
    p.line(0, 0, 20, 0);
    p.pop();
};

const drawPoint3 = (p: p5, x: number, y: number, noiseFactor: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(noiseFactor * 3 * Math.PI);

    const edgeSize: number = noiseFactor * 35;
    const grey: number = 150 + noiseFactor * 120;
    const alpha: number = 150 + noiseFactor * 120;
    p.noStroke();
    p.fill(grey, alpha);
    p.ellipse(0, 0, edgeSize, edgeSize / 2);
    p.pop();
};

new p5(sketch);
