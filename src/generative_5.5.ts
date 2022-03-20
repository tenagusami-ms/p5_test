import p5 from "p5";
const R = require('ramda');

const sketch = (p: p5) => {
    p.setup = () => {
        //p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        p.createCanvas(500, 300, p.WEBGL);
    };

    p.draw = () => {
        p.background(255);
        p.translate(p.width / 2,p.height / 2, -300);
        p.sphere(100);
    };
};

new p5(sketch);
