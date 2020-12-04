//Advent of Code - Day 15 - Puzzle 1
//Takes genA and genB start values
//Runs generator pattern 1,000,000 times (more breaks page)
//Returns [#matches, last a, last b]
function generatorMatches(genA,genB) {
	const multA = 16807;
	const multB = 48271;
	const divisor = 2147483647;
	
	var a = (genA * multA) % divisor;
	var b = (genB * multB) % divisor;
	
	var matches = 0;

	for (var i = 0; i < 1000000; i++) {
		if (a.toString(2).padStart(16,"0").substr(-16) == 
			b.toString(2).padStart(16,"0").substr(-16)) {
			matches++;
		}
		a = (a * multA) % divisor;
		b = (b * multB) % divisor;
	}
	return [matches,a,b];
}

//Runs generator 40 times to reach 40 million
function repeatGen(genA,genB) {
	var matches = 0;
	for (var i = 0; i < 40; i++) {
		var result = generatorMatches(genA,genB);
		matches += result[0];
		genA = result[1];
		genB = result[2];
		console.log(`${i}: ${matches}`);
	}
	return matches;
}