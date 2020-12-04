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
