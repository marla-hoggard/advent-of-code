const manhattanDistance = ([x1, y1], [x2, y2]) => {
	return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

const reduceFraction = (num, denom) => {
	const GCD = gcd(num, denom);
	return [num / GCD, denom / GCD];
}

// Find the greatest common denominator of a and b
const gcd = (a, b) => {
	return b ? gcd(b, a % b) : a;
}

const lcm2 = (a, b) => {
	return (a * b) / gcd(a, b);
}

const lcm3 = (a, b, c) => {
	return lcm2(lcm2(a, b), c);
}

// Return the sum of the values in an array
// For each element in @arr, Number(el) must return a number
const sum = arr => {
	let total = 0;
	for (let i = 0; i < arr.length; i++) {
		total += Number(arr[i]);
	}
	return total;
}

// Returns the number of occurrences of @val in the string @str
// @val can be any string but single letters will work the best
// If a multi-char val, the next occurrence starts after the end of the previous (no overlaps)
const numOccurrencesString = (str, val) => {
	const regex = new RegExp(val, "g");
	const matches = str.match(regex);
	return matches ? matches.length : 0;
}

// Returns the number of occurrences of @val in the array @arr
const numOccurrencesArray = (arr, val) => {
	let found = 0;
	let i = arr.indexOf(val);
	while (i !== -1) {
		found++;
		i = arr.indexOf(val, i + 1);
	}
	return found;
}

// Returns the number of occurences of @val in @set
// @set can be an array, a string, or a value that can be converted to a string (like a number.toString())
const numOccurrences = (set, val) => {
	if (Array.isArray(set)) {
		return numOccurrencesArray(set, val);
	}
	return numOccurrencesString(set.toString(), val);
}