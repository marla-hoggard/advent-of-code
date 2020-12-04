//Builds out the spiral as described in the puzzle
//Returns the nth number in the spiral 
//Numbers spiral out from center. Each added number = sum of adjacent numbers that exist when that number is added
function spiralSum(n) {
	if (n < 1) {
		console.log(`${n} is not a positive integer.`);
		return;
	}
	//The first nine numbers (plus 0 for 0)
	var init = [0,1,1,2,4,5,10,11,23,25];
	if (n < 10) {
		return init[n];
	}
	
	var ring = 3;
	var i = 5;
	//Figure out what ring n is in
	while(n > i*i) {
		ring++;	
		i+=2;
	}
	var size = i-1; //length of side without double-counting corners
	var diff1 = 8*(ring-2);
	var side = 4 - Math.floor(((i*i) - n ) / size); //Which side are you on (1,2,3,4)
	
	/*All the different options for location in spiral aka which numbers are adjacent and already drawn*/
	//Note: some of these cases could likely be generalized as a function of their side 
	//but with so much math already, it would be easy to make arithmetic mistakes
	
	/*EACH CORNER*/
	if (n == i*i) { //Fourth corner
		return (spiralSum(n-1) 
				+ spiralSum((i-2)*(i-2)) 
				+ spiralSum((i-2)*(i-2)+1));
	}
	if (n == (i*i) - size) { //Third corner
		return spiralSum(n-1) + spiralSum(n-diff1-6);
	}
	if (n == (i*i) - (size*2)) { //Second corner
		return spiralSum(n-1) + spiralSum(n-diff1-4);
	}
	if (n == (i*i) - (size*3)) { // First corner
		return (spiralSum(n-1) + spiralSum(n-diff1-2));
	}
		
	/*OTHER SPECIAL CASES*/
	if (n == ((i-2)*(i-2) + 1)) { //First elem in ring
		return spiralSum(n-1) + spiralSum(n-diff1);
	}
	if (n == ((i-2)*(i-2) + 2)) { //Second elem in ring
		return spiralSum(n-1) 
				+ spiralSum(n-2)
				+ spiralSum(n-diff1) 
				+ spiralSum(n-diff1-1);
	}
	if (n == ((i*i) - (size*3) - 1)) { //1st corner -1
		return (spiralSum(n-1) 
				+ spiralSum(n-diff1-2) 
				+ spiralSum(n-diff1-1));
	}
	
		if (n == ((i*i) - (size*3) + 1)) { //1st corner +1
		return (spiralSum(n-1) 
				+ spiralSum(n-2) 
				+ spiralSum(n-diff1-2) 
				+ spiralSum(n-diff1-3));
	}
	
	if (n == ((i*i) - (size*2) - 1)) { //2nd corner -1
		return (spiralSum(n-1) 
				+ spiralSum(n-diff1-3) 
				+ spiralSum(n-diff1-4));
	}
	
	if (n == ((i*i) - (size*2) + 1)) { //2nd corner +1
		return (spiralSum(n-1) 
				+ spiralSum(n-2) 
				+ spiralSum(n-diff1-4) 
				+ spiralSum(n-diff1-5));
	}
	
	if (n == ((i*i) - size - 1)) { //3rd corner -1
		return (spiralSum(n-1) 
				+ spiralSum(n-diff1-5) 
				+ spiralSum(n-diff1-6));
	}
	
	if (n == ((i*i) - size + 1)) { //3rd corner +1
		return (spiralSum(n-1) 
				+ spiralSum(n-2) 
				+ spiralSum(n-diff1-6) 
				+ spiralSum(n-diff1-7));
	}
	
	/*NOT CORNER OR NEXT TO CORNER*/
	if (side == 1) {
		return (spiralSum(n-1) 
				+ spiralSum(n-diff1)
				+ spiralSum(n-diff1-1) 
				+ spiralSum(n-diff1-2));
	}
	if (side == 2) {
		return (spiralSum(n-1) 
				+ spiralSum(n-diff1-2)
				+ spiralSum(n-diff1-3) 
				+ spiralSum(n-diff1-4));
	}
	if (side == 3) {
		return (spiralSum(n-1) 
				+ spiralSum(n-diff1-4)
				+ spiralSum(n-diff1-5) 
				+ spiralSum(n-diff1-6));
	}
	else { //side 4
		return (spiralSum(n-1) 
				+ spiralSum(n-diff1-6)
				+ spiralSum(n-diff1-7) 
				+ spiralSum(n-diff1-8));
	}	
	
}

//Returns the first value of spiralSum larger than n
//Puzzle asks for first entry above puzzle input (used to get actual answer)
function spiralRun(n) {
	var i = 1;
	while (spiralSum(i) <= n) {
		i++;
	}
	return spiralSum(i);
}
