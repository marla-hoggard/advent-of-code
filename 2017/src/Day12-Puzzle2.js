//Advent of Code - Day 12 - Puzzle 2
//Returns number of distinct communicating groups in input
function talkGroups(input) {
	var groups = 0;
	var obj = {};
	var props = [];
	for (var i = 0, n = input.length; i < n; i++) {
		obj = addProp12(obj,input[i]); //addProp12 is defined in Day12-Puzzle1.js
		props.push(i);
	}
	console.log(props);
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
	var talks = [...obj[num]];
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