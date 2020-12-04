//Advent of Code - Day 1 - Puzzle 1
//n is a number or a string of digits
//Returns sum of digits who are followed by a matching digit, circular
function captcha(n) {
	var array = ("" + n).split("");
	var sum = 0;
	for (var i = 0, n = array.length; i < n-1; i++) {
		if (array[i] === array[i+1]) {
			sum += +array[i];
		}
	}
	if (array[array.length-1] === array[0]) {
		sum += +array[0];
	}
	return sum;
}

//Advent of Code - Day 1 - Puzzle 2
//n is a number or a string of digits
//Returns sum of digits who match digit halfway round circular string
function captcha_round(n) {
	var array = ("" + n).split("");
	var sum = 0;
	var len = array.length;
	for (var i = 0; i < len/2; i++) {
		if (array[i] === array[i + (len/2)]) {
			sum += +array[i];
		}
	}
	
	return sum*2;
}

//Advent of Code - Day 2 - Puzzle 1
//Takes an array of arrays
//For each array, calculate the difference between min and max
//Return the sum of those differences
function checksum(matrix) {
	var array = [];
	var sum = 0;
	for (var i = 0, n = matrix.length; i < n; i++) {
		array = matrix[i];
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

//Advent of Code - Day 2 - Puzzle 2
//Takes an array of arrays
//For each array, find the pair where one is a multiple of the other
//Return the sum of a/b where a & b are the pair, a > b
function checksumDiv(matrix) {
	var array = [];
	var sum = 0;
	for (var i = 0, n = matrix.length; i < n; i++) {
		array = matrix[i];
		var len = array.length;
		array.sort(function(a,b) {return a-b;});
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

//Advent of Code - Day 3 - Puzzle 1
//Takes an integer, returns distance to 1 when
//numbers are written in a counter-clockwise spiral
function spiralDist(n) {
	if (n < 1) {
		return "invalid input.";
	}
	if (n === 1) {
		return 0;
	}
	var ring = 2;
	var i = 3;
	
	//Figure out what ring n is in
	while(n > i*i) {
		ring++;	
		i+=2;
	}
	
	var diff = (i*i) - n; //distance from i*i in the ring
	var size = i-1;
	return ((ring-1) + Math.abs((size/2) - (diff % size)));
}

//Advent of Code - Day 3 - Puzzle 2
//Returns the nth number in the spiral
//as described in the puzzle
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
	var size = i-1;
	var diff1 = 8*(ring-2);
	var side = 4 - Math.floor(((i*i) - n ) / size);
	
	if (n == i*i) { //Fourth corner
		//console.log(`${n} is the fourth corner.`);
		//console.log(`Checking ${n-1}, ${(i-2)*(i-2)}, ${(i-2)*(i-2)+1}`);
		return (spiralSum(n-1) 
							+ spiralSum((i-2)*(i-2)) 
							+ spiralSum((i-2)*(i-2)+1));
	}
	if (n == (i*i) - size) { //Third corner
		//console.log(`${n} is the third corner.`);
		//console.log(`Checking ${n-1}, ${n-diff1-6}`);
		return spiralSum(n-1) + spiralSum(n-diff1-6);
	}
	if (n == (i*i) - (size*2)) { //Second corner
		//console.log(`${n} is the second corner.`);
		//console.log(`Checking ${n-1}, ${n-diff1-4}`);
		return spiralSum(n-1) + spiralSum(n-diff1-4);
	}
	if (n == (i*i) - (size*3)) { // First corner
		//console.log(`${n} is the first corner.`);
		//console.log(`Checking ${n-1}, ${n-(diff1+2)}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-(diff1+2)));
	}
		
	//Other special cases
	if (n == ((i-2)*(i-2) + 1)) { //First elem in ring
		//console.log(`${n} is the first elem in ring.`);
		//console.log(`Checking ${n-1}, ${n-diff1}`);
			return spiralSum(n-1) + spiralSum(n-diff1);
	}
	if (n == ((i-2)*(i-2) + 2)) { //Second elem in ring
		//console.log(`${n} is the second elem in ring.`);
		//console.log(`Checking ${n-1}, ${n-diff1}, ${n-(diff1+1)}`);
			return spiralSum(n-1) + spiralSum(n-2)
				+ spiralSum(n-(diff1)) 
				+ spiralSum(n-(diff1+1));
	}
	if (n == ((i*i) - (size*3) - 1)) { //1st corner -1
		//console.log(`${n} is the first corner less one.`);
		//console.log(`Checking ${n-1}, ${n-(diff1+2)}, ${n-(diff1+1)}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-(diff1+2)) 
							+ spiralSum(n-(diff1+1)));
	}
	
		if (n == ((i*i) - (size*3) + 1)) { //1st corner +1
		//console.log(`${n} is the first corner plus one.`);
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+2)}, ${n-(diff1+3)}`);
		return (spiralSum(n-1) + spiralSum(n-2) 
							+ spiralSum(n-(diff1+2)) 
							+ spiralSum(n-(diff1+3)));
	}
	
	if (n == ((i*i) - (size*2) - 1)) { //2nd corner -1
		//console.log(`${n} is the second corner less one.`);	
		//console.log(`Checking ${n-1}, ${n-diff1-3}, ${n-diff1-4}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-diff1-3) 
							+ spiralSum(n-diff1-4));
	}
	
	if (n == ((i*i) - (size*2) + 1)) { //2nd corner +1
		//console.log(`${n} is the first corner plus one.`);
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+4)}, ${n-(diff1+5)}`);
		return (spiralSum(n-1) + spiralSum(n-2) 
							+ spiralSum(n-(diff1+4)) 
							+ spiralSum(n-(diff1+5)));
	}
	
	if (n == ((i*i) - size - 1)) { //3rd corner -1
		//console.log(`${n} is the third corner less one.`);		
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+5)}, ${n-(diff1+6)}`);
		return (spiralSum(n-1) 
							+ spiralSum(n-diff1-5) 
							+ spiralSum(n-diff1-6));
	}
	
	if (n == ((i*i) - size + 1)) { //3rd corner +1
		//console.log(`${n} is the first corner plus one.`);
		//console.log(`Checking ${n-1}, ${n-2}, ${n-(diff1+6)}, ${n-(diff1+7)}`);
		return (spiralSum(n-1) + spiralSum(n-2) 
							+ spiralSum(n-(diff1+6)) 
							+ spiralSum(n-(diff1+7)));
	}
	
	//Rest of the elements
	if (side == 1) {
		//console.log(`${n} is on side 1.`);
		//console.log(`Checking ${n-1}, ${n-diff1}, ${n-(diff1+1)}, ${n-(diff1+2)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1)
						+ spiralSum(n-(diff1+1)) + spiralSum(n-(diff1+2)));
	}
	if (side == 2) {
		//console.log(`${n} is on side 2.`);
		//console.log(`Checking ${n-1}, ${n-diff1-2}, ${n-(diff1+3)}, ${n-(diff1+4)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1-2)
						+ spiralSum(n-diff1-3) + spiralSum(n-diff1-4));
	}
	if (side == 3) {
		//console.log(`${n} is on side 3.`);
		//console.log(`Checking ${n-1}, ${n-diff1-4}, ${n-(diff1+5)}, ${n-(diff1+6)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1-4)
						+ spiralSum(n-diff1-5) + spiralSum(n-diff1-6));
	}
	else { //side 4
		//console.log(`${n} is on side 4.`);	
		//console.log(`Checking ${n-1}, ${n-diff1-6}, ${n-(diff1+7)}, ${n-(diff1+8)}`);
		return (spiralSum(n-1) + spiralSum(n-diff1-6)
						+ spiralSum(n-diff1-7) + spiralSum(n-diff1-8));
	}	
	
}

//Advent of Code - Day 3 - Puzzle 2
//Returns the first value of spiralSum larger than n
function spiralRun(n) {
	var i = 1;
	while (spiralSum(i) <= n) {
		i++;
	}
	console.log(i);
	return spiralSum(i);
}

//Advent of Code - Day 4 - Puzzle 1
//Takes an array of strings, each representing a pw input
//Returns number of pw strings with no duplicate words
function checkPW(input) {
	var valid = 0;
	for (var i = 0, n = input.length; i < n; i++) {
		if (checkDup(input[i])) {
			valid++;
		}
	}
	return valid;
}

//Advent of Code - Day 4 - Puzzle 1
//Takes string of words separated by spaces
//Returns true if no duplicate words in sentence
function checkDup(string) {
	var words = string.split(" ");
	var checked = [];
	for (var i = 0, n = words.length; i < n; i++) {
		if (!checked.includes(words[i])) {
			checked.push(words[i]);
		}
		else return false;
	}
	return true;
}

//Advent of Code - Day 4 - Puzzle 2
//Takes an array of strings, each representing a pw input
//Returns number of pw strings that don't contain duplicates 
//or pairs of words that anagram to each other
function checkPWana(input) {
	var valid = 0;
	for (var i = 0, n = input.length; i < n; i++) {
		if (checkAnagrams(input[i])) {
			valid++;
		}
	}
	return valid;
}

