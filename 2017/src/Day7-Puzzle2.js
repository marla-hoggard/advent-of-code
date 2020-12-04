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

//Object constructor for towers
function Tower(name, weight, carrying) {
	this.name = name;
	this.weight = +weight.match(/\d+/)[0];
	this.carrying = carrying;
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
