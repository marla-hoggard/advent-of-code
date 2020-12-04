//Advent of Code - Day 23 - Part 2
//In effect the question is from 107900 - 124900, by 17s, inclusive, how many numbers are not prime
function coprocessorsOptimized() {
	var processors = {a: 1, b: 107900, c: 124900, d: 2, e: 2, f: 1, g: 0, h: 0};
	let [a,b,c,d,e,f,g,h] = [1,107900,124900,2,2,1,0,0];
	while (b <= 124900) { 
		f = 1;
			for (d = 2; d < b && f != 0; d++) {
				if (b % d == 0) {
					for (e = 2; e < b && f != 0; e++) {
						if (d*e == b) {
							f = 0;
							//console.log(`b = d*e: ${b} = ${d}*${e}`);
						}
					}
				}	
			}
			if (f == 0) {
				h++;
				//console.log(`h: ${h}`);
			}	
		b += 17;
	}
	return h;
}

//Returns true if num is prime, else false
function isPrime(num) {
	if (num <= 1) {
		return false;
	}
	if (num === 2) {
		return true;
	}
	if (num % 2 === 0) {
		return false;
	}
	for (let fact = 3; fact < Math.sqrt(num); fact += 2) {
		if (num % fact === 0) {
			return false;
		}
	}
	return true;
}