//Advent of Code - Day 4 - Puzzle 2
//Takes a string of words separated by spaces
//Returns false if any word is identical or anagram of another
function checkAnagrams(string) {
	var words = string.split(" ");
	var n = words.length;
	//Sort each word alphabetically, then replace in words
	for (var a = 0; a < n; a++) {
		var word = words[a].split("");
		words[a] = word.sort().join("");
	}
	var checked = [];
	for (var i = 0; i < n; i++) {
		if (!checked.includes(words[i])) {
			checked.push(words[i]);
		}
		else return false;
	}
	return true;
}

//Advent of Code - Day 5 - Puzzle 1
//Takes array of instructions
//Returns number of steps to get out of maze
function escapeMaze(instr) {
	var i = 0;
	var n = instr.length;
	var steps = 0;
	while (i < n) {
		instr[i]++;
		i += instr[i] - 1;
		steps++;
	}
	return steps;
}

//Advent of Code - Day 5 - Puzzle 2
//Takes array of instructions
//Returns number of steps to get out of maze
function escapeMaze2(instr) {
	var i = 0;
	var n = instr.length;
	var steps = 0;
	while (i < n) {
		if (instr[i] >= 3) {
			instr[i]--;
			i += instr[i] + 1;
			steps++;
		}
		else {
			instr[i]++;
			i += instr[i] - 1;
			steps++;
		}
	}
	return steps;
}

//Advent of Code - Day 6 - Puzzle 1
//Takes string of numbers separated by whitespace
//Runs redistribution pattern
//Returns number of iterations before finding a repeat
function redistribute(input) {
	//Make thisRound an array of integers
	var thisRound = input.split(/\s/);
	var banks = thisRound.length;
	for (var i = 0; i < banks; i++) {
		thisRound[i] *=1;
	}
	var rounds = [];
	var thisRoundString = thisRound.join(" ");
	var times = 0;
	do {
		rounds.push(thisRoundString);
		var maxFacts = arrayMax(thisRound);
		var amountDist, amountLeft;
		//At least one is distributed everywhere else
		if (maxFacts[0] >= (banks-1)) {
			amountDist = Math.floor(maxFacts[0] / (banks-1));
			amountLeft = maxFacts[0] - (amountDist * (banks-1));
			for (var r = 0; r < banks; r++) {
				if (r == maxFacts[1]) {
					thisRound[r] = amountLeft;
				}
				else {
					thisRound[r] += amountDist;
				}
			}
		}
		//Less to distribute than banks
		else {
			amountDist = maxFacts[0];
			var index = maxFacts[1];
			thisRound[index] = 0;
			index++;
			for (index; amountDist > 0; amountDist--) {
				if (index == banks) { //Wrap around
					index = 0;
				}
				thisRound[index]++;
				index++;
			}
		}
		thisRoundString = thisRound.join(" ");
		times++;
	}
	while (!rounds.includes(thisRoundString));
	return times;
}

//Takes an array of nummbers (or number strings)
//returns [max, index]
//Where max = max value, index = first index of max
function arrayMax(array) {
	var max = +array[0];
	var index = 0;
	for (var i = 0, n = array.length; i < n; i++) {
		if (+array[i] > max) {
			max = +array[i];
			index = i;
		}
	}
	return [max, index];
 }

//Advent of Code - Day 6 - Puzzle 2
//Takes string of numbers separated by whitespace
//Runs redistribution pattern
//Returns number of iterations before finding a repeat
function redistributeDiff(input) {
	//Make thisRound an array of integers
	var thisRound = input.split(/\s/);
	var banks = thisRound.length;
	for (var i = 0; i < banks; i++) {
		thisRound[i] *=1;
	}
	var rounds = [];
	var thisRoundString = thisRound.join(" ");
	var times = 0;
	do {
		rounds.push(thisRoundString);
		var maxFacts = arrayMax(thisRound);
		var amountDist, amountLeft;
		//At least one is distributed everywhere else
		if (maxFacts[0] >= (banks-1)) {
			amountDist = Math.floor(maxFacts[0] / (banks-1));
			amountLeft = maxFacts[0] - (amountDist * (banks-1));
			for (var r = 0; r < banks; r++) {
				if (r == maxFacts[1]) {
					thisRound[r] = amountLeft;
				}
				else {
					thisRound[r] += amountDist;
				}
			}
		}
		//Less to distribute than banks
		else {
			amountDist = maxFacts[0];
			var index = maxFacts[1];
			thisRound[index] = 0;
			index++;
			for (index; amountDist > 0; amountDist--) {
				if (index == banks) { //Wrap around
					index = 0;
				}
				thisRound[index]++;
				index++;
			}
		}
		thisRoundString = thisRound.join(" ");
		times++;
	}
	while (!rounds.includes(thisRoundString));
	return (times - rounds.indexOf(thisRoundString));
}

//Advent of Code - Day 7 - Puzzle 1
//Takes the puzzle input as an array of tower strings, i.e. "emlzcpy (106) -> pwmoihf, sdwnkb"
//Returns the name of the bottom tower
function bottomTower(towers) {

	//Create an array of the towers that carry something
	var carriers = towers.filter(elem =>  elem.includes('->'));
	
	//trim whitespace from each tower
	carriers = carriers.map(elem => elem.trim());
	
	//Create an array carrierObjs that contains each carrier as an object with prop name, weight and carrying
	var carrierObjs = carriers.map(carrier => {
		var carrierArray = carrier.split(" "); //split this carrier by whitespace
		var carrying = (carrierArray.slice(3)).join("").split(","); //an array of what it's carrying
		return new Tower(carrierArray[0], carrierArray[1],carrying);		
	});

	//console.log(carrierObjs);
	
	//Make carried an array of the towers that are carried 
	var carried = [];
	carrierObjs.forEach(carrier => {
		carrier.carrying.forEach(tow => {
			if (!carried.includes(tow)) {
				carried.push(tow);
			}
		});
	});

	
	//Find the tower that no one is carrying
	for (var c = 0; c < carrierObjs.length; c++) {
		if (!carried.includes(carrierObjs[c].name)) {
			return carrierObjs[c].name;
		}
	}
	return null;
}

//Object constructor for towers
function Tower(name, weight, carrying) {
	this.name = name;
	this.weight = +weight.match(/\d+/)[0];
	this.carrying = carrying;
}

//Advent of Code - Day 7 - Puzzle 2
//Takes an array, with inputs of each tower as a string
//Returns the weight the one wrong tower should be
function weightProblem(towers) {

	//Create an array towerObjArray that contains each tower as an object 
	var towerObjArray = toTowerArray(towers);
	
	//An array of just the towers that are carrying something
	var carrierObjArray = towerObjArray.filter(tower => tower.carrying);
	
	//Will contain the possible unbalanced towers
	//The towers holding the unbalanced towers will get flagged here too
	var badWeights = [];
	
	carrierObjArray.forEach(carrier => {
		//The total weights of each tower its carrying (including what they're carrying)
		var carryWeights = carrier.carrying.map(elem => {
			return calcWeight(towerObjArray,elem);
		});

		var wrongArray = [];
		if (!allSame(carryWeights)) {
			//wrong + right are weights, wrongIndex is index of carryWeights to wrong tower's name
			var wrong, wrongIndex, right;
			if (carryWeights[0] != carryWeights[1]) {
				if (carryWeights[0] == carryWeights[2]) {
					wrongIndex = 1;
					wrong = carryWeights[1];
					right = carryWeights[0];
				}
				else {
					wrongIndex = 0;
					wrong = carryWeights[0];
					right = carryWeights[1];
				}
			}
			else {
				for (var w = 2; w < carryWeights.length; w++) {
					if (carryWeights[w] != carryWeights[0]) {
						wrongIndex = w;
						wrong = carryWeights[w];						
						right = carryWeights[0];
						break;
					}
				}
			}
			var badTower = {
				tower: getTower(towerObjArray,carrier.carrying[wrongIndex]),
				weightDiff: right - wrong,
			};
			
			badWeights.push(badTower);
		}
	});

	console.log(badWeights);

	//Filter the list of possibilities to the one that is the source of imbalance
	//It must be the one in which everything it's carrying are equal
	//The other towers are carrying that one (which would be another possible search method)
	var badTower = badWeights.filter(obj => {
		var weights = obj.tower.carrying.map(carried => calcWeight(towerObjArray,carried));
		console.log(obj.tower.name,weights,allSame(weights));
		if (allSame(weights)) {
			return obj;
		}

	});
	if (badTower.length === 1) {
		badTower = badTower[0];
		console.log(badTower.tower.name,badTower.tower.weight,badTower.weightDiff);
		return badTower.tower.weight + badTower.weightDiff;	
	}
	else return "something went wrong";
}

