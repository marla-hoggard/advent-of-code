//Applies a sequence of substring reversals ("#,#")
//on a cyclical 0-255 array, returns arr[0]*arr[1]
function knotHash(sequence) {
	//Array will contain 0-255
	var array = [];
	for (var i = 0; i < 256; i++) {
		array.push(i);
	}
	var skip = 0;
	//sequence is an array of the steps
	var seq = sequence.split(",");
	console.log(`seq: ${seq}`);
	for (var step = 0, n = seq.length; step < n; step++) {
		var split = seq[step];
		//Select substring to reverse and reverse it
		var rev = array.slice(0,split);
		rev.reverse();
		//Select the rest of the array, then put reversed at the end
		var rest = array.slice(split);	
		array = rest.concat(rev);
		console.log(array);
		//Do the skip, by moving 'skip' elements to the end of array
		var toSkip = array.slice(0,skip)
		array = (array.slice(skip)).concat(toSkip);
		skip++;
	}	

	//Calculate the offset from all the steps to determine what arr[0] and arr[1] should be
	//Sum of 1....skip-1 (account for final skip++) + sum of values in sequence
	var offset = ((skip-1)*(skip)/2) + seq.reduce((a,b) => 1*a + 1*b);
	return array[256 - (offset % 256)] * array[257 - (offset % 256)];
}
