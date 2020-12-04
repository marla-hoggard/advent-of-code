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
