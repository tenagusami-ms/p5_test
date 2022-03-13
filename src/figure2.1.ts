import p5 from "p5";

const sketch = (p: p5) => {

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke(); // 線なし（塗りつぶしのみ）に設定
        p.background(0);

        const objects: number = 12;
        const hue: number = 200;
        const saturation: number = 100;
        let brightness: number = 20;
        const alpha: number = 90;
        const diameter: number = p.width / objects * 2;

        for (let object_id: number = 0; object_id < objects; ++object_id){
            let col: p5.Color = p.color(hue, saturation, brightness, alpha);
            p.fill(col);
            let x: number = p.width / objects * object_id + diameter / 4;
            p.ellipse(x, p.height / 2, diameter, diameter);
            brightness += 100 / objects;
        }

    };

    p.draw = () => {
    };
};

new p5(sketch);
