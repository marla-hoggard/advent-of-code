//Advent of Code - Day 20 - Puzzle 2
//Takes an array of particles. 
//Repeatedly moves one step then removes any collisions
//Returns length of remaining array
function leftAfterCollision(partArray) {
	var particles = partArray;	
	
	particles = removeCollision(particles);

	//move then remove. Log number of remaining particles
	for (var i = 0; i < 1000; i++) {
		particles = particles.map(part => particleMove(part));
		particles = removeCollision(particles);
		console.log(particles.length);
	}
	
	return particles.length;
}


//Takes in an array of particles
//Removes any particles with identical positions
//Returns updated array
function removeCollision(array) {
	var pArray = [...array];

	for (var i = 0; i < pArray.length; i++) {
		var remArray = pArray.slice(i+1); //elements after i
	 	//Removes elements that match i.position
	 	var filtered = remArray.filter(elem => {
	 		return !sameArray(elem.position,pArray[i].position)
	 	});
		//If any elements were removed, also remove i
	 	if (filtered.length < remArray.length) {
	 		pArray = pArray.slice(0,i).concat(filtered);
	 		//console.log(`Removed ${remArray.length - filtered.length + 1} elements.`);
	 		i--;
	 	}
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