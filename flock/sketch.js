var particles = [];
var center;
var displacement;
var radius = 100;

var spritesheet;
var animation = [];

var flockSize = 3;

function preload() {
    spritesheet = loadImage('moth.png');
}

function setup() {
    createCanvas(300, 300);

    center = createVector(0, 0);
    displacement = createVector(width / 2, height / 2);

    for (let index = 0; index < 4; index++) {
        let img = spritesheet.get(8 * index, 0, 8, 8);
        animation.push(img);
    }

    for (let index = 0; index < flockSize; index++) {
        mouseClicked();
    }
}

function draw() {
    background(0, 200);
    translate(displacement.x, displacement.y);

    fill(255, 25, 25, 255);
    // strokeWeight(1);
    // noFill();
    center.x = mouseX - displacement.x;
    center.y = mouseY - displacement.y;
    circle(center.x, center.y, 5);
    // circle(center.x, center.y, radius * 2);

    for (let index = 0; index < particles.length; index++) {
        particles[index].show();
        particles[index].move();
    }
}

function mouseClicked() {
    // center = createVector(mouseX - displacement.x, mouseY - displacement.y);
    particles.push(new Particle(random(-20, 20), random(-20, 20), random(4, 7), random(5, 7.5), floor(random(0, 4))));
}

function Particle(x, y, speed, attraction, animOffset) {

    this.pos = createVector(x, y);
    this.offset = this.pos.copy();

    this.speed = speed;
    this.accel = this.velocity = createVector(0, 0);
    this.color = color(random(255), random(255), random(255));
    this.distance = this.prevDistance = 0;

    this.attraction = attraction;
    this.animOffset = animOffset;

    this.move = function () {
        this.pointer = createVector((center.x + this.offset.x) - this.pos.x, (center.y + this.offset.y) - this.pos.y);

        // this.prevDistance = this.distance;
        this.distance = this.pointer.mag();

        // if (this.prevDistance > 10 && this.distance <= 10) {
        //     this.accel = this.velocity = createVector(0, 0);
        //     return;
        // }

        this.direction = this.pointer.copy().normalize();

        this.velocity = this.direction.mult(this.speed / radius);

        this.accel.add(this.velocity).limit(30);
        if (this.distance < radius) {
            this.accel = this.accel.mult(0.97);
        }

        this.pos.add(this.accel);
        this.pos.add(this.direction.mult(this.attraction));
    }

    this.show = function () {
        let frame = floor(frameCount / 3) + this.animOffset;
        image(animation[frame % animation.length], this.pos.x, this.pos.y);
    }
}