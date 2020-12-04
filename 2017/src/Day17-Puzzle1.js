//Advent of Code - Day 17 - Puzzle 1
//Starts at [0]. Moves 'steps' steps then adds 1
//Repeats num times. Returns value directly after num
function spinlock(steps,num) {
	var array = [0];
	var pos = 0;
	for (var i = 1; i <= num; i++) {
		pos += steps % i; //Move steps, circular
		pos = pos % i; //Make sure pos is within array
		array = array.slice(0,pos + 1) //insert i at [pos + 1]
			.concat(i,array.slice(pos + 1));
		pos++; //Move pos to the position of the inserted value
		//console.log(array);
	}
	//console.log(array.slice(0,10));
	var zeroIndex = array.indexOf(num);
	return array[zeroIndex + 1];
}