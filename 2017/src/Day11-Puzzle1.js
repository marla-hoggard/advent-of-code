//Advent of Code - Day 11 - Puzzle 1
//Given a string of comma-separated directions
//Find shortest distance to end
//Grid is hexagonal (n,ne,se,s,sw,nw)
function hexPath(dir) {
	var directions = dir.split(",");

	//Each variable refers to the number of steps taken in that direction
	var n = directions.filter(a => a == 'n').length;
	var ne = directions.filter(a => a == 'ne').length;
	var se = directions.filter(a => a == 'se').length;
	var s = directions.filter(a => a == 's').length;
	var sw = directions.filter(a => a == 'sw').length;
	var nw = directions.filter(a => a == 'nw').length;
	
	var ns, nesw, nwse;
	//Eliminate directions that cancel each other out
	if (n >= s) {
		n = n - s;
		s = 0;
		ns = 'n';
	}
	else {
		s = s - n;
		n = 0;
		ns = 's';
	}

	if (ne >= sw) {
		ne = ne - sw;
		sw = 0;
		nesw = 'ne';
	}
	else {
		sw = sw - ne;
		ne = 0;
		nesw = 'sw';
	}

	if (nw >= se) {
		nw = nw - se;
		se = 0;
		nwse = 'nw';
	}
	else {
		se = se - nw;
		nw = 0;
		nwse = 'se';
	}

	//Eight possibilities for the three remaining directions
	var switches = [ns,nesw,nwse];
	switches = switches.join(",");
	switch(switches) {
		case 'n,ne,nw':
			return n + Math.max(ne,nw);
		case 'n,ne,se':
			return ne + Math.max(n,se);
		case 'n,sw,nw':
			return nw + Math.max(n,sw);
		case 's,ne,se':
			return se + Math.max(s,ne);
		case 's,sw,nw':
			return sw + Math.max(s,nw);
		case 's,sw,se':
			return s + Math.max(sw,se);
		case 'n,ne,nw':
			return n + Math.max(ne,nw);
		case 'n,sw,se':
			return Math.max(n,sw,se) - Math.min(n,sw,se);
		case 's,ne,nw':
			return Math.max(s,ne,nw) - Math.min(s,ne,nw);
		default:
			return 'error';
	}

}