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
