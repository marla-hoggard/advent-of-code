//Advent of Code - Day 21
//Returns the sum of the values after ${iterations}
//where . = 0, # = 1
function fractalArt(iterations) {
	let initial = [[0,1,0],[0,0,1],[1,1,1]];
	let len = 3;
	let fractal = initial;

	for (var i = 0; i < iterations; i++) {
		let nextFractal = [];
		len = fractal.length;

		//Split into 2x2 and run transformation
		if (len % 2 === 0) {
			for (var col = 0; col < len; col += 2) {
				for (var row = 0; row < fractal[col].length; row += 2) {
					let square = [[fractal[col][row],fractal[col][row+1]],[fractal[col+1][row],fractal[col+1][row+1]]];
					nextFractal.push(map2to3(square));
				}
			}
			nextFractal = matrixStitch(nextFractal);
		}
		//Split into 3x3 and run transformation
		else {
			for (var col = 0; col < len; col += 3) {
				for (var row = 0; row < fractal[col].length; row += 3) {
					let square = [
						[fractal[col][row], fractal[col][row+1], fractal[col][row+2]],
						[fractal[col+1][row], fractal[col+1][row+1], fractal[col+1][row+2]],
						[fractal[col+2][row], fractal[col+2][row+1], fractal[col+2][row+2]]
					];
					nextFractal.push(map3to4(square));
				}
			}
			nextFractal = matrixStitch(nextFractal);

		}
		fractal = nextFractal;
		console.log(fractal);
	}

	//Return the sum of the fractal matrix
	return matrixSum(fractal);

}

//Takes a 2x2 matrix and returns a 3x3 based on the provided rules
function map2to3(square) {
	let newSquare;
	if (matrixSum(square) == 0) {
		newSquare = [[0,0,0],[1,0,0],[1,0,0]];
	}
	else if (matrixSum(square) == 1) {
		newSquare = [[1,1,1],[1,0,1],[0,1,0]];
	}
	else if (matrixSum(square) == 2) {
		//diagonals [.#/#.]
		if (square[0][0] == square[1][1]) {
			newSquare = [[0,1,0],[0,0,1],[0,0,0]];
		}
		//Same side [##/..]
		else {
			newSquare = [[1,1,1],[0,1,1],[1,1,0]];
		}
	}
	else if (matrixSum(square) == 3) {
		newSquare = [[1,1,0],[0,1,1],[1,0,0]];
	}
	else { //sum = 4
		newSquare = [[1,0,1],[1,1,1],[0,1,1]];
	}
	return newSquare;

}

