//Advent of Code - Day 13 - Puzzle 1
//Takes an array of scanners, each written "depth: range"
//Retuns the sum of depth*range for each scanner that catches you
//Caught if depth is divisible by (range-1)*2
function scanCaught(input) {
	//Breaks input into a nested array of [depth,range] pairs
	let array = input.map(elem => elem.split(": "));
	let severity = 0;

	array.forEach(scanner => {
		let depth = scanner[0];
		let range = scanner[1];
		if ((depth % ((range-1)*2)) == 0) {
			severity += depth * range;
		}
	});
	return severity;
}