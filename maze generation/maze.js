var cellSize, grid, cols, rows, brushCount, heads;

function setup(){
	createCanvas(600, 600);

	cellSize = 20;
	brushCount = 12;

	cols = floor(width / cellSize);
	rows = floor(height / cellSize);

	clearGrid();
}

function draw(){
	background(51, 0, 51);

	for (var i = 0; i < grid.length; i++){
		grid[i].show();
	}

	//highlight heads
	for (var i = 0; i < brushCount; i++){
		heads[i].current.visited = true;
		heads[i].current.highlight();
	}

	//get next
	for (var i = 0; i < brushCount; i++){
		var next = heads[i].current.checkNeighbors();
		if (next){
			next.visited = true;

			heads[i].stack.push(heads[i].current);

			removeWalls(heads[i].current, next);


			heads[i].updateCurrent(next);
		}
		else if (heads[i].stack.length > 0) {
			heads[i].current = heads[i].stack.pop();

			//remove from other stacks
			for (var j = 0; j < brushCount; j++){
				if (j != i){
					var index = heads[j].stack.indexOf(heads[i].current);
					if (index > -1){
						heads[j].stack.splice(index, 1);
					}
				}
			}
		}
		else { //deactivate heads
			heads[i].active = false;
		}
	}
}

function Head(current, color){
	this.current = current;
	current.head = this;

	this.color = color;
	this.stack = [];
	this.active = true;

	this.updateCurrent = function(newCurrent) {
		this.current = newCurrent;
		newCurrent.head = this;
	}
}

function getRandomColor(){
	var r = floor(random(256));
	var g = floor(random(256));
	var b = floor(random(256));

	return color(r, g, b);
}

function index(i, j){
	if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
		return -1;

	return i + j * cols;
}

function removeWalls(a, b){

	var x = a.i - b.i;
	if (x === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	}
	else if (x === -1){
		a.walls[1] = false;
		b.walls[3] = false;	
	}

	var y = a.j - b.j;
	if (y === 1){
		a.walls[0] = false;
		b.walls[2] = false;
	}
	else if (y === -1){
		a.walls[2] = false;
		b.walls[0] = false;	
	}
}

function mouseClicked(){
	clearGrid();

	// return false;
}

function clearGrid(){
	grid = [];
	for (var j = 0; j < rows; j++){
		for (var i = 0; i < cols; i++){
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	heads = [];
	for (var i = 0; i < brushCount; i++){
		var carrier = new Head(grid[floor(random(grid.length))], getRandomColor());
		heads.push(carrier);
	}
}

