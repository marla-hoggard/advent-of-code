//Advent of Code - Day 14 - Puzzle 1
//Convert input-0 ... input-127 via asciiHash(Day10)
//Convert each hex output to binary (4 binary digits per hex digit)
//Returns number of "1" in 128x128 grid
function defragment(input) {
	//hexGrid is 128 hexidecimal knot hashes
	var hexGrid = [];
	for (var i = 0; i < 128; i++) {
		var row = input + "-" + i;
		hexGrid.push(asciiHash(row)); //asciiHash defined in Day10-Puzzle2.js
	}
	//Convert each hex to 4-char binary string
	//Count ones in each string and add to used
	var used = 0;
	for (i = 0; i < 128; i++) {
		for (var j = 0; j < 32; j++) {
			var binary = parseInt(hexGrid[i].charAt(j),16)
									.toString(2);
			if (binary.match(/1/g)) {
				used += binary.match(/1/g).length;
			}
		}
	}
	return used;
}