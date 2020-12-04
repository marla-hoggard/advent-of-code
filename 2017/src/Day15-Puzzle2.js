//Advent of Code - Day 15 - Puzzle 2
//Takes genA and genB start values
//Keeps running gen pattern til a div 4 and b div 8
//Returns [#matches, last a, last b]
function generatorMatches2(genA,genB) {
	const multA = 16807;
	const multB = 48271;
	const divisor = 2147483647;
	
	var a = genA;
	var b = genB;
	
	var matches = 0;

	for (var i = 0; i < 100000; i++) {
		a = (a * multA) % divisor;
		while (a % 4 !== 0) {
			a = (a * multA) % divisor;
		}
		b = (b * multB) % divisor;
		while (b % 8 !== 0) {
			b = (b * multB) % divisor;
		}
		if (a.toString(2).padStart(16,"0").substr(-16) == b.toString(2).padStart(16,"0").substr(-16)) {
			matches++;
		}
		
	}
	return [matches,a,b];
}

//Runs generator 50 times to reach 5 million
function repeatGen2(genA,genB) {
	var matches = 0;
	for (var i = 0; i < 50; i++) {
		var result = generatorMatches2(genA,genB);
		matches += result[0];
		genA = result[1];
		genB = result[2];
		console.log(`${i}: ${matches}`);
	}
	return matches;
}