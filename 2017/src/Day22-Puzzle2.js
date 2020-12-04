//Advent of Code - Day 22 - Part 2
function virusCleaner2(input,iterations) {
	//make map a 2D matrix of the input
	var map = [];
	input.forEach(row => {
		map.push(row.split(""));
	});
	//console.log(map);
	var [curX,curY,dir] = [Math.floor(map[0].length/2),Math.floor(map.length/2),'N'];
	//console.log(curX, curY, dir);
	var infected = 0;
	for (var i = 0; i < iterations; i++) {
		//Swap type, increase counter, make turn
		if (map[curY][curX] === '.') {
			dir = turnLeft(dir);
			map[curY][curX] = 'W';
		}
		else if (map[curY][curX] === 'W') {
			map[curY][curX] = '#';
			infected++;
		}
		else if (map[curY][curX] === 'F') {
			dir = reverseDirection(dir);
			map[curY][curX] = '.';
		}
		else { //Infected
			dir = turnRight(dir);
			map[curY][curX] = 'F';
		}
		//Make move
		switch(dir) {
			case 'N':
				curY--;
				break;
			case 'W':
				curX--;
				break;
			case 'S':
				curY++;
				break;
			case 'E':
				curX++;
				break;
			default:
				console.log('Bad direction');
				break;
		}

		//If move out of row bounds, add a new row of all '.'
		if (!map[curY]) {
			//console.log(`adding row ${curY} on iteration ${i}. CurX is ${curX}`);
			map[curY] = Array(map[0].length).fill('.');
		}
		//If row exists but col is out of bounds, add cell with value '.'
		if (!map[curY][curX]) {
			//console.log(`adding map[${curY}][${curX}] on iteration ${i}`);
			map[curY][curX] = '.';
		}

	}
	return infected;
}

//Takes dir 'N', 'E', 'S', 'W', turns 90˚ ccw, returns new direction
function turnLeft(dir) {
	switch(dir) {
		case 'N':
			return 'W';
		case 'W':
			return 'S';
		case 'S':
			return 'E';
		case 'E':
			return 'N';
		default:
			return 'Bad input';
	}
}

//Takes dir 'N', 'E', 'S', 'W', turns 90˚ ccw, returns new direction
function turnRight(dir) {
	switch(dir) {
		case 'N':
			return 'E';
		case 'E':
			return 'S';
		case 'S':
			return 'W';
		case 'W':
			return 'N';
		default:
			return 'Bad input';
	}
}

//Takes dir 'N', 'E', 'S', 'W', turns 180˚, returns new direction
function reverseDirection(dir) {
	switch(dir) {
		case 'N':
			return 'S';
		case 'S':
			return 'N';
		case 'E':
			return 'W';
		case 'W':
			return 'E';
		default:
			return 'Bad input';
	}
}