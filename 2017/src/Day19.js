//Advent of Code - Day 19 - Puzzle 1 & 2
//Follows the path of the maze, returns a string representing the letters 
//it passes along the way, in order
//input a string representing the maze, with commas separating each line
function mazeWord(input) {
	var word = '';
	var maze = input.split(",");
	maze = maze.map((line => line.split("")))
	var y = 0;
	var x = maze[0].indexOf("|");
	console.log(`first spot: maze[${y}][${x}]`);
	var dir = 'down'; //can be up, down, left or right
	var steps = 0;

	while(true) {
		steps++;
		//move one space
		switch (dir) {
			case 'down':
				y++;
				break;
			case 'up':
				y--;
				break;
			case 'left':
				x--;
				break;
			case 'right':
				x++;
				break;
			default:
				console.log('invalid direction');
				return;
		}

		//Found the end!	
		if (maze[y][x] === ' ' || y == maze.length || x == maze[y].length) {
			console.log(steps); //Answer to puzzle 2
			return word; //Answer to puzzle 1
		}

		//Found a letter
		if (/[A-Za-z]/.test(maze[y][x])) {
			console.log(`found ${maze[y][x]}`);
			word += maze[y][x];
		}
		//At a corner
		else if (maze[y][x] == '+') {
			if (dir == 'down' || dir == 'up') {
				if (x > 0 && maze[y][x-1] !== ' ') {
					dir = 'left';
				}
				else if (x + 1 < maze[y].length && maze[y][x+1] !== ' ') {
					dir = 'right';
				}
				else {
					console.log('Messed up at a corner');
					return;
				}
			}
			else { //dir is left or right 
				if (y > 0 && maze[y-1][x] !== ' ') {
					dir = 'up';
				}
				else if (y + 1 < maze.length && maze[y+1][x] !== ' ') {
					dir = 'down';
				}
				else {
					console.log('Messed up at a corner');
					return;
				}
			}
		}
	}
	return "how did we get here?";
}