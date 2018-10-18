var speed = .065;
var particles = [];
var centerX;
var centerY;
var trailSize = 40;

function setup() {
    createCanvas(300, 300);
    background(0);
    colorMode(HSB, 255);
    noStroke();

    createParticles();
}

function draw() {
    background(0, 90);

    centerX = width / 2;
    centerY = height / 2;
    stroke(0);
    fill(255);
    ellipse(centerX, centerY, noise(frameCount * .05) * 40);
    stroke(255);
    for (let index = 0; index < particles.length; index++) {
        particles[index].move();
        particles[index].show();
    }
}

function createParticles() {
    for (let i = 0; i < 8; i++) {
        let p = new Particle(random(80) + 20, random(80) + 20, random(2) > 1 ? 1 : - 1, random(2) > 1 ? 1 : - 1, random(0.6) + 0.7, random(0.6) + 0.7);
        particles[i] = p;
    }
}

function addParticle() {
    let p = new Particle(random(80) + 20, random(80) + 20, random(2) > 1 ? 1 : - 1, random(2) > 1 ? 1 : - 1, random(0.6) + 0.7, random(0.6) + 0.7);
    particles.push(p);
}

function mouseClicked() {
    background(0);
    addParticle();
}

function Particle(h, w, xOrientation, yOrientation, speedRateX, speedRateY) {
    this.h = h;
    this.w = w;
    this.xOrientation = xOrientation;
    this.yOrientation = yOrientation;

    this.trail = [];
    this.coord = new ParticleCoord(width / 2, height / 2, 1, color(random(255), 150, 255));

    this.move = function () {

        this.trail.push(this.coord);
        if (this.trail.length > trailSize)
            this.trail.splice(0, 1);

        let c = this.coord.color;
        this.coord = new ParticleCoord(
            centerX + cos(speedRateX * speed * frameCount) * this.w * this.xOrientation,
            centerY + sin(speedRateY * speed * frameCount) * this.h * this.yOrientation,
            random(10) * 1.7,
            color((hue(c) + 1) % 254, saturation(c), brightness(c))
        );
    }

    this.show = function () {
        fill(this.coord.color);
        ellipse(this.coord.x, this.coord.y, this.coord.size);

        let scale = .8;

        for (let i = this.trail.length - 1; i >= 0; i -= floor(trailSize / 10)) {
            fill(this.trail[i].color, i / (this.trail.length) * 255);

            let dx = random(5) - 2.5;
            let dy = random(5) - 2.5;
            ellipse(this.trail[i].x + dx, this.trail[i].y + dy, this.trail[i].size * scale);
            scale *= scale;
        }
    }
}

function ParticleCoord(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
}