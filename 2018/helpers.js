// @indices = a number or an array of numbers
// Removes the index/indices of @indices from array and returns array
const removeIndex = (array, indices) => {
	if (typeof indices === 'number') {
		return array.slice(0, indices).concat(array.slice(indices+1));
	}
	indices.sort((a,b) => a - b);
	while (indices.length) {
		const remove = indices.shift();
		array = removeIndex(array, remove);
		indices = indices.map(el => el - 1);
	}
	return array;
}

// Returns @array without first instance of @val
const removeVal = (array, val) => {
	const index = array.indexOf(val);
	if (index >= 0) {
		return array.slice(0, index).concat(array.slice(index + 1));
	} 
	return array;
}

const manhattanDistance = ([x1, y1], [x2, y2]) => {
	return Math.abs(x2-x1) + Math.abs(y2-y1);
}

// Returns how many instances of @val are in @array
// @val must be a primitive type
// @array must be made up of same type size as @val
const countInstances = (arrayOrString, val) => {
    let left = typeof arrayOrString === 'string' ? 
        [...arrayOrString.split('')] : [...arrayOrString];
    let count = 0;
    while (left.includes(val)) {
        count++;
        const i = left.indexOf(val);
        left = left.slice(i + 1);
    }
    return count;
}

// Returns how many instances of @val are in @array
// @array can be 2D array or array of strings, while @val is number/char
const countInstances2D = (array, val) => {
    let count = 0;
    array.forEach(row => {
        count += countInstances(row, val);
    });
    return count;
}