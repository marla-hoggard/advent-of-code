//Takes an integer, returns distance to 1 when
//numbers are written in a counter-clockwise spiral
function spiralDist(n) {
	if (n < 1) {
		return "invalid input.";
	}
	if (n === 1) {
		return 0;
	}
	var ring = 2; //the first ring is just 1 (the center)
	var i = 3; //ring two has side-length 3
	
	//Figure out what ring n is in
	//The highest n in a given ring is i^2 where i = side-length of that ring
	while(n > i*i) {
		ring++;	
		i+=2; //side-length goes up by two as rings increase
	}
	
	var diff = (i*i) - n; //distance from i*i in the ring
	var size = i-1; //Each side has length i but that double-counts corners
	
	//ring-1 = distance outwards from center
	//size/2 = distance from corner to center of ring's side
	//diff % size = how far from the corner is n
	//Math.abs((size/2) - (diff % size))) = (full distance from corner to center) - (how far from corner is n)
	return ((ring-1) + Math.abs((size/2) - (diff % size)));
}
