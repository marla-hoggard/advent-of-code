//n is a number or a string of digits
//Returns sum of digits that are followed by a matching digit, circular
function captcha(n) {
	var array = ("" + n).split("");
	var sum = 0;
	//Iterate through digits, check if i'th digit matches the next
	for (var i = 0, n = array.length; i < n-1; i++) {
		if (array[i] === array[i+1]) {
			sum += +array[i];
		}
	}
	//Circular - check if last digit matches first
	if (array[array.length-1] === array[0]) {
		sum += +array[0];
	}
	return sum;
}
