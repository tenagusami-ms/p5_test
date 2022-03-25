import p5 from "p5";

const sketch = (p: p5) => {

    let objects: number = 1000;
    let coordinates: [number, number][] = new Array(objects)

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        p.frameRate(60);
        p.background(0);
        coordinates.fill([p.windowWidth / 2, p.windowHeight / 2]);
    };

    p.draw = () => {
        p.stroke(255);
        p.noFill();
        p.blendMode(p.ADD);

        coordinates = coordinates.map(([x, y]) => {
            return [x + p.random(-2.0, 2.0), y + p.random(-2.0, 2.0)];});
        coordinates.forEach(([x, y]) => {p.point(x, y);});
        p.blendMode(p.BLEND);
        p.fill(0, 5);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);
    };
};

new p5(sketch);