//Returns true if all values in array are equal, false otherwise
function allSame(array) {
	var test = array[0];
	for (var i = 1, n = array.length; i < n; i++) {
		if (array[i] !== test) {	
			return false;
		}
	}
	return true;
}

//Returns the tower object from an array of tower objects (towerArray) whose name property is name
function getTower(towerArray, name) {
	var result = towerArray.filter(tower => tower.name === name);
	if (result.length > 0) {
			return result[0];
	}
	else return null;
}

//Returns the weight of the tower object in towerArray with name name
function getWeight(towerArray, name) {
	var result = getTower(towerArray,name);
	if (result !== null) {
		return result.weight;
	}
	else return 0;
}

//Calculates the weight of a tower with name name
//If a tower is carrying anything, add what it's carrying to its weight
function calcWeight(towerArray,name) {
	var tower = getTower(towerArray,name);

	//If tower is on top, just return its weight
	if (tower.carrying == null) {
		return getWeight(towerArray,name);
	}
	//return tower's weight plus the weight of the towers its carrying
	else {
		var weight = getWeight(towerArray,name);
		tower.carrying.forEach(function(elem) {
			weight += calcWeight(towerArray,elem);
		});
	}
	return weight;
}

//Takes an array formatted like the problem
//Returns an array of tower objects
function toTowerArray(towers) {
	var towerObjArray = towers.map(elem => {
		var towerArray = elem.trim().split(" ");
		if (towerArray.length > 2) {
			var carrying = (towerArray.slice(3)).join("").split(",");	
			var towerObj = new Tower(towerArray[0], towerArray[1],carrying);
		}
		else {
			var towerObj = new Tower(towerArray[0], towerArray[1],"");
			delete towerObj.carrying;
		}
		return towerObj;
	});

	return towerObjArray;
}

//Advent of Code - Day 8 - Puzzle 1
//Takes in a sequence of directions as an array of strings
//Returns highest value after all steps completed
function register(input) {
	var obj = new Object();
	for (var i = 0, n = input.length; i < n; i++) {
		//dir[0] = prop to change
		//dir[1] = inc or dec
		//dir[2] = amount to change
		//dir[3] = if
		//dir[4] = prop to check
		//dir[5] = compare operator
		//dir[6] = amount to check dir[4] against
		var dir = input[i].split(" "); 
		var toChange = dir[0]; //the name of a register aka obj key
		var toCheck = dir[4]; //the name of a register aka obj key
		if (!obj.hasOwnProperty(toChange)) {
			obj[toChange] = 0; //registers start at 0
		}
		if (!obj.hasOwnProperty(toCheck)) {
			obj[toCheck] = 0; //registers start at 0
		}
		//Evaluates the if statement in the direction
		if (parseCompare(obj[toCheck],dir[5],+dir[6])) {
			//Increases register by specified amount
			if (dir[1] == 'inc') {
				obj[toChange] += +dir[2];
			}
			//Decreases register by specified amount
			else {
				obj[toChange] -= +dir[2];
			}
		}
		
	}
	let arr = Object.values(obj);
	return Math.max(...arr);
}

//Takes three strings, in form of dir[4][5][6]
//prop and amount are numbers as strings, compare is operator
//Returns true or false
function parseCompare(prop, compare, amount) {
	switch (compare) {
		case '>':
			return prop > amount;
		case '>=':
			return prop >= amount;
		case '<':
			return prop < amount;
		case '<=':
			return prop <= amount;
		case '!=':
			return prop != amount;
		case '==':
			return prop == amount;
		default:
			console.log("bad comparison");
			return false;
	}
}

//Advent of Code - Day 8 - Puzzle 2
//Takes in a sequence of directions as an array of strings
//Returns highest value at any iteration
function registerMaxAll(input) {
	var obj = new Object();
	var max = 0;
	for (var i = 0, n = input.length; i < n; i++) {
		//dir[0] = prop to change
		//dir[1] = inc or dec
		//dir[2] = amount to change
		//dir[3] = if
		//dir[4] = prop to check
		//dir[5] = compare operator
		//dir[6] = amount to check dir[4] against
		var dir = input[i].split(" "); 
		var toChange = dir[0]; //the name of a register aka obj key
		var toCheck = dir[4]; //the name of a register aka obj key
		if (!obj.hasOwnProperty(toChange)) {
			obj[toChange] = 0; //registers start at 0
		}
		if (!obj.hasOwnProperty(toCheck)) {
			obj[toCheck] = 0; //registers start at 0
		}
		//Evaluates the if statement in the direction
		if (parseCompare(obj[toCheck],dir[5],+dir[6])) {
			if (dir[1] == 'inc') {
				obj[toChange] += +dir[2];
			}
			else {
				obj[toChange] -= +dir[2];
			}
		}
		//Make an array of just the values
		//Check its max against the existing max
		let arr = Object.values(obj);
		if (Math.max(...arr) > max) {
			max = Math.max(...arr);
		}
	}
	return max;
}


//Advent of Code - Day 9 - Puzzle 1
//Takes a string of characters
//Return the score of {} groups, where a nested set gets the score of how deep it is nested
//Ignoring "garbage" <...> where ! is the escape char
function garbageScore(input) {
	//replace !! with 'esc' so !!> aren't removed
	var workString = input.replace(/!!/g,"esc");
	//remove any escaped > ('!>' to '!')
	workString = workString.replace(/!>/g,"!");
	//remove garbage
	workString = workString.replace(/<[^>]*>/g,"");
	//remove anything else beside {} 
	workString = workString.replace(/[^{}]*/g,"");
	console.log(workString);
	
	var score = 0;
	workString = workString.replace(/{}/g,"1");
	while (workString.includes('{')) {
		var array = workString.match(/{\d*}/g);
		workString = workString.replace(/{\d*}/g,"X"); //Placeholder
		
		for (var i = 0, n = array.length; i < n; i++) {
			var group = array[i];
			var replaced = replaceGroup(group);
			group = replaced[0];
			score += replaced[1]; //Accounts for 9s that went up to 10 in replaceGroup			
			workString = workString.replace(/X/,group);	//Reinsert group at first placeholder	
		}
	}
	return sumDigits(workString) + score;
	
}


//Replaces "{###}" with 1### where each # has been increased by one. Cannot include 9s (already dealt with in main func)
//Returns array [new string, how many 9s * 10]
//Ex: {256} -> [1367,0]. {392} -> [1403,10]
//Why? {} = 1, each num inside represented a nested {} so +1 for going another level down
function replaceGroup(string) {
	var num = string.match(/\d+/)[0];
	var nines = 0;
	var digitArray = num.split("");
	for (var i = 0, n = digitArray.length; i < n; i++) {
		if (digitArray[i] == "9") {
			digitArray[i] = 0;
			nines += 10;
		}
		else {
			digitArray[i] -= -1; //Affectively +1, avoiding accidental concat
		}
	}
	digitArray.unshift("1");
	return [digitArray.join(""),nines];
}

//Takes a string of digits, returns the sum of the digits
function sumDigits(string) {
	var sum = 0;
	for (var digit = 0; digit < string.length; digit++) {
		var add = string.charAt(digit) - 0;
		sum += add;
	}
	return sum;
}

//Advent of Code - Day 9 - Puzzle 2
//Takes a string of characters
//Returns number of chars in garbage
//Does not include framing <>, ! or escaped chars
function garbageSize(input) {
	//replace !! with 'esc' so !!> aren't removed
	var workString = input.replace(/!!/g,"");
	//remove any escaped > ('!>' to '!')
	workString = workString.replace(/!./g,"");
	//find garbage
	var garbage = workString.match(/<[^>]*>/g);
	var noFrame = garbage.map(function(elem) {
		return elem.substring(1,elem.length-1);
	});
	garbage = noFrame.join(""); //combine all garbage groups into one long string
	return garbage.length;
}

//Advent of Code - Day 10 - Puzzle 1
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

//Advent of Code - Day 10 - Puzzle 2
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


//Advent of Code - Day 11 - Puzzle 1
//Given a string of comma-separated directions
//Find shortest distance to end
//Grid is hexagonal (n,ne,se,s,sw,nw)
function hexPath(dir) {
	var directions = dir.split(",");
	var n = directions.filter(a => a == 'n').length;
	var ne = directions.filter(a => a == 'ne').length;
	var se = directions.filter(a => a == 'se').length;
	var s = directions.filter(a => a == 's').length;
	var sw = directions.filter(a => a == 'sw').length;
	var nw = directions.filter(a => a == 'nw').length;
	
	var ns, nesw, nwse;
	//Eliminate directions that cancel each other out
	if (n >= s) {
		n = n - s;
		s = 0;
		ns = 'n';
	}
	else {
		s = s - n;
		n = 0;
		ns = 's';
	}
	if (ne >= sw) {
		ne = ne - sw;
		sw = 0;
		nesw = 'ne';
	}
	else {
		sw = sw - ne;
		ne = 0;
		nesw = 'sw';
	}
	if (nw >= se) {
		nw = nw - se;
		se = 0;
		nwse = 'nw';
	}
	else {
		se = se - nw;
		nw = 0;
		nwse = 'se';
	}
	//Eight possibilities for the three remaining directions
	var switches = [ns,nesw,nwse];
	switches = switches.join(",");
	switch(switches) {
		case 'n,ne,nw':
			return n + Math.max(ne,nw);
		case 'n,ne,se':
			return ne + Math.max(n,se);
		case 'n,sw,nw':
				return nw + Math.max(n,sw);
		case 's,ne,se':
				return se + Math.max(s,ne);
		case 's,sw,nw':
				return sw + Math.max(s,nw);
		case 's,sw,se':
				return s + Math.max(sw,se);
		case 'n,ne,nw':
				return n + Math.max(ne,nw);
		case 'n,sw,se':
			return Math.max(n,sw,se) - Math.min(n,sw,se);
		case 's,ne,nw':
			return Math.max(s,ne,nw) - Math.min(s,ne,nw);
		default:
			return 'error';
	}

}

