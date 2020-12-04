//Advent of Code - Day 16 - Puzzle 2

/* Problem asked to find the config after 1,000,000,000 iterations of danceMoves2
*  That would take a LONG time!! But, there's a pattern! 
*  I used findDanceCycle to determine the size of the cycle
*  Then it was a matter of running danceMoves2 1,000,000,000 % (cycle size) times
*/

//Executes "dance moves" from input on string
//Returns config after final dance move
function danceMoves2(input,string) {
	var array = string.split("");
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

//Used to find that the input cycles at 48
function findDanceCycle(input) {
	var string = 'abcdefghijklmnop';
	var array = [];
	//console.log(string);
	for (var i = 0; i < 100; i++) {
		string = danceMoves2(input,string);
		if (!array.includes(string)) {	
			array.push(string);
		}
		else {
			//Found a cycle - will return an array
			//Cycle size = array[2] - array[1]
			return [string,array.indexOf(string),i];
		}
					
	}
	return string;
}

//Runs danceMoves2 numTimes times
//For solution - use 1,000,000,000 % 48 = 16
function repeatDanceMoves(input,numTimes) {
	let string = 'abcdefghijklmnop';
	for (var i = 0; i < numTimes; i++) {
		string = danceMoves2(input,string);
	}
	return string;
}