//Takes a 3x3 matrix and returns a 4x4 based on the provided rules
function map3to4(square) {
	var option, corner, corners, middle, middles, triple;
	switch (matrixSum(square)) {
		case 0:
			return [[1,0,1,0],[0,1,0,1],[1,0,1,0],[1,1,1,0]];
		case 1:
			//The one is in the center
			if (square[1][1] === 1) {
				return [[0,0,0,1],[1,1,0,1],[0,0,0,1],[1,1,1,0]];
			}
			//The one is in a corner
			else if (square[0][0] === 1 || square[0][2] === 1 || 
				square[2][0] === 1 || square[2][2] == 1) {
				return [[1,0,0,1],[0,1,1,1],[1,1,0,0],[1,1,0,0]];
			}
			else { //The one is the middle of a side
				return [[1,0,1,1],[1,1,1,1],[0,1,1,1],[0,0,0,0]];
			}
			break;
		case 2:
			//There's a 1 in the center
			if (square[1][1] === 1) {
				//There's a 1 in one corner
				if (numCorners(square,1) === 1) {
					return [[1,0,1,0],[1,1,1,1],[0,1,0,0],[1,1,0,1]];
				}
				else { //The second 1 is on a side
					return [[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,0,1]];
				}
			}
			//Both 1s are on sides
			else if (numMiddles(square,1) === 2) {
				//opposite each other
				if (square[1][0] === square[1][2]) {
					return [[1,0,0,0],[1,0,0,0],[0,0,0,1],[1,0,0,0]];
				}
				//adjacent sides
				else {
					return [[0,1,1,1],[1,0,0,1],[1,0,0,0],[1,0,0,0]];
				}
			}
			//Both 1s are on corners
			else if (numCorners(square,1) === 2) {
				//opposite corners
				if (square[0][0] === square[2][2]) {
					return [[1,1,0,0],[0,1,0,0],[1,0,1,0],[0,1,1,0]];
				}
				//adjacent corners
				else { 
					return [[0,0,0,0],[1,0,0,0],[0,1,1,0],[1,0,1,1]];
				}
			}
			//1 on corner, 1 on side (two possibilities)
			middle = whichMiddles(square,1)[0];
			switch (whichCorners(square,1)[0]) {
				case 1: 
					if (middle === 1 || middle === 2) {
						option = 'adj';
					}
					else option = 'opp';
					break;
				case 2:
					if (middle === 1 || middle === 3) {
						option = 'adj';
					}
					else option = 'opp';
					break;
				case 3:
					if (middle === 2 || middle === 4) {
						option = 'adj';
					}
					else option = 'opp';
					break;
				case 4:
					if (middle === 3 || middle === 4) {
						option = 'adj';
					}
					else option = 'opp';
					break;
				default:
					console.error("Something's wrong in map3to4");
					return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			}
			if (option === 'adj') {
				return [[1,1,1,1],[0,1,0,0],[1,0,1,1],[1,0,1,1]];
			}
			else return [[1,0,1,1],[0,1,0,0],[0,0,0,1],[0,0,1,1]];
			break;
		case 3:
			//There's a 1 in the center (6 options)
			if (square[1][1] === 1) {
				//Both other 1s are on sides
				if (numMiddles(square,1) === 2) {
					//opposite each other
					if (square[1][0] === square[1][2]) {
						return [[1,0,0,1],[0,1,0,1],[1,0,1,1],[0,0,1,0]];
					}
					//adjacent sides
					else {
						return [[1,1,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1]];
					}
				}
				//Both other 1s are on corners
				else if (numCorners(square,1) === 2) {
					//opposite corners
					if (square[0][0] === square[2][2]) {
						return [[1,0,0,1],[1,0,1,1],[1,1,0,0],[1,0,0,1]];
					}
					//adjacent corners
					else { 
						return [[0,0,1,0],[1,1,1,0],[1,1,1,1],[0,1,0,1]];
					}
				}
				//1 on corner, 1 on side (two possibilities)
				else {
					middle = whichMiddles(square,1)[0];
					switch (whichCorners(square,1)[0]) {
						case 1: 
							if (middle === 1 || middle === 2) {
								option = 'adj';
							}
							else option = 'opp';
							break;
						case 2:
							if (middle === 1 || middle === 3) {
								option = 'adj';
							}
							else option = 'opp';
							break;
						case 3:
							if (middle === 2 || middle === 4) {
								option = 'adj';
							}
							else option = 'opp';
							break;
						case 4:
							if (middle === 3 || middle === 4) {
								option = 'adj';
							}
							else option = 'opp';
							break;
					}
					if (option === 'adj') {
						return [[1,1,1,0],[1,0,1,0],[1,0,0,0],[1,1,1,0]];
					}
					else return [[0,0,0,0],[1,0,0,1],[0,1,0,0],[1,0,0,1]];
				}
			}
			//All three 1s are corners
			else if (numCorners(square,1) === 3) {
				return [[0,1,1,0],[1,1,0,1],[0,1,0,0],[1,0,0,0]];
			}
			//All three 1s are sides
			else if (numMiddles(square,1) === 3) {
				return [[1,1,0,0],[0,1,1,1],[1,0,1,1],[1,0,1,0]];
			}
			//2 corners, 1 middle (4 options)
			else if (numCorners(square,1) === 2) {
				//2 opposite corners
				if (square[0][0] === square[2][2]) {
					return [[1,1,1,1],[0,0,1,0],[1,0,0,1],[1,1,0,0]];
				}
				middle = whichMiddles(square,1)[0];
				corners = whichCorners(square,1);
				switch (middle) {
					case 1:
						//the middle is between the corners
						if (corners.includes(1) && corners.includes(2)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(3) && corners.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 2:
						//the middle is between the corners
						if (corners.includes(1) && corners.includes(3)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(2) && corners.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 3:
						//the middle is between the corners
						if (corners.includes(2) && corners.includes(4)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(1) && corners.includes(3)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 4:
						//the middle is between the corners
						if (corners.includes(3) && corners.includes(4)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(1) && corners.includes(2)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					default:
						console.error("Something's wrong in map3to4");
						return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
				}
				switch (triple) {
					case 'stripe':
						return [[0,1,1,1],[0,1,0,0],[0,0,0,1],[0,1,0,0]];
					case 'opp':
						return [[1,1,1,0],[1,0,0,0],[0,0,1,1],[1,0,0,0]];
					case 'mixed':
						return [[1,0,1,1],[0,0,1,1],[0,0,0,0],[1,1,0,1]];
					default:
						console.error("Something's wrong in map3to4");
						return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
				}

			}
			//1 corner, 2 middles (4 options)
			//the middles are opposites
			else if (square[1][0] === square[1][2]) {
				return [[1,1,0,0],[1,0,0,1],[0,1,1,0],[0,1,1,0]];
			}
			middles = whichMiddles(square,1);
			corner = whichCorners(square,1)[0];
			switch (corner) {
				case 1:
					//the corner is between the middles
					if (middles.includes(1) && middles.includes(2)) {
						triple = 'corner';
					}
					//the middle is opposite both corners
					else if (middles.includes(3) && middles.includes(4)) {
						triple = 'opp';
					}
					else triple = 'mixed';
					break;
				case 2:
					//the corner is between the middles
					if (middles.includes(1) && middles.includes(3)) {
						triple = 'corner';
					}
					//the corner is opposite both middles
					else if (middles.includes(2) && middles.includes(4)) {
						triple = 'opp';
					}
					else triple = 'mixed';
					break;
				case 3:
					//the corner is between the middles
					if (middles.includes(2) && middles.includes(4)) {
						triple = 'corner';
					}
					//the corner is opposite both middles
					else if (middles.includes(1) && middles.includes(3)) {
						triple = 'opp';
					}
					else triple = 'mixed';
					break;
				case 4:
					//the corner is between the middles
					if (middles.includes(3) && middles.includes(4)) {
						triple = 'corner';
					}
					//the corner is opposite both middles
					else if (middles.includes(1) && middles.includes(2)) {
						triple = 'opp';
					}
					else triple = 'mixed';
					break;
				default:
					console.error("Something's wrong in map3to4");
					return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			}
			switch (triple) {
				case 'corner':
					return [[0,0,1,1],[0,0,0,1],[1,0,1,1],[0,0,1,1]];
				case 'opp':
					return [[0,1,0,0],[1,0,1,1],[0,1,1,0],[0,0,1,0]];
				case 'mixed':
					return [[0,1,1,1],[0,1,1,1],[1,0,0,0],[0,0,0,0]];
				default:
					console.error("Something's wrong in map3to4");
					return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			}
			break;

		case 4: 
			//four corners
			if (numCorners(square,1) === 4) {
				return [[1,0,1,0],[0,0,0,0],[1,0,1,1],[0,1,0,1]];
			}
			//four middles
			else if (numMiddles(square,1) === 4) {
				return [[0,1,0,0],[1,1,0,0],[0,0,1,1],[1,0,1,1]];
			}
			//center is a 1
			else if (square[1][1] === 1) {
				//3 corners
				if (numCorners(square,1) === 3) {
					return [[0,1,0,1],[0,1,0,1],[0,1,1,0],[0,1,0,1]];
				}
				//3 middles
				else if (numMiddles(square,1) === 3) {
					return [[1,0,1,0],[0,0,0,1],[1,0,1,0],[1,0,1,1]];
				} 
				//2 corners + 1 middle
				else if (numCorners(square,1) === 2) {
					//opp corners
					if (square[0][0] == square[2][2]) {
						return [[1,1,1,1],[1,0,1,1],[0,0,0,0],[0,1,1,1]];
					}

					middle = whichMiddles(square,1)[0];
					corners = whichCorners(square,1);

					switch (middle) {
						case 1:
							//the middle is between the corners
							if (corners.includes(1) && corners.includes(2)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(3) && corners.includes(4)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						case 2:
							//the middle is between the corners
							if (corners.includes(1) && corners.includes(3)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(2) && corners.includes(4)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						case 3:
							//the middle is between the corners
							if (corners.includes(2) && corners.includes(4)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(1) && corners.includes(3)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						case 4:
							//the middle is between the corners
							if (corners.includes(3) && corners.includes(4)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(1) && corners.includes(2)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						default:
							console.error("Something's wrong in map3to4");
							return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
					}
					switch (triple) {
						case 'stripe':
							return [[0,1,0,1],[1,0,0,1],[0,0,1,0],[1,0,0,1]];
						case 'opp':
							return [[1,1,1,1],[0,0,0,1],[0,0,1,1],[1,1,0,0]];
						case 'mixed':
							return [[1,1,1,0],[0,0,1,1],[1,0,1,0],[1,0,0,0]];
						default:
							console.error("Something's wrong in map3to4");
							return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
					}
				} 
				//2 middles + 1 corner
				//opposite middles
				else if (square[1][0] == square[1][2]) {
					return [[0,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,1,1]];
				} 

				middles = whichMiddles(square,1); 
				corner = whichCorners(square,1)[0];  
				switch (corner) { 
					case 1:
						//the corner is between the middles
						if (middles.includes(1) && middles.includes(2)) {
							triple = 'corner';
						}
						//the middle is opposite both corners
						else if (middles.includes(3) && middles.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 2:
						//the corner is between the middles
						if (middles.includes(1) && middles.includes(3)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(2) && middles.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break; 
					case 3:
						//the corner is between the middles
						if (middles.includes(2) && middles.includes(4)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(1) && middles.includes(3)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;  
					case 4:
						//the corner is between the middles
						if (middles.includes(3) && middles.includes(4)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(1) && middles.includes(2)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;  
					
				}
				switch (triple) {
					case 'corner':
						return [[1,0,0,0],[0,0,1,1],[1,0,1,0],[0,0,0,0]]; 
					case 'opp':
						return [[0,1,1,0],[1,0,1,1],[0,0,0,1],[1,0,0,0]];
					case 'mixed':
						return [[0,0,0,1],[1,0,0,1],[1,1,1,1],[0,0,0,1]];
				}
			}    /*OFF?*/

	
			//3 corners + 1 middle
			else if (numCorners(square,1) === 3) {
				corners = whichCorners(square,1);
				middle = whichMiddles(square,1)[0];
				if (!corners.includes(1)) {
					if (middle === 3 || middle === 4) {
						option = 'between';
					}
					else option = 'outside';
				}
				else if (!corners.includes(2)) {
					if (middle === 2 || middle === 4) {
						option = 'between';
					}
					else option = 'outside';

				}
				else if (!corners.includes(3)) {
					if (middle === 1 || middle === 3) {
						option = 'between';
					}
					else option = 'outside';

				}
				else { //corners are 1,2,3; not 4
					if (middle === 1 || middle === 2) {
						option = 'between';
					}
					else option = 'outside';
				}

				if (option === 'between') {
					return [[1,0,1,0],[0,0,0,0],[0,0,1,0],[1,1,1,1]];
				}
				else return [[1,0,1,0],[1,1,1,0],[0,1,0,1],[1,0,0,1]];
			}

			//3 middles + 1 corner
			else if (numMiddles(square,1) === 3) {
				corner = whichCorners(square,1)[0];
				middles = whichMiddles(square,1);
				if (!middles.includes(1)) {
					if (corner === 3 || corner === 4) {
						option = 'between';
					}
					else option = 'outside';
				}
				else if (!middles.includes(2)) {
					if (corner === 2 || corner === 4) {
						option = 'between';
					}
					else option = 'outside';

				}
				else if (!middles.includes(3)) {
					if (corner === 1 || corner === 3) {
						option = 'between';
					}
					else option = 'outside';

				}
				else { //middles are 1,2,3; not 4
					if (corner === 1 || corner === 2) {
						option = 'between';
					}
					else option = 'outside';
				}
				if (option === 'between') {
					return [[1,1,0,1],[0,1,0,1],[1,0,1,0],[0,0,1,0]];
				}
				else return [[0,1,1,1],[0,0,0,0],[0,1,1,1],[1,0,1,1]];
			}

			/* 2 corners + 2 middles */
			//2 opposite corners
			else if (square[0][0] == square[2][2]) {
				//2 opp middles
				if (square[1][0] == square[1][2]) {
					return [[0,0,1,0],[0,0,1,1],[1,1,1,1],[1,0,0,0]];
				}
				middles = whichMiddles(square,1);
				//First and last corner are 1s
				if (square[0][0] === 1) {
					//middles surround one corner
					if (middles[1] - middles[0] === 1) {
						return [[1,1,1,1],[0,0,1,1],[1,1,1,0],[0,1,0,1]];
					}
					//each middle is adj to one corner
					else {
						return [[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0]];
					}
				}
				else { //corners = [2,3]
					//middles surround one corner
					if (middles[1] - middles[0] === 2) {
						return [[1,1,1,1],[0,0,1,1],[1,1,1,0],[0,1,0,1]];
					}
					//each middle is adj to one corner
					else {
						return [[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0]];
					}
				}

			}
			/* 2 adjacent corners */
			corners = whichCorners(square,1);
			middles = whichMiddles(square,1);

			//2 opposite middles
			if (square[1][0] == square[1][2]) {
				//top and bottom are 1s
				if (square[0][1] === 1) {
					//a middle is between the two corners
					if (corners[1] - corners[0] === 1) {
						return [[0,0,0,0],[1,0,1,1],[0,1,0,1],[1,0,0,1]];
					}
					else return [[0,1,1,0],[0,0,0,1],[0,0,0,1],[0,1,0,0]];
				}
				else { //left and right are 1s
					//a middle is between the two corners
					if (corners[1] - corners[0] === 2) {
						return [[0,0,0,0],[1,0,1,1],[0,1,0,1],[1,0,0,1]];
					}
					else return [[0,1,1,0],[0,0,0,1],[0,0,0,1],[0,1,0,0]];
				}
			}
			//2 adjacent middles
			else if (corners.includes(1) && corners.includes(2)) {
				option = middles.includes(1) ? 'between' : 'outside';
			}
			else if (corners.includes(1) && corners.includes(3)) {
				option = middles.includes(2) ? 'between' : 'outside';
			}
			else if (corners.includes(2) && corners.includes(4)) {
				option = middles.includes(3) ? 'between' : 'outside';
			}
			else {
				option = middles.includes(4) ? 'between' : 'outside';
			}

			if (option === 'between') {
				return [[1,0,0,0],[1,1,1,1],[0,1,0,1],[0,0,0,0]];
			}
			else return [[0,0,1,0],[0,1,1,0],[0,0,0,0],[0,0,1,1]];
			break;

		case 5: 
			//four corners
			if (numCorners(square,0) === 4) {
				return [[0,0,1,1],[0,0,1,0],[0,0,1,1],[1,1,1,0]];
			}
			//four middles
			else if (numMiddles(square,0) === 4) {
				return [[0,0,1,0],[1,0,0,1],[1,0,0,1],[1,1,0,0]];
			}
			//center is a 0
			else if (square[1][1] === 0) {
				//3 corners
				if (numCorners(square,0) === 3) {
					return [[1,0,1,1],[1,0,1,0],[1,0,0,1],[1,1,0,1]];
				}
				//3 middles
				else if (numMiddles(square,0) === 3) {
					return [[1,0,1,1],[1,0,0,0],[0,0,1,1],[0,0,0,1]];
				} 
				//2 corners + 1 middle
				else if (numCorners(square,0) === 2) {
					//opp corners
					if (square[0][0] == square[2][2]) {
						return [[1,1,0,1],[1,1,0,1],[1,0,1,1],[0,1,1,1]] ;
					}

					middle = whichMiddles(square,0)[0];
					corners = whichCorners(square,0);

					switch (middle) {
						case 1:
							//the middle is between the corners
							if (corners.includes(1) && corners.includes(2)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(3) && corners.includes(4)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						case 2:
							//the middle is between the corners
							if (corners.includes(1) && corners.includes(3)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(2) && corners.includes(4)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						case 3:
							//the middle is between the corners
							if (corners.includes(2) && corners.includes(4)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(1) && corners.includes(3)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						case 4:
							//the middle is between the corners
							if (corners.includes(3) && corners.includes(4)) {
								triple = 'stripe';
							}
							//the middle is opposite both corners
							else if (corners.includes(1) && corners.includes(2)) {
								triple = 'opp';
							}
							else triple = 'mixed';
							break;
						default:
							console.error("Something's wrong in map3to4");
							return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
					}
					switch (triple) {
						case 'stripe':
							return [[1,1,1,1],[0,0,1,0],[1,1,1,0],[1,0,1,1]];
						case 'opp':
							return [[1,0,0,1],[0,1,1,1],[0,0,0,0],[1,1,1,0]];
						case 'mixed':
							return [[1,1,1,1],[0,0,1,1],[1,0,1,1],[1,0,1,1]];
						default:
							console.error("Something's wrong in map3to4");
							return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
					}
				} 
				//2 middles + 1 corner
				//opposite middles
				else if (square[1][0] == square[1][2]) {
					return [[0,1,1,0],[0,1,0,1],[0,1,0,1],[1,1,0,0]];
				} 

				middles = whichMiddles(square,0); 
				corner = whichCorners(square,0)[0];  
				switch (corner) { 
					case 1:
						//the corner is between the middles
						if (middles.includes(1) && middles.includes(2)) {
							triple = 'corner';
						}
						//the middle is opposite both corners
						else if (middles.includes(3) && middles.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 2:
						//the corner is between the middles
						if (middles.includes(1) && middles.includes(3)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(2) && middles.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break; 
					case 3:
						//the corner is between the middles
						if (middles.includes(2) && middles.includes(4)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(1) && middles.includes(3)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;  
					case 4:
						//the corner is between the middles
						if (middles.includes(3) && middles.includes(4)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(1) && middles.includes(2)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;  
					
				}
				switch (triple) {
					case 'corner':
						return [[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,1,0,0]]; 
					case 'opp':
						return [[1,1,1,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]];
					case 'mixed':
						return [[1,1,0,1],[0,1,1,0],[0,1,1,1],[1,1,1,0]];
				}
			}    /*OFF?*/

	
			//3 corners + 1 middle
			else if (numCorners(square,0) === 3) {
				corners = whichCorners(square,0);
				middle = whichMiddles(square,0)[0];
				if (!corners.includes(1)) {
					if (middle === 3 || middle === 4) {
						option = 'between';
					}
					else option = 'outside';
				}
				else if (!corners.includes(2)) {
					if (middle === 2 || middle === 4) {
						option = 'between';
					}
					else option = 'outside';

				}
				else if (!corners.includes(3)) {
					if (middle === 1 || middle === 3) {
						option = 'between';
					}
					else option = 'outside';

				}
				else { //corners are 1,2,3; not 4
					if (middle === 1 || middle === 2) {
						option = 'between';
					}
					else option = 'outside';
				}

				if (option === 'between') {
					return [[1,0,1,0],[1,0,0,1],[0,1,1,1],[0,1,1,1]];
				}
				else return [[0,0,1,0],[1,0,1,1],[0,0,0,1],[0,0,0,1]];
			}

			//3 middles + 1 corner
			else if (numMiddles(square,0) === 3) {
				corner = whichCorners(square,0)[0];
				middles = whichMiddles(square,0);
				if (!middles.includes(1)) {
					if (corner === 3 || corner === 4) {
						option = 'between';
					}
					else option = 'outside';
				}
				else if (!middles.includes(2)) {
					if (corner === 2 || corner === 4) {
						option = 'between';
					}
					else option = 'outside';

				}
				else if (!middles.includes(3)) {
					if (corner === 1 || corner === 3) {
						option = 'between';
					}
					else option = 'outside';

				}
				else { //middles are 1,2,3; not 4
					if (corner === 1 || corner === 2) {
						option = 'between';
					}
					else option = 'outside';
				}
				if (option === 'between') {
					return [[1,0,0,1],[0,1,0,1],[0,1,1,0],[0,0,0,0]];
				}
				else return [[0,1,0,1],[1,1,0,1],[0,0,1,0],[1,1,0,1]];
			}

			/* 2 corners + 2 middles */
			//2 opposite corners
			else if (square[0][0] == square[2][2]) {
				//2 opp middles
				if (square[1][0] == square[1][2]) {
					[[1,0,0,0],[0,0,0,0],[1,0,0,0],[1,0,0,0]];
				}
				middles = whichMiddles(square,0);
				//First and last corner are 1s
				if (square[0][0] === 1) {
					//middles surround one corner
					if (middles[1] - middles[0] === 1) {
						return [[1,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,0,0]];
					}
					//each middle is adj to one corner
					else {
						return [[1,1,1,0],[1,1,1,1],[0,1,1,0],[1,1,1,1]];
					}
				}
				else { //corners = [2,3]
					//middles surround one corner
					if (middles[1] - middles[0] === 2) {
						return [[1,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,0,0]];
					}
					//each middle is adj to one corner
					else {
						return [[1,1,1,0],[1,1,1,1],[0,1,1,0],[1,1,1,1]];
					}
				}

			}
			/* 2 adjacent corners */
			corners = whichCorners(square,0);
			middles = whichMiddles(square,0);

			//2 opposite middles
			if (square[1][0] == square[1][2]) {
				//top and bottom are 1s
				if (square[0][1] === 1) {
					//a middle is between the two corners
					if (corners[1] - corners[0] === 1) {
						return [[0,0,1,0],[0,0,0,1],[0,0,1,0],[1,0,0,1]];
					}
					else return [[1,1,0,0],[1,0,1,1],[1,0,0,0],[0,1,0,1]];
				}
				else { //left and right are 1s
					//a middle is between the two corners
					if (corners[1] - corners[0] === 2) {
						return [[0,0,1,0],[0,0,0,1],[0,0,1,0],[1,0,0,1]];
					}
					else return [[1,1,0,0],[1,0,1,1],[1,0,0,0],[0,1,0,1]];
				}
			}
			//2 adjacent middles
			else if (corners.includes(1) && corners.includes(2)) {
				option = middles.includes(1) ? 'between' : 'outside';
			}
			else if (corners.includes(1) && corners.includes(3)) {
				option = middles.includes(2) ? 'between' : 'outside';
			}
			else if (corners.includes(2) && corners.includes(4)) {
				option = middles.includes(3) ? 'between' : 'outside';
			}
			else {
				option = middles.includes(4) ? 'between' : 'outside';
			}

			if (option === 'between') {
				return [[0,0,0,0],[1,0,1,1],[1,1,1,0],[0,0,0,1]];
			}
			else return [[0,1,1,0],[0,0,1,0],[1,1,1,0],[0,0,0,0]];
			break;
		case 6: 
			//There's a 0 in the center (6 options)
			if (square[1][1] === 0) {
				//Both other 0s are on sides
				if (numMiddles(square,0) === 2) {
					//opposite each other
					if (square[1][0] === square[1][2]) {
						return [[1,1,1,1],[0,0,0,1],[1,0,1,0],[1,0,1,0]];
					}
					//adjacent sides
					else {
						return [[1,1,1,1],[0,1,1,1],[0,0,1,0],[0,1,0,1]];
					}
				}
				//Both other 0s are on corners
				else if (numCorners(square,0) === 2) {
					//opposite corners
					if (square[0][0] === square[2][2]) {
						return [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]];
					}
					//adjacent corners
					else { 
						return [[1,0,1,0],[0,1,0,1],[1,1,1,1],[1,0,1,0]];
					}
				}
				//1 on corner, 1 on side (two possibilities)
				else {
					middle = whichMiddles(square,0)[0];
					switch (whichCorners(square,0)[0]) {
						case 1: 
							if (middle === 1 || middle === 2) {
								option = 'adj';
							}
							else option = 'opp';
							break;
						case 2:
							if (middle === 1 || middle === 3) {
								option = 'adj';
							}
							else option = 'opp';
							break;
						case 3:
							if (middle === 2 || middle === 4) {
								option = 'adj';
							}
							else option = 'opp';
							break;
						case 4:
							if (middle === 3 || middle === 4) {
								option = 'adj';
							}
							else option = 'opp';
							break;
					}
					if (option === 'adj') {
						return [[1,0,0,1],[0,1,1,0],[1,0,1,1],[0,1,1,1]];
					}
					else return [[1,0,1,0],[1,0,1,1],[1,0,0,1],[1,1,0,0]];
				}
			}
			//All three 0s are corners
			else if (numCorners(square,0) === 3) {
				return [[1,1,0,0],[1,0,1,0],[1,0,1,0],[0,1,0,0]];
			}
			//All three 0s are sides
			else if (numMiddles(square,0) === 3) {
				return [[0,0,0,0],[1,1,0,0],[0,1,0,1],[1,1,0,1]];
			}
			//2 corners, 1 middle (4 options)
			else if (numCorners(square,0) === 2) {
				//2 opposite corners
				if (square[0][0] === square[2][2]) {
					return [[1,0,1,0],[0,0,0,0],[1,1,1,0],[0,1,0,1]];
				}
				middle = whichMiddles(square,0)[0];
				corners = whichCorners(square,0);
				switch (middle) {
					case 1:
						//the middle is between the corners
						if (corners.includes(1) && corners.includes(2)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(3) && corners.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 2:
						//the middle is between the corners
						if (corners.includes(1) && corners.includes(3)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(2) && corners.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 3:
						//the middle is between the corners
						if (corners.includes(2) && corners.includes(4)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(1) && corners.includes(3)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 4:
						//the middle is between the corners
						if (corners.includes(3) && corners.includes(4)) {
							triple = 'stripe';
						}
						//the middle is opposite both corners
						else if (corners.includes(1) && corners.includes(2)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					default:
						console.error("Something's wrong in map3to4");
						return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
				}
				switch (triple) {
					case 'stripe':
						return [[1,1,0,0],[1,1,1,0],[1,1,1,1],[0,0,0,0]];
					case 'opp':
						return [[1,1,1,1],[0,1,1,0],[1,1,1,1],[1,0,1,0]];
					case 'mixed':
						return [[0,1,1,1],[1,1,1,0],[0,1,1,0],[1,1,1,0]];
					default:
						console.error("Something's wrong in map3to4");
						return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
				}

			}
			//1 corner, 2 middles (4 options)
			//the middles are opposites
			else if (square[1][0] === square[1][2]) {
				return [[0,1,1,1],[0,0,0,1],[0,0,0,1],[0,0,1,0]];
			}
			else {
				middles = whichMiddles(square,0);
				corner = whichCorners(square,0)[0];
				switch (corner) {
					case 1:
						//the corner is between the middles
						if (middles.includes(1) && middles.includes(2)) {
							triple = 'corner';
						}
						//the middle is opposite both corners
						else if (middles.includes(3) && middles.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 2:
						//the corner is between the middles
						if (middles.includes(1) && middles.includes(3)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(2) && middles.includes(4)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 3:
						//the corner is between the middles
						if (middles.includes(2) && middles.includes(4)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(1) && middles.includes(3)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					case 4:
						//the corner is between the middles
						if (middles.includes(3) && middles.includes(4)) {
							triple = 'corner';
						}
						//the corner is opposite both middles
						else if (middles.includes(1) && middles.includes(2)) {
							triple = 'opp';
						}
						else triple = 'mixed';
						break;
					default:
						console.error("Something's wrong in map3to4");
						return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
				}
				switch (triple) {
					case 'corner':
						return [[0,0,0,1],[0,1,0,0],[0,1,0,0],[0,0,0,0]];
					case 'opp':
						return [[0,0,0,0],[0,1,0,1],[1,0,1,0],[0,0,0,1]];
					case 'mixed':
						return [[0,0,1,0],[1,1,0,1],[0,1,0,0],[0,0,1,0]];
					default:
						console.error("Something's wrong in map3to4");
						return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
				}
			}
			
		case 7: 
			//There's a 0 in the center
			if (square[1][1] === 0) {
				//There's a 1 in one corner
				if (numCorners(square,0) === 1) {
					return [[0,1,1,1],[0,0,1,0],[1,0,1,0],[1,1,1,1]];
				}
				else {//The second 1 is on a side
					return [[1,0,1,1],[0,0,0,1],[0,0,1,0],[0,0,0,1]];
				}
			}
			//Both 0s are on sides
			else if (numMiddles(square,0) === 2) {
				//opposite each other
				if (square[1][0] === square[1][2]) {
					return [[1,0,1,1],[1,1,1,1],[1,0,0,1],[0,0,1,1]];
				}
				//adjacent sides
				else {
					return [[0,0,1,1],[0,0,1,1],[0,1,0,0],[1,1,1,1]];
				}
			}
			//Both 0s are on corners
			else if (numCorners(square,0) === 2) {
				//opposite corners
				if (square[0][0] === square[2][2]) {
					return [[0,0,1,0],[1,0,1,0],[1,1,0,0],[0,0,1,1]];
				}
				//adjacent corners
				else { 
					return [[1,1,1,1],[0,0,1,0],[1,1,1,1],[0,0,0,0]];
				}
			}
			//0 on corner, 0 on side (two possibilities)
			else {
				middle = whichMiddles(square,0)[0];
				switch (whichCorners(square,0)[0]) {
					case 1: 
						if (middle === 1 || middle === 2) {
							option = 'adj';
						}
						else option = 'opp';
						break;
					case 2:
						if (middle === 1 || middle === 3) {
							option = 'adj';
						}
						else option = 'opp';
						break;
					case 3:
						if (middle === 2 || middle === 4) {
							option = 'adj';
						}
						else option = 'opp';
						break;
					case 4:
						if (middle === 3 || middle === 4) {
							option = 'adj';
						}
						else option = 'opp';
						break;
				}
				if (option === 'adj') {
					return [[1,0,0,1],[1,0,0,0],[1,0,1,1],[1,1,0,1]];
				}
				else return [[1,1,0,0],[0,1,0,0],[0,1,0,1],[0,0,1,1]];
			}

		case 8:
			//The zero is in the center
			if (square[1][1] === 0) {
				return [[0,1,0,0],[0,0,0,0],[0,0,0,0],[0,1,1,1]];
			}
			//The zero is in a corner
			else if (square[0][0] === 0 || square[0][2] === 0 ||
				square[2][0] === 0 || square[2][2] === 0) {
				return [[0,0,1,0],[1,1,1,0],[1,0,1,0],[0,0,1,1]];
			}
			else { //The zero is the middle of a side
				return [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,0,0]];
			}

		case 9:
			return [[1,0,1,0],[1,0,1,0],[1,1,1,0],[1,1,1,0]];

		default:
			console.error("Something went wrong in map3to4");
			return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	}

}

//Takes an array of matrices and returns a 2D square matrix of them stitched together
//Ex: [[[0,0],[1,1]], [[2,2],[3,3]], [[4,4],[5,5]], [[6,6],[7,7]]] => 
// [[0,0,2,2],[1,1,3,3],[4,4,6,6],[5,5,7,7]]
function matrixStitch(matrices) {
	if (matrices.length === 1) {
		return matrices[0];
	}

	let subgridsWide = Math.sqrt(matrices.length);
	let gridWidth = matrices[0].length;
	let stitched = [];		
	for (var sec = 0; sec < matrices.length; sec += subgridsWide) {
		for (var i = 0; i < gridWidth; i++) {
			let row = matrices[0 + sec][i].concat(matrices[1 + sec][i]);
			for (var j = 2; j < subgridsWide; j++) {
				row = row.concat(matrices[j + sec][i]);
			}
			stitched.push(row);
		}
	}
	return stitched;
}

//Takes a 2D matrix. Returns it reflected horizontally
function flip(square) {
	let flipped = square.map(row => {
		let rowVar = [...row];
		return rowVar.reverse();
	});
	return flipped;
}

//Rotates square 90˚ clockwise and returns
function rotate(square) {
	let width = square[0].length;
	let height = square.length; //Lets this work for rectangles too
	let rotated = [];
	for (var col = 0; col < width; col++) {
		let thisRow = [];
		for (var row = height - 1; row >= 0; row--) {
			thisRow.push(square[row][col]);
		}
		rotated.push(thisRow);
	}
	return rotated;
}

//Checks the four corners of a 3x3 square
//Returns how many of "toFind" are in the corners
function numCorners(square,toFind) {
	let found = 0;
	if (square[0][0] === toFind) {
		found++;
	}
	if (square[0][2] === toFind) {
		found++;
	}
	if (square[2][0] === toFind) {
		found++;
	}
	if (square[2][2] === toFind) {
		found++;
	}
	return found;
}

//Checks the middle of the four sides of a 3x3 array
//Returns how many 'toFind' are found
function numMiddles(square,toFind) {
	let found = 0;
	if (square[0][1] === toFind) {
		found++;
	}
	if (square[1][0] === toFind) {
		found++;
	}
	if (square[1][2] === toFind) {
		found++;
	}
	if (square[2][1] === toFind) {
		found++;
	}
	return found;
}

//Returns an array of which corners contain 'toFind'
//[0][0] = 1, [0][2] = 2, [2][0] = 3, [2][2] = 4
function whichCorners(square,toFind) {
	let found = [];
	if (square[0][0] === toFind) {
		found.push(1);
	}
	if (square[0][2] === toFind) {
		found.push(2);
	}
	if (square[2][0] === toFind) {
		found.push(3);
	}
	if (square[2][2] === toFind) {
		found.push(4);
	}
	return found;
}

//Returns an array of which middles contain 'toFind'
//[1,2,3,4] -> T,L,R,B
function whichMiddles(square,toFind) {
	let found = [];
	if (square[0][1] === toFind) {
		found.push(1);
	}
	if (square[1][0] === toFind) {
		found.push(2);
	}
	if (square[1][2] === toFind) {
		found.push(3);
	}
	if (square[2][1] === toFind) {
		found.push(4);
	}
	return found;
}

//Returns the sum of the values in an array of arrays (matrix)
function matrixSum(matrix) {
	return sum(...matrix.map(row => sum(...row))); 
}

//Sums all the elements in the array numbers
function sum(...numbers) {
  return numbers.reduce((n, total) => {
    return +n + total
  }, 0);
}