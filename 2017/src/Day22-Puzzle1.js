//Advent of Code - Day 22 - Part 1
//Takes in virus map (input), as array of strings representing each row
//Returns number of nodes infected after # iterations
function virusCleaner(input,iterations) {
	//make map a 2D matrix of the input
	var map = [];
	input.forEach(row => {
		map.push(row.split(""));
	});
	//console.log(map);
	var [curX,curY,dir] = [Math.floor(map[0].length/2),Math.floor(map.length/2),'N'];
	//console.log(curX, curY, dir);
	var infected = 0;
	var cleaned = 0;
	for (var i = 0; i < iterations; i++) {
		//Swap type, increase counter, make turn
		if (map[curY][curX] === '.') {
			dir = turnLeft(dir);
			map[curY][curX] = '#';
			infected++;
		}
		else {
			dir = turnRight(dir);
			map[curY][curX] = '.';
			cleaned++;
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

		//Add to map if leave previous bounds (supposed to be infinite map)
		if (!map[curY]) {
			//console.log(`adding row ${curY} on iteration ${i}. CurX is ${curX}`);
			map[curY] = Array(map[0].length).fill('.');
		}
		if (!map[curY][curX]) {
			//console.log(`adding map[${curY}][${curX}] on iteration ${i}`);
			map[curY][curX] = '.';
		}

	}
	//console.log(map);
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

