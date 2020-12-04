//Advent of Code - Day 17 - Puzzle 2
//Returns last number <= num inserted in position 1
//Starts at 0. Moves 'steps' steps then adds 1
//Repeats num times. Returns the last value to be added next to 0 (spinLock array[1])
function posZero(steps,num) {
	var pos = 0;
	var lastZero = 0;
	for (var i = 1; i <= num; i++) {
		pos += steps % i; //Move steps, circular
		pos = pos % i; //Make sure pos is within array
		if (pos === 0) {
			lastZero = i;
			console.log(`lastZero is ${i}`);
		}
		pos++; //Move pos to the position of the inserted value
		//console.log(array);
	}
	return lastZero;
}