//Advent of Code - Day 11 - Puzzle 2
function hexPathMax(dir) {
	var directions = dir.split(",");
	var max = 0;
	for (var i = 1, n = directions.length; i <= n; i++) {
		var step = directions.slice(0,i).join(",");
		if (hexPath(step) > max) {
			max = hexPath(step);
		}
	}
	return max;
}

//Advent of Code - Day 12 - Puzzle 1
//Takes an array of connections in form "# <-> #,#,#"
//Returns the number of programs that are connected to 0
function talkZero (input) {
	var obj = new Object();
	for (var i = 0, n = input.length; i < n; i++) {
		obj = addProp12(obj,input[i]);
	}
	//talks begins as 0 and its direct connects
	var talks = [0];
	talks.push(...obj["0"]);
	//add non-duplicate direct connects from talks
	//keep talks sorted ascending. break loop when last value adds nothing
	for (var t = 0; t < talks.length; t++) {
		var connects = obj[talks[t]]; 
		var added = false;
		connects.forEach(function(elem) {
			if (!talks.includes(elem)) {
				talks.push(elem);
				added = true;
			}
		});
		if (added) { //sort and restart counter if elem added
			talks = talks.sort((a,b) => a - b);
			t = 0; //ok to set to 0 with t++ since talks[0] = 0
		}
	}
	
	return talks.length;
	
}

//Takes object and string in form "prop <-> #,#,#"
//Adds property 'prop' with value [#,#,#] to obj
function addProp12(obj,string) {
	var strArray = string.split(" <-> ");
	var prop = strArray[0];
	var values = strArray[1].split(",");
	values = values.map((elem => +elem));
	obj[prop] = values;
	return obj;
}

//Advent of Code - Day 12 - Puzzle 2
//Returns number of distinct communicating groups in input
function talkGroups(input) {
	var groups = 0;
	var obj = new Object();
	var props = [];
	for (var i = 0, n = input.length; i < n; i++) {
		obj = addProp12(obj,input[i]);
		props.push(i);
	}
	//Run talkNumGroup on first elem in props
	//Remove all elements in props[0]'s group; groups++
	//Keep running until no elements remain in prop
	while (props.length > 0) {
		var found =	talkNumGroup(obj,props[0]);
		//console.log(found);
		props = props.filter(elem => !(found).includes(elem));
		groups++;
	}
	return groups;
}

//Returns an array representing the group that num can talk to based on the prop layout of obj
function talkNumGroup(obj,num) {	
	//talks begins as num and its direct connects, sorted asc
	var talks = obj[num];
	if (!talks.includes(num)) {
		talks.push(num);
	}
	talks = talks.sort((a,b) => a - b);
	
	//add non-duplicate direct connects from talks
	//keep talks sorted ascending. break loop when last value adds nothing
	for (var t = 0; t < talks.length; t++) {
		var connects = obj[talks[t]]; 
		var added = false;
		connects.forEach(function(elem) {
			if (!talks.includes(elem)) {
				talks.push(elem);
				added = true;
			}
		});
		if (added) { //sort and restart counter if elem added
			talks = talks.sort((a,b) => a - b);
			t = -1; //because of t++ in loop
		}
	}
	return talks;
}

//Advent of Code - Day 13 - Puzzle 1
//retuns depth*range for each scanner that catches you
//Caught if depth is divisible by (range-1)*2
function scanCaught(input) {
	var array = [];
	for (var i = 0, n = input.length; i < n; i++) {
		array.push(input[i].split(": "));
	}
	var severity = 0;
	for (var j = 0, a = array.length; j < a; j++) {
		var depth = array[j][0];
		var range = array[j][1];
		if ((depth % ((range-1)*2)) == 0) {
			severity += depth * range;
		}

	}
	return severity;
}

//Advent of Code - Day 13 - Puzzle 2
//How long should you delay in order to get through the
//scanner without being caught?
function scanDelay(input) {
	var array = [];
	for (var i = 0, n = input.length; i < n; i++) {
		array.push(input[i].split(": "));
	}
	for (var delay = 1000000; delay <= 10000000; delay++) {
		var safe = true;
		for (var j = 0, a = array.length; j < a; j++) {
			var depth = array[j][0];
			var range = array[j][1];
			//console.log(`d: ${depth}, r: ${range}, time: ${depth - 0 + delay}, mod: ${(range-1)*2}`);
			if (((depth - 0 + delay) % ((range-1)*2)) == 0) {
				safe = false;
				break;
			}
		}
		if (safe) {
			return delay;
		}
	}
	return "impossible";
}


//Advent of Code - Day 13 - Puzzle 2?
//Returns true if you can make it through without being caugh
//Given scanners from input, and delay of delay
function scanSafe(input,delay) {
	var array = [];
	for (var i = 0, n = input.length; i < n; i++) {
		array.push(input[i].split(": "));
	}
	for (var j = 0, a = array.length; j < a; j++) {
		var depth = array[j][0];
		var range = array[j][1];
		if (((depth+delay) % ((range-1)*2)) == 0) {
			return false;
		}

	}
	return true;
}

