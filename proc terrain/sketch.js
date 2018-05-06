var cols, rows, scl, terrain, xoff, yoff, flying, flySpeed, hue, hueSpeed;

function setup() {
	createCanvas(600, 600, WEBGL);
	colorMode(HSB);
	
	scl = 15;
	cols = width / scl;
	rows = height / scl;

	terrain = [[]];
	for (var x = 0; x < cols; x ++) {
		terrain[x] = [];
	}

	xoff = 0;
	yoff = 0;
	flying = 0;
	flySpeed = -0.02;
	hue = 0;
	hueSpeed = .21;
}

function draw() {
	background(0);
	stroke(color(hue, 50, 80, 1));

	translate(-width / 2, -height / 4, 0);
	rotateX(PI / 3);

	ambientMaterial(0, 0, 0, 0);
	strokeWeight(.5);

	xoff = 0;
	for (var x = 0; x < cols; x ++) {
		yoff = flying;
		for (var y = 0; y < rows; y++) {
			terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
			yoff += 0.05;
		}
		xoff += 0.05;
	}

	for (var y = 0; y < rows - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (var x = 0; x < cols; x ++) {
			var a = [x * scl, y * scl, terrain[x][y]];
			var b = [x * scl, (y + 1) * scl, terrain[x][y + 1]];

			vertex(a[0], a[1], a[2]);
			vertex(b[0], b[1], b[2]);
		}
		endShape();
	}

	flying += flySpeed;
	hue = (hue + hueSpeed) % 360;
}