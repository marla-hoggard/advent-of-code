//Advent of Code - Day 11 - Puzzle 2
//Returns the furthest, in steps, he got at any point in the path
function hexPathMax(dir) {
	var directions = dir.split(",");
	var max = 0;
	for (var i = 1, n = directions.length; i <= n; i++) {
		var step = directions.slice(0,i).join(",");
		if (hexPath(step) > max) {
			max = hexPath(step);
		}
	}
	return max;
}

//hexPath is defined in Day11-Puzzle1.js