import p5 from "p5";

const sketch = (p: p5) => {

    let angle: number = 0;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(60);
        p.fill(0, 127, 255);
        p.noStroke(); // 線なし（塗りつぶしのみ）に設定
    };

    p.draw = () => {
        p.background(0);
        p.translate(p.width / 2, p.height / 2);
        p.rotate(angle);
        p.rectMode(p.CENTER);
        p.rect(0, 0, 300, 300);
        angle += 0.1;
    };
};

new p5(sketch);
