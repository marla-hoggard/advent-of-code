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

// Returns the number of occurrences of @val in the iterable @iter
// @iter can be an array or a string
// Note: If @iter is an array, @val must be a full match of an element in the array
const numOccurrencesBaseMethod = (iter, val) => {
	let found = 0;
	let i = iter.indexOf(val);
	while (i !== -1) {
		found++;
		i = iter.indexOf(val, i + 1);
	}
	return found;
}

// Returns the number of occurences of @val in @set
// @set can be an array, a string, or a value that can be converted to a string (like a number.toString())
// @array can be an array of arrays any dimension deep
const numOccurrences = (set, val) => {
	if (Array.isArray(set)) {
		if (Array.isArray(set[0])) {
			return sum(set.map(row => numOccurrences(row, val)));
		}
		else {
			return numOccurrencesBaseMethod(set, val);
		}
	} else {
		return numOccurrencesBaseMethod(set.toString(), val);
	}
}

// Checks if simple @array1 is the same content as array2
// Currently, the arrays much be of simple types that can be compared with ===
// TODO: Update to allow multi-dimensional arrays and objects
const isSameArray = (array1, array2) => {
	return array1.length === array2.length && array1.every((row, i) => row === array2[i]);
}