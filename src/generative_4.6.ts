import p5 from "p5";
//const R = require('ramda');

const sketch = (p: p5) => {
    let angularNoise: number = p.random(10);
    let radiusNoise: number = p.random(10);
    let xNoise: number = p.random(10);
    let yNoise: number = p.random(10);
    let angle: number = -Math.PI / 2.0;
    let strokeColor: number = 254;
    let dStrokeColor: number = -1;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        //p.createCanvas(500, 300, p.P2D);
        p.smooth();
        p.frameRate(30);
        p.background(255);
    };

    p.draw = () => {
        radiusNoise += 0.0005;
        let radius: number = (p.noise(radiusNoise) * 550) + 1;
        angularNoise += 0.0005;
        angle += (p.noise(angularNoise) * 6) - 3;
        angle = angle % 180.0;

        xNoise += 0.01;
        yNoise += 0.01;
        const centreX: number = p.width / 2.0 + p.noise(xNoise) * 100.0 - 50.0;
        const centreY: number = p.height / 2.0 + p.noise(yNoise) * 100.0 - 50.0;

        const angleRadian: number = p.radians(angle);
        const x1 = centreX + radius * Math.cos(angleRadian);
        const y1 = centreY + radius * Math.sin(angleRadian);
        const oppositeAngle: number = angleRadian + Math.PI;
        const x2 = centreX + radius * Math.cos(oppositeAngle);
        const y2 = centreY + radius * Math.sin(oppositeAngle);

        strokeColor += dStrokeColor;
        if (strokeColor > 254) { dStrokeColor = -1;}
        if (strokeColor < 0) { dStrokeColor = 1;}
        p.stroke(strokeColor, 60);
        p.strokeWeight(1);
        p.line(x1, y1, x2, y2);


    };
};

new p5(sketch);
