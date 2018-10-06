var allDots = [];
var speed = 4;
var lineThs = 800;
var dotCount = 120;

function setup() {
    createCanvas(250, 400);
    for (let i = 0; i < dotCount; i++) {
        allDots[i] = new dot(random(width), random(height), floor(random(2)) - 1, floor(random(2)) - 1, (random(1) + 1) / 2);
    }
}

function draw() {
    background(4, 53, 101);
    manageDots();
}

function mousePressed() {
    speed /= 5;
}
function mouseReleased() {
    speed *= 5;
}

function manageDots() {
    for (let i = 0; i < allDots.length; i++) {
        point(allDots[i].x, allDots[i].y);
        for (let j = 0; j < allDots.length; j++) {
            let dx = allDots[i].x - allDots[j].x;
            let dy = allDots[i].y - allDots[j].y;
            let d = dx * dx + dy * dy;
            if (d < lineThs) {
                let rate = (1 - d / lineThs);
                stroke(242, 109, 249, rate * 255);
                line(allDots[i].x, allDots[i].y, allDots[j].x, allDots[j].y);
            }
        }
        allDots[i].move();
    }
}

function dot(x, y, dirX, dirY, speedMod) {
    this.x = x;
    this.y = y;

    if (dirX == 0) dirX += 1;
    if (dirY == 0) dirY += 1;

    this.dirX = dirX * speedMod;
    this.dirY = dirY * speedMod;

    this.move = function () {
        this.x = (this.x + this.dirX * speed + width) % width;
        this.y = (this.y + this.dirY * speed + height) % height;
    }
} 