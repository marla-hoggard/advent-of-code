//Advent of Code - Day 16 - Puzzle 1
//Executes "dance moves" from input on 'abcdefghijklmnop'
//Returns string after final modification
function danceMoves(input) {
	var array = 'abcdefghijklmnop'.split("");
	var moves = input.split(",");
	for (var i = 0, m = moves.length; i < m; i++) {
		//Shift # values from end to front
		if (moves[i].charAt(0) == 's') {
			var toShift = moves[i].substr(1);
			array = array.slice(0 - toShift)
				.concat(array.slice(0,0 - toShift));
			//console.log(array);
		}
		//Swap values at locations #/#
		else if (moves[i].charAt(0) == 'x') {
			var first = moves[i].substr(1).split("/")[0];
			var second = moves[i].substr(1).split("/")[1];
			var temp = array[first];
			array[first] = array[second];
			array[second] = temp;
			//console.log(array);
		}
		//Swap values x/y
		else { //'p'
			var first = array.indexOf(moves[i].substr(1).split("/")[0]);
			var second = array.indexOf(moves[i].substr(1).split("/")[1]);
			var temp = array[first];
			array[first] = array[second];
			array[second] = temp;
			//console.log(array);
		}
	}
	return array.join("");
}