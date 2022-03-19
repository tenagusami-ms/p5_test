import p5 from "p5";

export class ParticleVec3 {
    public location: p5.Vector = new p5.Vector(0.0, 0.0, 0.0);
    public velocity: p5.Vector = new p5.Vector(0.0, 0.0, 0.0);
    public acceleration: p5.Vector = new p5.Vector(0.0, 0.0, 0.0);
    public gravity: p5.Vector = new p5.Vector(0.0, 0.0, 0.0);
    public mass: number = 1.0;
    public friction: number = 0.01;
    private min: p5.Vector = new p5.Vector(0.0, 0.0, 0.0);
    private max: p5.Vector = new p5.Vector(0.0, 0.0, 0.0);
    public radius: number = 4.0;
    private static G = 1.0;

    constructor(p: p5) {
        this.min = new p5.Vector(-p.width / 2.0, -p.height / 2.0, p.height / 4.0);
        this.max = new p5.Vector(p.width / 2.0, p.height / 2.0, p.height / 4.0);
    }

    public update(): void {
        this.acceleration.add(this.gravity);
        this.velocity.add(this.acceleration);
        this.velocity.mult(1.0 - this.friction);
        this.location.add(this.velocity);
        this.acceleration.set(0.0, 0.0, 0.0);
    }

    public draw(p: p5): void {
        p.push();
        p.translate(this.location.x, this.location.y, this.location.z);
        p.ellipse(0, 0, this.mass * this.radius, this.mass * this.radius);
        p.pop();
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
        if (this.location.z > this.max.z) {
            this.location.z = this.max.z;
            this.velocity.z *= -1;
        }
        if (this.location.z < this.min.z) {
            this.location.z = this.min.z;
            this.velocity.z *= -1;
        }
    }

    throughWalls(): void {
        if (this.location.x < this.min.x) {
            this.location.x = this.max.x;
        }
        if (this.location.y < this.min.y) {
            this.location.y = this.max.y;
        }
        if (this.location.z < this.min.z) {
            this.location.z = this.max.z;
        }
        if (this.location.x > this.max.x) {
            this.location.x = this.min.x;
        }
        if (this.location.y > this.max.y) {
            this.location.y = this.min.y;
        }
        if (this.location.z > this.max.z) {
            this.location.z = this.min.z;
        }
    }

    addForce(force: p5.Vector): void {
        force.div(this.mass);
        this.acceleration.add(force);
    }

    attract(p: p5, centre: p5.Vector, _mass: number, minimumDistance: number, maximumDistance: number): void {
        let distance: number = p5.Vector.dist(centre, this.location);
        distance = p.constrain(distance, minimumDistance, maximumDistance);
        const strength: number = ParticleVec3.G * this.mass * _mass / (distance * distance);
        let force: p5.Vector = p5.Vector.sub(centre, this.location);
        force.normalize();
        force.mult(strength);
        this.addForce(force);
    }
}
