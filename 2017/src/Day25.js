//Advent of Code - Day 25 
//Runs the machine 'steps' times 
//Switch statement is constructed from puzzle input
//Returns "checksum" aka sum of values aka number of 1s in tape after final iteration
function turing(steps) {
	var state = 'A';
	var tape = Array(100).fill(0);
	var cursor = 200;
	for (var i = 0; i < steps; i++) {
		switch(state) {
			case 'A':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor++;
					state = 'B';
				}
				else {
					tape[cursor] = 0;
					cursor--;
					state = 'C'
				}
				break;
			case 'B':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor--;
					state = 'A';
				}
				else {
					tape[cursor] = 1;
					cursor--;
					state = 'D'
				}
				break;
			case 'C':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor++;
					state = 'D';
				}
				else {
					tape[cursor] = 0;
					cursor++;
					state = 'C'
				}
				break;
			case 'D':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 0;
					cursor--;
					state = 'B';
				}
				else {
					tape[cursor] = 0;
					cursor++;
					state = 'E'
				}
				break;
			case 'E':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor++;
					state = 'C';
				}
				else {
					tape[cursor] = 1;
					cursor--;
					state = 'F'
				}
				break;
			case 'F':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor--;
					state = 'E';
				}
				else {
					tape[cursor] = 1;
					cursor++;
					state = 'A'
				}
				break;
			default:
				return "invalid state";
		}
	}
	console.log(tape);
	var checksum = 0;
	tape.forEach(value => checksum += value);
	return checksum;
}


