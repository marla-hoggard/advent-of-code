/*Takes a sequence ("#,#,#"), converts the whole string to ascii, including commas, then adds 17, 31, 73, 47, 23.
Performs knotHash 64 times, except skip keeps incrementing its value instead of starting from 0. 
The 256-size array is reduced to 16 elements, by using XOR pairwise on each 16-element chunk.
These 16 elements are converted to hexidecimal - that 32-char string is returned.*/
function asciiHash(sequence) {
	var array = sizeArray(255);
	//build sequence array by converting each char to ascii
	var seq = [];
	for (var i = 0, n = sequence.length; i < n; i++) {
		seq.push(sequence.charCodeAt(i));
	}
	seq.push(17,31,73,47,23);
	var steps = seq.length;
	var moves = seq.reduce((a,b) => 1*a + 1*b);
	seq = seq.join(",");
	
	//Run the sequence 64 times, increasing skip by steps each time
	for (var h = 0; h < 64; h++) {
		array = knotHash2(seq,array,steps*h);
	}
	
	//array[0] is incorrectly current position
	//Calculate offset based on sum of sequence (moves) + sum of skips (1+2+...steps), 
	//then shift array to proper start value
	moves *= 64;
	steps *= 64;
	var offset = moves + ((steps * (steps - 1)) / 2);
	offset = offset % 256;
	var toShift = array.slice(0,256 - offset)
	array = (array.slice(0 - offset)).concat(toShift);
	//console.log(array);
	
	//Reduce from sparse hash to 16-element dense hash
	var xorArray = [];
	for (var x = 0; x < 256; x+=16) {
		xorArray.push((array.slice(x,x+16)).reduce((a,b) => a^b));
	}
	//console.log(xorArray);
	
	//Convert dense hash to 32-char hexidecimal string
	var hexidecimal = "";
	for (var hex = 0; hex < 16; hex++) {
		var add = +xorArray[hex];
		hexidecimal += (add).toString(16).padStart(2,'0');
	}
	return hexidecimal;
}

//Returns an array of integers [0,1,...num]
function sizeArray(num) {
	var array = [];
	for (var i = 0; i <= num; i++) {
		array.push(i);
	}
	return array;
}

//Performs the knotHash method on array with given sequence and initial skip value. Returns the modified array
function knotHash2(sequence,array,skip) {
	//seq is an array of the steps
	var seq = sequence.split(",");
	for (var step = 0, n = seq.length; step < n; step++) {
		var split = seq[step];
		//Select substring to reverse and reverse it
		var rev = array.slice(0,split);
		rev.reverse();
		//Select the rest of the array, then put reversed at the end
		var rest = array.slice(split);	
		array = rest.concat(rev);
		//Do the skip, by moving 'skip' elements to the end of array
		var toSkip = array.slice(0,skip % 256)
		array = (array.slice(skip % 256)).concat(toSkip);
		skip++;
	}	
	return array;
}
