//Advent of Code - Day 18 - Puzzle 2
//Takes comma-separated string of commands
//Returns how many times program 1 executed the send function
function duet2(input) {
	var dir = input.split(",");
	var prog0 = {};
	var prog1 = {};
	prog0.p = 0;
	prog1.p = 1;
	var prog0send = [];
	var prog1send = [];
	var prog1sent = 0;
	for (var i = 0, j = 0, n = dir.length; i < n || j < n; i++, j++) {
		if (i < n) { //program 0 has not jumped off the end
			var step0 = dir[i].split(" "); //instructions
			var x0 = step0[1]; //argument to act on
			var y0; //amount for step, if it exists
				if (step0[2]) {
					if (isNaN(step0[2])) { //variable name, get its value
						y0 = prog0[step0[2]];
					}
					else {
						y0 = +step0[2]; //number
					}
				}	
		}
		if (j < n) { //program 1 has not jumped off the end
			var step1 = dir[j].split(" ");
			var x1 = step1[1]; 
			var y1;
				if (step1[2]) {
					if (isNaN(step1[2])) {
						y1 = prog1[step1[2]];
					}
					else {
						y1 = Number(step1[2]);
					}
				}
		}
		if (j < n) {
			//Program 1's step
			switch (step1[0]) {
				case 'snd':
					var sending1;
					if (isNaN(x1)) {
						sending1 = prog1[x1];
					}
					else {
						sending1 = x1;
					}
					prog1send.push(sending1);
					prog1sent++; //This is the value that will be returned
					console.log(`prog1 sends = ${sending1}`);
					break;
				case 'set':
					prog1[x1] = y1;
					console.log(`${x1} = ${y1}`);
					break;
				case 'add':
					console.log(`${prog1[x1]} += ${y1}`);
					prog1[x1] = Number(prog1[x1]) + Number(y1);
					break;
				case 'mul':
					console.log(`${prog1[x1]} *= ${y1}`);
					prog1[x1] *= Number(y1);
					break;
				case 'mod':
					console.log(`${x1} = ${prog1[x1]} % ${y1}`);
					prog1[x1] = prog1[x1] % y1;
					break;
				case 'rcv': 
					if (prog0send.length > 0) {
						console.log(`prog1 receives ${prog0send[0]}`)
						prog1[x1] = prog0send.shift();
						break;
					}
					//Both programs are waiting on receive - terminate
					else if (prog1send.length == 0 && (i >=n || step0[0] == 'rcv')) {
						console.log("Both programs stuck on receive. Terminating.");
						return prog1sent;
					}
					else {
						j--; //hold on this step until prog1send exists
						console.log(`Prog1 waiting on step ${j}`);
						break;
					}
				case 'jgz':
					var jumper1 = x1;
					if (isNaN(x1)) {
						jumper1 = prog1[x1];
					}
						if (jumper1 > 0) {
							j += y1;
							console.log(`Prog1 jumping to ${j} (by ${y1})`);
							j--; //Since i++ in loop
							break;
						}
						else {
							console.log(`${prog1[x1]} comes from ${[x1]}.`);
							console.log(`${prog1[x1]} <= 0. Skip jump`);
							console.log(prog1);
							break;
						}
				default:
					console.log("invalid direction.");
					break;
			}
		}
		if (i < n) {
			//Program 0's step
			switch (step0[0]) {
				case 'snd':
					var sending0 = x0;
					if (isNaN(x0)) {
						sending0 = prog0[x0];
					}
					prog0send.push(sending0);
					console.log(`prog0 sends = ${sending0}`);
					break;
				case 'set':
					prog0[x0] = y0;
					console.log(`${x0} = ${y0}`);
					break;
				case 'add':
					console.log(`${prog0[x0]} += ${y0}`);
					prog0[x0] = +prog0[x0] + +y0;
					break;
				case 'mul':
					console.log(`${prog0[x0]} *= ${y0}`);
					prog0[x0] *= y0;
					break;
				case 'mod':
					console.log(`${x0} = ${prog0[x0]} % ${y0}`);
					prog0[x0] = prog0[x0] % y0;
					break;
				case 'rcv': 
					if (prog1send.length > 0) {
						console.log(`prog0 receives ${prog1send[0]}`)
						prog0[x0] = prog1send.shift();
						break;
					}
					//Both programs are waiting on receive - terminate
					else if (prog0send.length == 0 && (j >= n || step1[0] == 'rcv')) {
						console.log("Both programs stuck on receive. Terminating.");
						return prog1sent;
					}
					else {
						i--; //hold on this step until prog1send exists
						console.log(`Prog0 waiting on step ${i}`);
						break;
					}
				case 'jgz':
					var jumper0 = x0;
					if (isNaN(x0)) {
						jumper0 = prog0[x0];
					}
					if (jumper0 > 0) {
						i += y0;
						console.log(`Jumping to ${i} (by ${y0})`);
						i--; //Since i++ in loop
						break;
					}
					else {
						console.log(`${prog0[x0]} <= 0. Skip jump`);
						break;
					}
				default:
					console.log("invalid direction.");
					break;
			}
		}
		
		
	}	
	console.log(prog0);
	console.log(prog1);
	console.log(prog0send);
	console.log(prog1send);	
	return prog1sent;
}