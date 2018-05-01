var cols;
var rows;
var w = 5;
var grid = [];

var numOfCarriers = 10;
var carriers = [];

function setup(){
	createCanvas(500, 500);
	cols = floor(width / w);
	rows = floor(height / w);

	for (var j = 0; j < rows; j++){
		for (var i = 0; i < cols; i++){
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	for (var i = 0; i < numOfCarriers; i++){
		carriers[i] = new Carrier(grid[floor(random(grid.length))]);
	}
	
}

function draw(){
	background(51);
	for (var i = 0; i < grid.length; i++){
		grid[i].show();
	}

	//highlight carriers
	for (var i = 0; i < numOfCarriers; i++){
		carriers[i].current.visited = true;
		carriers[i].current.highlight();
	}

	//get next
	for (var i = 0; i < numOfCarriers; i++){
		var next = carriers[i].current.checkNeighbors();
		if (next){
			next.visited = true;

			carriers[i].stack.push(carriers[i].current);

			removeWalls(carriers[i].current, next);


			carriers[i].current = next;
		}
		else if (carriers[i].stack.length > 0) {
			carriers[i].current = carriers[i].stack.pop();

			//remove from other stacks
			for (var j = 0; j < numOfCarriers; j++){
				if (j != i){
					var index = carriers[j].stack.indexOf(carriers[i].current);
					if (index > -1){
						carriers[j].stack.splice(index, 1);
					}
				}
			}
		}
	}
}

function Carrier(current){
	this.current = current;
	this.stack = [];
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