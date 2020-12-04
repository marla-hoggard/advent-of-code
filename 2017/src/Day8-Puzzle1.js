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
