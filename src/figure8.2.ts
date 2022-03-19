import p5 from "p5";
import {ParticleVec3} from "./ParticleVec3"

const sketch = (p: p5) => {
    const objects: number = 2000;
    let particles: ParticleVec3[] = new Array(objects);

    p.setup = () => {
        //p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        p.createCanvas(600, 600, p.WEBGL);
        //p.ambientLight(255);
        p.frameRate(60);
        p.noStroke();
        for (let i = 0; i < objects; ++i) {
            particles[i] = new ParticleVec3(p);
            particles[i].location.set(Math.random() * p.width, Math.random() * p.height, Math.random() * p.height / 2.0);
            particles[i].gravity.set(0.0, 0.0, 0.0);
            particles[i].friction = 0.01;
            particles[i].radius = 2.0;
        }
    };

    p.draw = () => {
        p.noStroke();
        p.fill(0, 31);
        p.rect(0, 0, p.width, p.height);
        p.fill(255);
        particles.forEach(particle => {
            particle.update();
            particle.draw(p);
            particle.bounceOffWalls();
        });
        mouseDragged(p);
    };

    const mouseDragged = (p: p5) : void => {
        const mouseLocation = new p5.Vector(p.mouseX, p.mouseY, 0);
        particles.forEach(particle => {
            particle.attract(p, mouseLocation, 200, 5, 20);
        });
    };
};


new p5(sketch);
