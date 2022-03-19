import p5 from "p5";

class ParticleVec2 {
    public location: p5.Vector = new p5.Vector(0.0, 0.0);
    public velocity: p5.Vector = new p5.Vector(0.0, 0.0);
    public acceleration: p5.Vector = new p5.Vector(0.0, 0.0);
    public gravity: p5.Vector = new p5.Vector(0.0, 0.0);
    private mass: number = 1.0;
    public friction: number = 0.01;
    private min: p5.Vector = new p5.Vector(0.0, 0.0);
    private max: p5.Vector = new p5.Vector(0.0, 0.0);
    private radius: number = 4.0;

    constructor(p: p5) {
        this.max = new p5.Vector(p.width, p.height);
    }

    public update(): void {
        this.acceleration.add(this.gravity);
        this.velocity.add(this.acceleration);
        this.velocity.mult(1.0 - this.friction);
        this.location.add(this.velocity);
        this.acceleration.set(0.0, 0.0);
    }

    public draw(p: p5): void {
        p.ellipse(this.location.x, this.location.y, this.mass * this.radius, this.mass * this.radius);
    }

    public bounceOffWalls(): void {
        if (this.location.x > this.max.x) {
            this.location.x = this.max.x;
            this.velocity.x *= -1;
        }
        if (this.location.x < this.min.x) {
            this.location.x = this.min.x;
            this.velocity.x *= -1;
        }
        if (this.location.y > this.max.y) {
            this.location.y = this.max.y;
            this.velocity.y *= -1;
        }
        if (this.location.y < this.min.y) {
            this.location.y = this.min.y;
            this.velocity.y *= -1;
        }
    }

    throughWalls(): void {
        if (this.location.x < this.min.x) {
            this.location.x = this.max.x;
        }
        if (this.location.y < this.min.y) {
            this.location.y = this.max.y;
        }
        if (this.location.x > this.max.x) {
            this.location.x = this.min.x;
        }
        if (this.location.y > this.max.y) {
            this.location.y = this.min.y;
        }
    }
}


const sketch = (p: p5) => {
    const objects: number = 1000;
    let particles: ParticleVec2[] = new Array(objects);

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        p.frameRate(60);
        //p.blendMode(p.ADD);
        p.noStroke();
        for (let i = 0; i < objects; ++i){
            particles[i] = new ParticleVec2(p);
            particles[i].location.set(p.width / 2.0, p.height / 2.0);
            const acclerationDirectionalAngle: number = Math.random() * Math.PI * 2.0;
            const accelerationAbs: number =  Math.random() * 20.0;
            const accelerationX: number = Math.cos(acclerationDirectionalAngle) * accelerationAbs;
            const accelerationY: number = Math.sin(acclerationDirectionalAngle) * accelerationAbs;
            particles[i].acceleration.set(accelerationX, accelerationY);
            particles[i].gravity.set(0.0, 0.1);
            particles[i].friction = 0.01;
        }
    };

    p.draw = () => {
        p.fill(0, 31);
        p.rect(0, 0, p.width, p.height);
        p.noStroke();
        p.fill(255);
        particles.forEach(particle => {
            particle.update();
            particle.draw(p);
            particle.bounceOffWalls();
        });
    };
};

new p5(sketch);
