//Advent of Code - Day 12 - Puzzle 1
//Takes an array of connections in form "# <-> #,#,#"
//Returns the number of programs that are connected to 0
function talkZero (input) {
	//Set up obj with props of pipe#: [#,#,#] (array of pipe's connections)
	var obj = {};
	input.forEach(elem => {
		obj = addProp12(obj,elem);
	}); 

	//talks begins as 0 and its direct connects
	var talks = [0];
	talks.push(...obj["0"]);
	//add non-duplicate direct connects from talks
	//keep talks sorted ascending. break loop when last value adds nothing
	for (var t = 0; t < talks.length; t++) {
		var connects = obj[talks[t]]; 
		var added = false;
		connects.forEach(elem => {
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