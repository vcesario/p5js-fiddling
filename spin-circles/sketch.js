var orbs = [];
var orbCount = 50;
var dustCount = 300;
var speed = .031;
var slowMoRatio = 4;

var colOrbsFrom;
var colOrbsTo;
var colDustA;
var colDustB;
var colBg;

function setup() {
    createCanvas(350, 400);

    noStroke();

    createOrbs();
    setColors();
}

function draw() {
    background(colBg);
    ManageOrbs();
}

function mouseClicked() {
    createOrbs();
}

function ManageOrbs() {
    for (let i = 0; i < orbs.length; i++) {
        if (i < orbCount)
            fill(orbs[i].getOrbColor());
        else
            fill(orbs[i].getDustColor());

        orbs[i].move();
        var sz = orbs[i].size * orbs[i].dx * .4;
        ellipse(orbs[i].x, orbs[i].y, sz, sz);
    }
}

function Orb(x, y, size, radius, speedMod) {

    this.x = x;
    this.y = y;
    this.size = size;
    this.radius = radius;
    this.dx = 0;
    this.speedMod = speedMod;

    this.getOrbColor = function () {
        return lerpColor(colOrbsTo, colOrbsFrom, this.y / height);
    }
    this.getDustColor = function () {
        return this.dx > 0 ? colDustA : colDustB;
    }

    this.move = function () {
        var prevX = this.x;
        this.x = width / 2 + sin((x + frameCount) * speed * this.speedMod) * this.radius;
        this.dx = this.x - prevX;
        if (this.y < -50)
            this.y = height + 50;
        this.y = (this.y - 100 * speed * this.speedMod);
    }
}

function createOrbs() {
    orbs = [];
    for (let index = 0; index < orbCount; index++) {
        orbs[index] = new Orb(random(width), random(height + 100) - 50, random(20) + 20, random(30) + 30, random(.1) + .95);
    }
    for (let index = orbs.length, i = 0; i < dustCount; index++ , i++) {
        orbs[index] = new Orb(random(width), random(height + 100) - 50, random(3) + 1, random(100) + 50, random(.5) + .75);
    }
}

function setColors() {
    colOrbsFrom = color(255);
    colOrbsTo = color(255);
    colDustA = color('#ff729faa');
    colDustB = color('#74d4faaa');
    colBg = color('#33333329');
}