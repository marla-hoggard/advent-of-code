//Advent of Code - Day 13 - Puzzle 2
//How long should you delay in order to get through the
//scanner without being caught?
function scanDelay(input) {
	//Breaks input into a nested array of [depth,range] pairs
	let array = input.map(elem => elem.split(": "));

	//Tested in batches so as not to run indefinitely
	let lowbound = 1000000, highbound = 10000000;
	for (var delay = lowbound; delay <= highbound; delay++) {
		if (scanSafe(input,delay)) {
			return delay;
		}
		//Log every so often to show we're not stuck
		if (delay % 500000 == 0) {
			console.log(`Higher than ${delay}`);
		}
	}
	return `Higher than ${highbound}`;
}

//Returns true if you can make it through without being caught
//given scanners from input, and delay of delay
function scanSafe(input,delay) {
	//Breaks input into a nested array of [depth,range] pairs
	let array = input.map(elem => elem.split(": "));

	//Check each scanner in array, break loop and return false at first detected catch
	for (var j = 0, a = array.length; j < a; j++) {
		var depth = array[j][0];
		var range = array[j][1];
		if ((( +depth + delay) % ((range-1)*2)) === 0) {
			return false;
		}

	}
	return true;
}