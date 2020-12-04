//Takes array of instructions (integers)
//Returns number of steps to get out of maze
function escapeMaze(instr) {
	var i = 0;
	var n = instr.length;
	var steps = 0;
	//Keep going until escape maze aka i >= n
	while (i < n) {
		instr[i]++;
		i += instr[i] - 1; //-1 because instr[i] has already been incremented
		steps++;
	}
	return steps;
}
