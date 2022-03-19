import p5 from "p5";
import {ParticleVec3} from "./ParticleVec3"

const sketch = (p: p5) => {
    const nAttractors: number = 20;
    let attractors: ParticleVec3[] = new Array(nAttractors);
    const objects: number = 2000;
    let particles: ParticleVec3[] = new Array(objects);

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        p.frameRate(60);
        p.noStroke();
        for (let indexAttractor = 0; indexAttractor < nAttractors; ++indexAttractor){
            attractors[indexAttractor] = new ParticleVec3(p);
            attractors[indexAttractor].location.set(
                Math.random() * p.width - p.width / 2.0,
                Math.random() * p.height - p.height / 2.0,
                Math.random() * p.height / 2.0 - p.height / 4.0);
            attractors[indexAttractor].radius = 5.0;
        }

        for (let i = 0; i < objects; ++i) {
            particles[i] = new ParticleVec3(p);
            particles[i].location.set(
                Math.random() * p.width - p.width / 2.0,
                Math.random() * p.height - p.height / 2.0,
                Math.random() * p.height / 2.0 - p.height / 4.0);
            particles[i].gravity.set(0.0, 0.0, 0.0);
            particles[i].friction = 0.001;
            particles[i].radius = 1.0;
            particles[i].mass = Math.random() * 2.0;
        }
        p.background(0);
    };

    p.draw = () => {
        //p.background(0);
        p.fill(0, 15);
        p.background(0);

        //p.rect(-p.width / 2.0, -p.height / 2.0, p.width / 2.0, p.height / 2.0);
        p.rect(-p.width, -p.height, p.width, p.height);
        p.noStroke();
        attractors.forEach(attractor => {
            p.fill(255, 0, 0);
            attractor.draw(p);
            particles.forEach(particle =>{
                particle.attract(p, attractor.location, 50, 10, 800);
            });

        });
        particles.forEach(particle => {
            p.fill(255);
            particle.update();
            particle.draw(p);
            particle.throughWalls();
        });
    };
};


new p5(sketch);
