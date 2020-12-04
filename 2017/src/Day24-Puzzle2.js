//Advent of Code - Day 24 - Part 2
//Takes in an array of strings "A/B" of bridge components
//Returns the strength of the longest bridge you could make 
//(if more than one, returns the strongest of the longest)
function strongestBridge2(input) {
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
	//give i an upper bound to protect against an infinite loop
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

	console.log(`Found ${bridges.length} possible bridges.`);

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

//array is an array of arrays, sub is a flat array. 
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
//i.e. array = [[0,12],[2,4],[3,2]]; includesValue(array,2) = [[2,4],[3,2]]
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