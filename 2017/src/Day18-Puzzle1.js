//Advent of Code - Day 18 - Puzzle 1
//Takes a comma-separated string of commands
//Returns the first "recover" value that is successfully executed
function duet(input) {
	var dir = input.split(",");
	var sound;
	var obj = {};
	for (var i = 0, n = dir.length; i < n; i++) {
		var step = dir[i].split(" ");
		var x = step[1]; 
		var y;
			if (isNaN(step[2])) {
				y = obj[step[2]];
			}
			else {
				y = +step[2];
			}
		switch (step[0]) {
			case 'snd':
				sound = obj[x];
				console.log(`sound = ${sound}`);
				break;
			case 'set':
				obj[x] = y;
				console.log(`${x} = ${y}`);
				break;
			case 'add':
				console.log(`${obj[x]} += ${y}`);
				obj[x] = +obj[x] + +y;
				break;
			case 'mul':
				console.log(`${obj[x]} *= ${y}`);
				obj[x] *= y;
				break;
			case 'mod':
				console.log(`${x} = ${obj[x]} % ${y}`);
				obj[x] = obj[x] % y;
				break;
			case 'rcv': 
				if (obj[x] != 0) {
					console.log("Recovering.")
					return sound;
				}
				else {
					console.log("x = 0. Skip recover");
					break;
				}
			case 'jgz':
				if (obj[x] > 0) {
					i += y;
					console.log(`Jumping to ${i} (by ${y})`);
					i--; //Since i++ in loop
					break;
				}
				else {
					console.log("x <= 0. Skip jump");
					break;
				}
			default:
				console.log("invalid direction.");
				break;
		}
	}
	return "Final command executed.";
}

