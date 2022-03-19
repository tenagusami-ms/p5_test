import p5 from "p5";

class Particle {
    public color: p5.Color;
    public diameter: number;
    public location: p5.Vector;
    public velocity: p5.Vector

    constructor(p: p5, color: p5.Color, diameter: number) {
        this.color = color;
        this.diameter = diameter;
        this.location = new p5.Vector(
            Math.floor(Math.random() * p.width),
            Math.floor(Math.random() * p.height));
        this.velocity = new p5.Vector(
            Math.floor(Math.random() * 8) - 4,
            Math.floor(Math.random() * 8) - 4);
    }

    draw(p: p5){
        p.fill(this.color);
        p.ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
        this.location.add(this.velocity);
        if (this.location.x < 0 || this.location.x > p.width){
            this.velocity.x *= -1;
        }
        if (this.location.y < 0 || this.location.y > p.height){
            this.velocity.y *= -1;
        }
    }
}


const sketch = (p: p5) => {
    let objects: number = 1000;
    let particles: Particle[] = new Array(objects);

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        p.frameRate(60);
        //p.blendMode(p.ADD);
        p.noStroke();
        for (let i = 0; i < objects; ++i){
            particles[i] = new Particle(
                p,
                p.color(
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255)),
                Math.floor(Math.random() * 24) + 8);
        }
    };

    p.draw = () => {
        p.background(0);
        particles.forEach(particle => {particle.draw(p);})
    };
};

new p5(sketch);
