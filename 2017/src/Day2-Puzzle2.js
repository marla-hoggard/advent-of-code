//Takes an array of arrays
//For each array, find the pair where one is a multiple of the other
//Return the sum of b/a from each row where a & b are the pair, b > a
function checksumDiv(matrix) {
	var array = [];
	var sum = 0;
	//Iterate through each row
	for (var i = 0, n = matrix.length; i < n; i++) {
		array = matrix[i];
		var len = array.length;
		//Sort ascending so we know b > a
		array.sort(function(a,b) {return a-b;});
		//We know there's exactly one pair, so break for loop once it's been found
		var found = false;
		for (var a = 0; a < len - 1 && !found; a++) {
			for (var b = a+1; b < len; b++) {
				if (array[b] % array[a] === 0) {
					console.log(`b is ${array[b]}, a is ${array[a]}.`);
					sum += array[b]/array[a];
					found = true;
					break;
				}
			}
		}
	}
	return sum;	
}
