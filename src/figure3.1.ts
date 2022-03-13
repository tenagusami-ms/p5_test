import p5 from "p5";

const sketch = (p: p5) => {

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(60);
        p.noStroke(); // 線なし（塗りつぶしのみ）に設定
        p.background(0);
    };

    p.draw = () => {
        let x: number = p.random(0, p.width);
        let y: number = p.random(0, p.height);
        let distance: number = p.dist(x, y, p.width / 2, p.height / 2);
        if (distance < p.height / 2) {
            p.noStroke();
            p.fill(63, 127, 255);
        } else {
            p.noFill();
            p.stroke(31, 127, 255);
        }
        p.ellipse(x, y, 10, 10);
    };
};

new p5(sketch);
