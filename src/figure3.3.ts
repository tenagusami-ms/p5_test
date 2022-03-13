import p5 from "p5";

const sketch = (p: p5) => {

    let locationX: number;
    let direction: number;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(60);
        p.fill(0, 127, 256);
        p.noStroke(); // 線なし（塗りつぶしのみ）に設定
        locationX = 0;
        direction = -1;
    };

    p.draw = () => {
        p.background(0);
        p.ellipse(locationX, p.height / 2, 20, 20);
        locationX += 10 * direction;
        if (locationX < 0 || locationX > p.width) {
            direction *= -1;
        }
    };
};

new p5(sketch);
