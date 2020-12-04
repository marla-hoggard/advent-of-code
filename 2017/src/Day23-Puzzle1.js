//Advent of Code - Day 23 - Puzzle 1
//input is an array of direction strings
//Returns how many times a 'mul' command is called
function coprocessor(input) {
	//Set all processors to 0
	var processors = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0};
	var timesMulCalled = 0;
	for (var i = 0; i < input.length; i++) {
		var instr = input[i].split(" ");
		var opValue = isNaN(instr[2]) ? processors[instr[2]] : Number(instr[2]);
		switch(instr[0]) {
			case 'set':
				processors[instr[1]] = opValue;
				break;
			case 'sub': 
				processors[instr[1]] -= opValue;
				break;
			case 'mul':
				timesMulCalled++;
				processors[instr[1]] *= opValue;
				break;
			case 'jnz':
				if (processors[instr[1]] != 0) {
					i += opValue;
					i--; //Account for i++
				}
				break;
			default:
				console.log('Bad instruction');
				break;
		}
	}
	return timesMulCalled;
}

