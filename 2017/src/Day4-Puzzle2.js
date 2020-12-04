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

//Takes a string of words separated by spaces
//Returns false if any word is identical to or an anagram of another in string
function checkAnagrams(string) {
	var words = string.split(" ");
	var n = words.length;
	//Sort each word alphabetically, then replace in words
	for (var a = 0; a < n; a++) {
		var word = words[a].split("");
		words[a] = word.sort().join("");
	}
	//Same as checkDup from Day 4 Part 1
	var checked = [];
	for (var i = 0; i < n; i++) {
		if (!checked.includes(words[i])) {
			checked.push(words[i]);
		}
		else return false;
	}
	return true;
}
