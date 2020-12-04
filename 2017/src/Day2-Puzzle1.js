//Takes an array of arrays, the puzzle input
//For each array, calculate the difference between min and max
//Return the sum of those differences
function checksum(matrix) {
	var array = [];
	var sum = 0;
	//iterate through each row of the matrix (each subarray)
	for (var i = 0, n = matrix.length; i < n; i++) {
		array = matrix[i];
		//Sort row ascending, add difference between first and last entry to sum
		array.sort(function(a,b) {return a-b;});
		sum += (array[array.length - 1] - array[0]);
	}
	return sum;	
}

//ALTERNATE SOLUTION - USING SPREAD OPERATOR
function checksum2(matrix) {
	var array = [];
	var sum = 0;
	//iterate through each row of the matrix (each subarray)
	for (var i = 0, n = matrix.length; i < n; i++) {
		array = matrix[i];
		//Use spread operator to find min and max
		sum += Math.max(...array) - Math.min(...array);
	}
	return sum;	
}