//Advent of Code - Day 14 - Puzzle 1
//Convert input-0 ... input-127 via asciiHash(Day10)
//Convert each hex output binary (4-digits to 1 hex)
//Returns number of "1" in 128x128 grid
function defragment(input) {
	//hexGrid is 128 hexidecimal knot hashes
	var hexGrid = [];
	for (var i = 0; i < 128; i++) {
		var row = input + "-" + i;
		hexGrid.push(asciiHash(row));
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

//Answer is between 1061 and 1562

//Advent of Code - Day 14 - Puzzle 2
//Convert input-0 ... input-127 via asciiHash(Day10)
//Convert each hex output binary (4-digits to 1 hex)
//Returns the number of groups in the output grid
//A group is a contiguous mass of 1s, adj not diag
function defragmentGroups(input) {
	//hexGrid is 128 hexidecimal knot hashes
	var hexGrid = [];
	for (var x = 0; x < 128; x++) {
		var row = input + "-" + x;
		hexGrid.push(asciiHash(row));
		//console.log(`Created row ${x}`);
	}
	//Convert each hex to binary string (4-chars per letter)
	//Create a 128x128 2D array binaryGrid of 0s and 1s
	var binaryGrid = [];
	for (var i = 0; i < 128; i++) {
		var binary = "";
		for (var j = 0; j < 32; j++) {
			var hexChar = parseInt(hexGrid[i].charAt(j),16)
									.toString(2);
			binary += hexChar.padStart(4,"0");
		}	
		binaryGrid.push(binary.split(""));
	}
	
	return groupCount(binaryGrid,128,128);
	//console.log(binaryGrid);
	/*
	var groups = 0;
	for (var row = 0; row < 128; row++) {
		for (var col = 0; col < 128; col++) {
			if (binaryGrid[row][col] > 0) {
				if (binaryGrid[row][col] == 1) {
					//Check if cell to right is already in a counted group
					if (col != 127 && binaryGrid[row][col + 1] > 1) { 
						//change cell to adjacent group#
						binaryGrid[row][col] = binaryGrid[row][col + 1];
					}
					else { //Start a new group
						groups++;
						binaryGrid[row][col] = groups + 1;
					}
				}
				else if (col != 127 && binaryGrid[row][col + 1] > 1 && 
							binaryGrid[row][col] != binaryGrid[row][col + 1]) {
						groups--;
				}
				//Change adjacent 1s to group#
				if (col != 127 && binaryGrid[row][col + 1] == 1) {
					binaryGrid[row][col + 1] = binaryGrid[row][col];
				}
				if (row != 127 && binaryGrid[row + 1][col] == 1) {
					binaryGrid[row + 1][col] = binaryGrid[row][col];
				}
			}
			
		}
	}
	
	console.log(binaryGrid);
	return groups;
*/
	
}

//Takes a width x height grid of 1s and 0s
//Returns number of groups of 1s
function groupCount(binaryGrid,width,height) {
	/*binaryGrid = [
		[0,1,1,0,0,1,1,0],
		[1,0,1,1,0,1,0,0],
		[1,1,0,1,0,1,0,1],
		[0,1,0,1,1,1,0,1],
		[1,0,0,0,0,0,0,0],
		[0,1,0,0,0,1,1,1],
		[1,1,0,1,1,0,0,1],
		[1,0,1,0,1,0,1,1]];*/
	
	var groups = 0;
	for (var row = 0; row < height; row++) {
		for (var col = 0; col < width; col++) {
			if (binaryGrid[row][col] > 0) {
				if (binaryGrid[row][col] == 1) {
					//Check if cell to right is already in a counted group
					if (col != width - 1 && binaryGrid[row][col + 1] > 1) { 
						//change cell to adjacent group#
						binaryGrid[row][col] = binaryGrid[row][col + 1];
					}
					else { //Start a new group
						groups++;
						binaryGrid[row][col] = groups + 1;
					}
				}
				//Check if you're in the middle of a duplicate group
				else if (col != 127 && binaryGrid[row][col + 1] > 1 && 
							binaryGrid[row][col] != binaryGrid[row][col + 1]) {
					console.log(`duplicate at [${row}][${col}]`);
					binaryGrid[row][col] = binaryGrid[row][col + 1];
					groups--;
				}
				//Change adjacent 1s to group#
				if (col != width - 1 && binaryGrid[row][col + 1] == 1) {
					binaryGrid[row][col + 1] = binaryGrid[row][col];
				}
				if (row != width - 1 && binaryGrid[row + 1][col] == 1) {
					binaryGrid[row + 1][col] = binaryGrid[row][col];
				}
			}
			
		}
	}
	
	console.log(binaryGrid);
	return groups;
}

//^^^^^^^FINISH DAY 14!!^^^^^^^^^^^^

//Advent of Code - Day 15 - Puzzle 1
//Takes genA and genB start values
//Runs generator pattern 1,000,000 times (more breaks page)
//Returns [#matches, last a, last b]
function generatorMatches(genA,genB) {
	const multA = 16807;
	const multB = 48271;
	const divisor = 2147483647;
	
	var a = (genA * multA) % divisor;
	var b = (genB * multB) % divisor;
	
	var matches = 0;

	for (var i = 0; i < 1000000; i++) {
		if (a.toString(2).padStart(16,"0").substr(-16) == b.toString(2).padStart(16,"0").substr(-16)) {
			matches++;
		}
		a = (a * multA) % divisor;
		b = (b * multB) % divisor;
	}
	return [matches,a,b];
}

//Runs generator 40 times to reach 40 million
function repeatGen(genA,genB) {
	var matches = 0;
	for (var i = 0; i < 40; i++) {
		var result = generatorMatches(genA,genB);
		matches += result[0];
		genA = result[1];
		genB = result[2];
	}
	return matches;
}

//Advent of Code - Day 15 - Puzzle 2
//Takes genA and genB start values
//Keeps running gen pattern til a div 4 and b div 8
//Returns [#matches, last a, last b]
function generatorMatches2(genA,genB) {
	const multA = 16807;
	const multB = 48271;
	const divisor = 2147483647;
	
	var a = genA;
	var b = genB;
	
	var matches = 0;

	for (var i = 0; i < 500000; i++) {
		a = (a * multA) % divisor;
		while (a % 4 !== 0) {
			a = (a * multA) % divisor;
		}
		b = (b * multB) % divisor;
		while (b % 8 !== 0) {
			b = (b * multB) % divisor;
		}
		if (a.toString(2).padStart(16,"0").substr(-16) == b.toString(2).padStart(16,"0").substr(-16)) {
			matches++;
		}
		
	}
	return [matches,a,b];
}

//Runs generator 10 times to reach 5 million
function repeatGen2(genA,genB) {
	var matches = 0;
	for (var i = 0; i < 10; i++) {
		var result = generatorMatches2(genA,genB);
		matches += result[0];
		genA = result[1];
		genB = result[2];
	}
	return matches;
}

//Advent of Code - Day 16 - Puzzle 1
//Executes "dance moves" from input on 'abcdefghijklmnop'
//Returns string after final modification
function danceMoves(input) {
	var array = 'abcdefghijklmnop'.split("");
	var moves = input.split(",");
	for (var i = 0, m = moves.length; i < m; i++) {
		//Shift # values from end to front
		if (moves[i].charAt(0) == 's') {
			var toShift = moves[i].substr(1);
			array = array.slice(0 - toShift)
				.concat(array.slice(0,0 - toShift));
			//console.log(array);
		}
		//Swap values at locations #/#
		else if (moves[i].charAt(0) == 'x') {
			var first = moves[i].substr(1).split("/")[0];
			var second = moves[i].substr(1).split("/")[1];
			var temp = array[first];
			array[first] = array[second];
			array[second] = temp;
			//console.log(array);
		}
		//Swap values x/y
		else { //'p'
			var first = array.indexOf(moves[i].substr(1).split("/")[0]);
			var second = array.indexOf(moves[i].substr(1).split("/")[1]);
			var temp = array[first];
			array[first] = array[second];
			array[second] = temp;
			//console.log(array);
		}
	}
	return array.join("");
}

//Advent of Code - Day 16 - Puzzle 2
//Executes "dance moves" from input on string
//Returns modified after final modification
function danceMoves2(input,string) {
	var array = string.split("");
	var moves = input.split(",");
	for (var i = 0, m = moves.length; i < m; i++) {
		//Shift # values from end to front
		if (moves[i].charAt(0) == 's') {
			var toShift = moves[i].substr(1);
			array = array.slice(0 - toShift)
				.concat(array.slice(0,0 - toShift));
			//console.log(array);
		}
		//Swap values at locations #/#
		else if (moves[i].charAt(0) == 'x') {
			var first = moves[i].substr(1).split("/")[0];
			var second = moves[i].substr(1).split("/")[1];
			var temp = array[first];
			array[first] = array[second];
			array[second] = temp;
			//console.log(array);
		}
		//Swap values x/y
		else { //'p'
			var first = array.indexOf(moves[i].substr(1).split("/")[0]);
			var second = array.indexOf(moves[i].substr(1).split("/")[1]);
			var temp = array[first];
			array[first] = array[second];
			array[second] = temp;
			//console.log(array);
		}
	}
	return array.join("");
}

//Used to find that the input cycles at 48
function findDanceCycle(input) {
	var string = 'abcdefghijklmnop';
	var array = [];
	//console.log(string);
	for (var i = 0; i < 16; i++) {
		string = danceMoves2(input,string);
		/*if (!array.includes(string)) {	
			array.push(string);
		}
		else {
			return [string,array.indexOf(string),i];
		}*/
					
	}
	return string;
}

//Advent of Code - Day 17 - Puzzle 1
//Starts at [0]. Moves 'steps' steps then adds 1
//Repeats num times. Returns value directly after num
function spinlock(steps,num) {
	var array = [0];
	var pos = 0;
	for (var i = 1; i <= num; i++) {
		pos += steps % i; //Move steps, circular
		pos = pos % i; //Make sure pos is within array
		array = array.slice(0,pos + 1) //insert i at [pos + 1]
			.concat(i,array.slice(pos + 1));
		pos++; //Move pos to the position of the inserted value
		//console.log(array);
	}
	//console.log(array.slice(0,10));
	var zeroIndex = array.indexOf(num);
	return array[zeroIndex + 1];
}

//Advent of Code - Day 17 - Puzzle 2
//Returns last number <= num inserted in position 1
//Starts at [0]. Moves 'steps' steps then adds 1
//Repeats num times. Returns the last value to be added next to 0 (spinLock array[1])
function posZero(steps,num) {
	var pos = 0;
	var lastZero = 0;
	for (var i = 1; i <= num; i++) {
		pos += steps % i; //Move steps, circular
		pos = pos % i; //Make sure pos is within array
		if (pos === 0) {
			lastZero = i;
			console.log(`lastZero is ${i}`);
		}
		pos++; //Move pos to the position of the inserted value
		//console.log(array);
	}
	//console.log(array.slice(0,10));
	return lastZero;
}

//Advent of Code - Day 18 - Puzzle 1
//Takes a comma-separated string of commands
//Returns the first "recover" value that is successfully executed
function duet(input) {
	var dir = input.split(",");
	var sound;
	var obj = new Object();
	for (var i = 0, n = dir.length; i < n; i++) {
		var step = dir[i].split(" ");
		var x = step[1]; 
		var y;
			if (isNaN(step[2])) {
				y = obj[step[2]];
			}
			else {
				y = +step[2];
			}
		switch (step[0]) {
			case 'snd':
				sound = obj[x];
				console.log(`sound = ${sound}`);
				break;
			case 'set':
				obj[x] = y;
				console.log(`${x} = ${y}`);
				break;
			case 'add':
				console.log(`${obj[x]} += ${y}`);
				obj[x] = +obj[x] + +y;
				break;
			case 'mul':
				console.log(`${obj[x]} *= ${y}`);
				obj[x] *= y;
				break;
			case 'mod':
				console.log(`${x} = ${obj[x]} % ${y}`);
				obj[x] = obj[x] % y;
				break;
			case 'rcv': 
				if (obj[x] != 0) {
					console.log("Recovering.")
					return sound;
				}
				else {
					console.log("x = 0. Skip recover");
					break;
				}
			case 'jgz':
				if (obj[x] > 0) {
					i += y;
					console.log(`Jumping to ${i} (by ${y})`);
					i--; //Since i++ in loop
					break;
				}
				else {
					console.log("x <= 0. Skip jump");
					break;
				}
			default:
				console.log("invalid direction.");
				break;
		}
	}
	return "Final command executed.";
}

//Advent of Code - Day 18 - Puzzle 2
//Takes comma-separated string of commands
//Returns how many times program 1 executed the send function
function duet2(input) {
	var dir = input.split(",");
	var prog0 = {};
	var prog1 = {};
	prog0.p = 0;
	prog1.p = 1;
	var prog0send = [];
	var prog1send = [];
	var prog1sent = 0;
	for (var i = 0, j = 0, n = dir.length; i < n || j < n; i++, j++) {
		if (i < n) { //program 0 has not jumped off the end
			var step0 = dir[i].split(" "); //instructions
			var x0 = step0[1]; //argument to act on
			var y0; //amount for step, if it exists
				if (step0[2]) {
					if (isNaN(step0[2])) { //variable name, get its value
						y0 = prog0[step0[2]];
					}
					else {
						y0 = +step0[2]; //number
					}
				}	
		}
		if (j < n) { //program 1 has not jumped off the end
			var step1 = dir[j].split(" ");
			var x1 = step1[1]; 
			var y1;
				if (step1[2]) {
					if (isNaN(step1[2])) {
						y1 = prog1[step1[2]];
					}
					else {
						y1 = Number(step1[2]);
					}
				}
		}
		if (j < n) {
			//Program 1's step
			switch (step1[0]) {
				case 'snd':
					var sending1;
					if (isNaN(x1)) {
						sending1 = prog1[x1];
					}
					else {
						sending1 = x1;
					}
					prog1send.push(sending1);
					prog1sent++; //This is the value that will be returned
					console.log(`prog1 sends = ${sending1}`);
					break;
				case 'set':
					prog1[x1] = y1;
					console.log(`${x1} = ${y1}`);
					break;
				case 'add':
					console.log(`${prog1[x1]} += ${y1}`);
					prog1[x1] = Number(prog1[x1]) + Number(y1);
					break;
				case 'mul':
					console.log(`${prog1[x1]} *= ${y1}`);
					prog1[x1] *= Number(y1);
					break;
				case 'mod':
					console.log(`${x1} = ${prog1[x1]} % ${y1}`);
					prog1[x1] = prog1[x1] % y1;
					break;
				case 'rcv': 
					if (prog0send.length > 0) {
						console.log(`prog1 receives ${prog0send[0]}`)
						prog1[x1] = prog0send.shift();
						break;
					}
					//Both programs are waiting on receive - terminate
					else if (prog1send.length == 0 && (i >=n || step0[0] == 'rcv')) {
						console.log("Both programs stuck on receive. Terminating.");
						return prog1sent;
					}
					else {
						j--; //hold on this step until prog1send exists
						console.log(`Prog1 waiting on step ${j}`);
						break;
					}
				case 'jgz':
					var jumper1 = x1;
					if (isNaN(x1)) {
						jumper1 = prog1[x1];
					}
						if (jumper1 > 0) {
							j += y1;
							console.log(`Prog1 jumping to ${j} (by ${y1})`);
							j--; //Since i++ in loop
							break;
						}
						else {
							console.log(`${prog1[x1]} comes from ${[x1]}.`);
							console.log(`${prog1[x1]} <= 0. Skip jump`);
							console.log(prog1);
							break;
						}
				default:
					console.log("invalid direction.");
					break;
			}
		}
		if (i < n) {
			//Program 0's step
			switch (step0[0]) {
				case 'snd':
					var sending0 = x0;
					if (isNaN(x0)) {
						sending0 = prog0[x0];
					}
					prog0send.push(sending0);
					console.log(`prog0 sends = ${sending0}`);
					break;
				case 'set':
					prog0[x0] = y0;
					console.log(`${x0} = ${y0}`);
					break;
				case 'add':
					console.log(`${prog0[x0]} += ${y0}`);
					prog0[x0] = +prog0[x0] + +y0;
					break;
				case 'mul':
					console.log(`${prog0[x0]} *= ${y0}`);
					prog0[x0] *= y0;
					break;
				case 'mod':
					console.log(`${x0} = ${prog0[x0]} % ${y0}`);
					prog0[x0] = prog0[x0] % y0;
					break;
				case 'rcv': 
					if (prog1send.length > 0) {
						console.log(`prog0 receives ${prog1send[0]}`)
						prog0[x0] = prog1send.shift();
						break;
					}
					//Both programs are waiting on receive - terminate
					else if (prog0send.length == 0 && (j >= n || step1[0] == 'rcv')) {
						console.log("Both programs stuck on receive. Terminating.");
						return prog1sent;
					}
					else {
						i--; //hold on this step until prog1send exists
						console.log(`Prog0 waiting on step ${i}`);
						break;
					}
				case 'jgz':
					var jumper0 = x0;
					if (isNaN(x0)) {
						jumper0 = prog0[x0];
					}
					if (jumper0 > 0) {
						i += y0;
						console.log(`Jumping to ${i} (by ${y0})`);
						i--; //Since i++ in loop
						break;
					}
					else {
						console.log(`${prog0[x0]} <= 0. Skip jump`);
						break;
					}
				default:
					console.log("invalid direction.");
					break;
			}
		}
		
		
	}	
	console.log(prog0);
	console.log(prog1);
	console.log(prog0send);
	console.log(prog1send);	
	return prog1sent;
}

//Advent of Code - Day 19 - Puzzle 1 & 2
//Follows the path of the maze, returns a string representing the letters 
//it passes along the way, in order
//input a string representing the maze, with commas separating each line
function mazeWord(input) {
	var word = '';
	var maze = input.split(",");
	maze = maze.map((line => line.split("")))
	var y = 0;
	var x = maze[0].indexOf("|");
	console.log(`first spot: maze[${y}][${x}]`);
	var dir = 'down'; //can be up, down, left or right
	var steps = 0;

	while(true) {
		steps++;
		//move one space
		switch (dir) {
			case 'down':
				y++;
				break;
			case 'up':
				y--;
				break;
			case 'left':
				x--;
				break;
			case 'right':
				x++;
				break;
			default:
				console.log('invalid direction');
				return;
		}

		//Found the end!	
		if (maze[y][x] === ' ' || y == maze.length || x == maze[y].length) {
			console.log(steps);
			return word;
		}

		//Found a letter
		if (/[A-Za-z]/.test(maze[y][x])) {
			console.log(`found ${maze[y][x]}`);
			word += maze[y][x];
		}
		//At a corner
		else if (maze[y][x] == '+') {
			if (dir == 'down' || dir == 'up') {
				if (x > 0 && maze[y][x-1] !== ' ') {
					dir = 'left';
				}
				else if (x + 1 < maze[y].length && maze[y][x+1] !== ' ') {
					dir = 'right';
				}
				else {
					console.log('Messed up at a corner');
					return;
				}
			}
			else { //dir is left or right 
				if (y > 0 && maze[y-1][x] !== ' ') {
					dir = 'up';
				}
				else if (y + 1 < maze.length && maze[y+1][x] !== ' ') {
					dir = 'down';
				}
				else {
					console.log('Messed up at a corner');
					return;
				}
			}
		}
	}
	return "how did we get here?";
}

//Advent of Code - Day 20 - Puzzle 1
//Takes in semicolon-separated input string
//Returns whichever particle stays closest to 0 on avg
function particleSwarm(input) {
	//particles is an array of Particle objects from the input
	var particles = input.split(";");
	for (var x = 0, n = particles.length; x < n; x++) {
		particles[x] = new Particle(particles[x],x);
	}

	//Check closest after many iterations - if they are all the same, that's the answer
	var avgs1000 = particles.map(part => avgDistance(part,1000));
	var min1000 = avgs1000.indexOf(Math.min(...avgs1000));
	var avgs2000 = particles.map(part => avgDistance(part,2000));
	var min2000 = avgs2000.indexOf(Math.min(...avgs2000));
	var avgs5000 = particles.map(part => avgDistance(part,5000));
	var min5000 = avgs5000.indexOf(Math.min(...avgs5000));
	var avgs10000 = particles.map(part => avgDistance(part,10000));
	var min10000 = avgs10000.indexOf(Math.min(...avgs10000));
	console.log(min1000,min2000,min5000,min10000);
	return;
}

//Prototype to create Particle objects
//Can be made with (input line,index) for parsing from puzzle input
//Or can be made with dummy input, index, p, v, a
function Particle (input,index,p,v,a) {
	if (p === undefined) {
		//Array of each <...> section: pos, vel acc in order
		var triples = input.match(/<[\d,-]+>/g);
		triples = triples.map(function(elem) {
			var triple = elem.replace(/[<>]/g,"").split(",");
			return triple.map(item => Number(item));
		});

		this.position = triples[0];
		this.velocity = triples[1];
		this.acceleration = triples[2];
	}
	else {
		this.position = p;
		this.velocity = v;
		this.acceleration = a;
	}
	this.index = index;
	this.distance = Math.abs(this.position[0]) 
		+ Math.abs(this.position[1]) + Math.abs(this.position[2]);
}

//Takes comma-separated string of particle input, returns array of Particle objects
function particleArray(input) {
	var particles = input.split(";");
	for (var x = 0, n = particles.length; x < n; x++) {
		particles[x] = new Particle(particles[x],x);
	}
	return particles;
}

//Takes in a particle, returns that particle after one move
function particleMove(particle) {
	//Change velocity
	var vel = (particle.velocity).map(function(elem,index) {
		return elem + particle.acceleration[index];
	});
	//Change position
	var pos = (particle.position).map(function(elem,index) {
		return elem + particle.velocity[index];
	});
	return new Particle("",particle.index,pos,vel,particle.acceleration);
}

//Returns avg distance from 0 of part after m moves
function avgDistance(part,m) {
	var distances = [];
	distances.push(part.distance);
	for (var i = 0; i < m; i++) {
		part = particleMove(part);
		distances.push(part.distance);
	}
	//console.log(distances);
	return distances.reduce(((prev,cur) => prev + cur),0) / (m + 1);
}

//Advent of Code - Day 20 - Puzzle 2
//Takes an array of particles. 
//Repeatedly moves one step then removes any collisions
//Returns remaining array
function leftAfterCollision(partArray) {
	var particles = partArray;	
	
	removeCollision(particles);

	//move then remove. Log number of remaining particles
	for (var i = 0; i < 100; i++) {
		particles = particles.map(part => particleMove(part));
		removeCollision(particles);
		console.log(particles.length);
	}
	
	//console.log(particles.length);
	return particles;
}


//Takes in an array of particles
//Removes any particles with identical positions
//Returns updated array
function removeCollision(array) {
	var pArray = array;
	for (var i = 0; i < pArray.length; i++) {
		var matched = false;
		for (var j = i+1; j < pArray.length; j++) {
			if (pArray[i].distance == pArray[j].distance) {
				//console.log(`distances: ${pArray[i].index} and ${pArray[j].index} match`);
				//Remove pArray[j] if its position matches pArray[i]
				if (sameArray(pArray[i].position,pArray[j].position)) {
					//console.log(`positions: ${i} and ${j} match. Removing ${pArray[j].index}`);
					pArray.splice(j,1);
					j--;
					matched = true;
				}
			}
		}
		//Remove pArray[i] if it matched anything
		if (matched) {
			//console.log(`Removing ${i} (had index ${pArray[i].index})`);
			pArray.splice(i,1);
			i--;
		}

		// for (var i = 0; i < pArray.length; i++) {
		// 	var remArray = pArray.slice(i+1); //elements after i
		// 	//Removes elements that match i.position
		// 	var filtered = remArray
		// 		.filter(elem => !sameArray(elem.position,pArray[i].position));
		// 	//If any elements were removed, also remove i
		// 	if (filtered.length < remArray.length) {
		// 		pArray = pArray.slice(0,i).concat(filtered);
		// 		i--;
		// 	}
		// }

	}

	return pArray;
}

//Returns true if arr1 = arr2 aka all elements in order match
//Uses strict equality (1 != '1')
function sameArray(arr1,arr2) {
	if (arr1.length != arr2.length) {
		return false;
	}
	else {
		for (var i = 0, n = arr1.length; i < n; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
	}
	return true;
}

//Advent of Code - Day 21
//Returns the sum of the values after ${iterations} using ${rules}
//where . = 0, # = 1
function fractalArt(iterations) {
	var initial = [[0,1,0],[0,0,1],[1,1,1]];
	var length = 3;
	var fractal = initial;

	for (var i = 0; i < iterations; i++) {
		var nextFractal = [];
		length = fractal.length;

		//Split into 2x2 and run transformation
		if (length % 2 == 0) {
			for (var row = 0; row < fractal.length; row =+ 2) {
				for (var col = 0; col < fractal[row].length; col += 2) {
					var square = [[fractal[col][row],fractal[col][row+1]],[fractal[col+1][row],fractal[col+1][row+1]]];
					console.log(`square: ${square}`);
					var newSquare = [];
					if (matrixSum(square) == 0) {
						newSquare = [[0,0,0],[1,0,0][1,0,0]];
					}
					else if (matrixSum(square) == 1) {
						newSquare = [[1,1,1],[1,0,1][0,1,0]];
					}
					else if (matrixSum(square) == 2) {
						if (fractal[row][col] == fractal[row+1][col+1]) {
							newSquare = [[0,1,0],[0,0,1],[0,0,0]];
						}
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

					//console.log(`newSquare: ${newSquare[0]}; ${newSquare[1]}; ${newSquare[2]}`);

					//Create rows in nextFractal if necessary
					if (col == 0) {
						nextFractal[row] = [];
						nextFractal[row+1] = [];
						nextFractal[row+2] = [];
					}
					newSquare.forEach((line,index) => {
						line.forEach(cell => {
							nextFractal[row + index].push(cell);
						});
					});
					console.log(`row: ${row}, col: ${col}`);
					
				}
			}

		}
		//Split into 3x3 and run transformation
		else {
			nextFractal = [[1,1,1,1],[0,0,1,1],[1,0,1,1],[1,0,1,1]];

		}

		fractal = nextFractal;
	}

	//Return the sum of the fractal matrix
	console.log(fractal);
	return matrixSum(fractal);

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

//Advent of Code - Day 22 - Part 1
//Takes in virus map (input), as array of strings representing each row
//Returns number of nodes infected after # iterations
function virusCleaner(input,iterations) {
	//make map a 2D matrix of the input
	var map = [];
	input.forEach(row => {
		map.push(row.split(""));
	});
	//console.log(map);
	var [curX,curY,dir] = [Math.floor(map[0].length/2),Math.floor(map.length/2),'N'];
	//console.log(curX, curY, dir);
	var infected = 0;
	var cleaned = 0;
	for (var i = 0; i < iterations; i++) {
		//Swap type, increase counter, make turn
		if (map[curY][curX] === '.') {
			dir = turnLeft(dir);
			map[curY][curX] = '#';
			infected++;
		}
		else {
			dir = turnRight(dir);
			map[curY][curX] = '.';
			cleaned++;
		}
		//Make move
		switch(dir) {
			case 'N':
				curY--;
				break;
			case 'W':
				curX--;
				break;
			case 'S':
				curY++;
				break;
			case 'E':
				curX++;
				break;
			default:
				console.log('Bad direction');
				break;
		}

		if (!map[curY]) {
			console.log(`adding row ${curY} on iteration ${i}. CurX is ${curX}`);
			map[curY] = Array(map[0].length).fill('.');
		}
		if (!map[curY][curX]) {
			console.log(`adding map[${curY}][${curX}] on iteration ${i}`);
			map[curY][curX] = '.';
		}


	}
	//console.log(map);
	return infected;

}

//Advent of Code - Day 22 - Part 2
function virusCleaner2(input,iterations) {
	//make map a 2D matrix of the input
	var map = [];
	input.forEach(row => {
		map.push(row.split(""));
	});
	//console.log(map);
	var [curX,curY,dir] = [Math.floor(map[0].length/2),Math.floor(map.length/2),'N'];
	//console.log(curX, curY, dir);
	var infected = 0;
	for (var i = 0; i < iterations; i++) {
		//Swap type, increase counter, make turn
		if (map[curY][curX] === '.') {
			dir = turnLeft(dir);
			map[curY][curX] = 'W';
		}
		else if (map[curY][curX] === 'W') {
			map[curY][curX] = '#';
			infected++;
		}
		else if (map[curY][curX] === 'F') {
			dir = reverseDirection(dir);
			map[curY][curX] = '.';
		}
		else { //Infected
			dir = turnRight(dir);
			map[curY][curX] = 'F';
		}
		//Make move
		switch(dir) {
			case 'N':
				curY--;
				break;
			case 'W':
				curX--;
				break;
			case 'S':
				curY++;
				break;
			case 'E':
				curX++;
				break;
			default:
				console.log('Bad direction');
				break;
		}

		//If move out of row bounds, add a new row of all '.'
		if (!map[curY]) {
			//console.log(`adding row ${curY} on iteration ${i}. CurX is ${curX}`);
			map[curY] = Array(map[0].length).fill('.');
		}
		//If row exists but col is out of bounds, add cell with value '.'
		if (!map[curY][curX]) {
			//console.log(`adding map[${curY}][${curX}] on iteration ${i}`);
			map[curY][curX] = '.';
		}

	}
	return infected;
}

//Takes dir 'N', 'E', 'S', 'W', turns 90˚ ccw, returns new direction
function turnLeft(dir) {
	switch(dir) {
		case 'N':
			return 'W';
		case 'W':
			return 'S';
		case 'S':
			return 'E';
		case 'E':
			return 'N';
		default:
			return 'Bad input';
	}
}

//Takes dir 'N', 'E', 'S', 'W', turns 90˚ ccw, returns new direction
function turnRight(dir) {
	switch(dir) {
		case 'N':
			return 'E';
		case 'E':
			return 'S';
		case 'S':
			return 'W';
		case 'W':
			return 'N';
		default:
			return 'Bad input';
	}
}

//Takes dir 'N', 'E', 'S', 'W', turns 180˚, returns new direction
function reverseDirection(dir) {
	switch(dir) {
		case 'N':
			return 'S';
		case 'S':
			return 'N';
		case 'E':
			return 'W';
		case 'W':
			return 'E';
		default:
			return 'Bad input';
	}
}

//Advent of Code - Day 23 - Puzzle 1
//input is an array of direction strings
function coprocessor(input) {
	//Set all processors to 0
	var processors = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0};
	var timesMulCalled = 0;
	for (var i = 0; i < input.length; i++) {
		var instr = input[i].split(" ");
		var opValue = isNaN(instr[2]) ? processors[instr[2]] : Number(instr[2]);
		switch(instr[0]) {
			case 'set':
				processors[instr[1]] = opValue;
				break;
			case 'sub': 
				processors[instr[1]] -= opValue;
				break;
			case 'mul':
				timesMulCalled++;
				processors[instr[1]] *= opValue;
				break;
			case 'jnz':
				if (processors[instr[1]] != 0) {
					i += opValue;
					i--; //Account for i++
				}
				break;
			default:
				console.log('Bad instruction');
				break;
		}
	}
	return timesMulCalled;
}

//Advent of Code - Day 23 - Part 2
//In effect the question is from 107900 - 124900, by 17s, inclusive, how many numbers are not prime
function coprocessorsOptimized() {
	var processors = {a: 1, b: 107900, c: 124900, d: 2, e: 2, f: 1, g: 0, h: 0};
	let [a,b,c,d,e,f,g,h] = [1,107900,124900,2,2,1,0,0];
	while (b <= 124900) { 
		f = 1;
			for (d = 2; d < b && f != 0; d++) {
				if (b % d == 0) {
					for (e = 2; e < b && f != 0; e++) {
						if (d*e == b) {
							f = 0;
							console.log(`b = d*e: ${b} = ${d}*${e}`);
						}
					}
				}	
			}
			if (f == 0) {
				h++;
				console.log(`h: ${h}`);
			}	
		b += 17;
	}
	return h;
}

//Returns true if num is prime, else false
function isPrime(num) {
	if (num <= 1) {
		return false;
	}
	if (num === 2) {
		return true;
	}
	if (num % 2 === 0) {
		return false;
	}
	for (let fact = 3; fact < Math.sqrt(num); fact += 2) {
		if (num % fact === 0) {
			return false;
		}
	}
	return true;
}

//Advent of Code - Day 24 
//Takes in an array of strings "A/B" of bridge components
//Returns the strength of the strongest possible bridge when connecting like ends
function strongestBridge(input) {
	//convert input strings "a/b" to arrays [a,b]
	var components = input.map(comp => {
		var comps = comp.split("/");
		return [Number(comps[0]),Number(comps[1])];
	});

	//bridges should be [ [[0,a]], [[0,b]], [[0,c]]...]
	var bridges = [];
	var starters = includesValue(components,0);
	starters.forEach(comp => {
		if (comp[0] === 0) {
			bridges.push([comp]);
		}
		else {
			bridges.push([comp[1],comp[0]]);
		}
	});


	var i = 0;
	while (i < bridges.length && i < 1000000000) {
		//make remaining all components except what's in bridges[i]
		var remaining = components.filter((elem) => {
			var reverseElem = [elem[1],elem[0]];
			if (!hasArray(bridges[i],elem) && !hasArray(bridges[i],reverseElem)) {
				return elem;
			}
		});

		var end = bridges[i][bridges[i].length - 1];
		var nextComps = includesValue(remaining,end[1]);
		var orderedNextComps = nextComps.map(pair => {
			if (pair[0] === end[1]) {
				return pair;
			}
			else {
				return [pair[1],pair[0]];
			}
		});
		//console.log(orderedNextComps);

		//End of this option, move to next bridge
		if (orderedNextComps.length === 0) {
			//console.log(`i: ${i}. End of bridge: `);
			i++;
		}
		//Only one option. Add it, then loop restarts with this bridge choice
		else if (orderedNextComps.length === 1) {
			bridges[i].push(orderedNextComps[0]);
			//console.log(`i: ${i}. Found one to add: ${orderedNextComps}`);
		}
		//Many options, add them to the end, then i++
		else {
			//console.log(`i: ${i}. Found multiple options.`,orderedNextComps);

			var start = bridges[i];
			//console.log("start",start);
			//var possBridges = [];
			orderedNextComps.forEach(pair => {
				var newBridge = [...start];
				newBridge.push(pair); 
				bridges.push(newBridge)
			});

			//console.log("bridges: ",bridges);
			i++;
		}
	}

	/*
	bridges.forEach((bridge,index) => {
		console.log(`${index}: ${bridge}`);
	})
	*/

	//Set up for part 2 - remove length/bestBridge components and just return maxStrength for part 1
	var maxStrength = 0;
	var maxLength = 0;
	var bestBridge;
	bridges.forEach(bridge => {
		if (bridge.length >= maxLength && matrixSum(bridge) > maxStrength) {
			maxLength = bridge.length;
			maxStrength = matrixSum(bridge);
			bestBridge = bridge;
		}
	});
	console.log(bestBridge);
	return matrixSum(bestBridge);

}

//Returns true if sub, an array, is contained in array, an array of arrays
function hasArray(array,sub){
	for (var i = 0; i < array.length; i++) {
		if (array[i].length === sub.length) {
			if (array[i].every((elem,index) => elem === sub[index])) {
				return true;
			}
		}
	}
	return false;
}

//Array is array of arrays, sub is array. 
//Returns index of array that is sub, -1 if not found
function hasArrayIndex(array,sub) {
	if (!hasArray(array,sub)) {
		return -1;
	}
	for (var i = 0; i < array.length; i++) {
		if (array[i].length === sub.length) {
			if (array[i].every((elem,index) => elem === sub[index])) {
				return i;
			}
		}
	}
	return -1;
}

//array = array of arrays. Returns an array of subarrays which contain value
//i.e. array = [[0,12],[2,4],[3,2]]; includesValue(array,2) = [[2,4],[3.2]]
function includesValue(array,value) {
	return array.filter(elem => {
		if (elem.includes(value)) {
			return elem;
		}
	});
}

//Takes array [a,b]. Input should equal a or b. Returns the other value
function otherHalf(pair,input) {
	if (pair[0] === input) {
		return pair[1];
	}
	else if (pair[1] === input) {
		return pair[0];
	}
	else return -1;
}

//Advent of Code - Day 25 
//Runs the machine 'steps' times 
//Switch statement is constructed from puzzle input
//Returns "checksum" aka sum of values aka number of 1s in tape after final iteration
function turing(steps) {
	var state = 'A';
	var tape = Array(100).fill(0);
	var cursor = 200;
	for (var i = 0; i < steps; i++) {
		switch(state) {
			case 'A':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor++;
					state = 'B';
				}
				else {
					tape[cursor] = 0;
					cursor--;
					state = 'C'
				}
				break;
			case 'B':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor--;
					state = 'A';
				}
				else {
					tape[cursor] = 1;
					cursor--;
					state = 'D'
				}
				break;
			case 'C':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor++;
					state = 'D';
				}
				else {
					tape[cursor] = 0;
					cursor++;
					state = 'C'
				}
				break;
			case 'D':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 0;
					cursor--;
					state = 'B';
				}
				else {
					tape[cursor] = 0;
					cursor++;
					state = 'E'
				}
				break;
			case 'E':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor++;
					state = 'C';
				}
				else {
					tape[cursor] = 1;
					cursor--;
					state = 'F'
				}
				break;
			case 'F':
				if (tape[cursor] == null || tape[cursor] === 0) {
					tape[cursor] = 1;
					cursor--;
					state = 'E';
				}
				else {
					tape[cursor] = 1;
					cursor++;
					state = 'A'
				}
				break;
			default:
				return "invalid state";
		}
	}
	console.log(tape);
	var checksum = 0;
	tape.forEach(value => checksum += value);
	return checksum;
}

























