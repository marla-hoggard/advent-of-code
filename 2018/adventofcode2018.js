// Day 1 - Puzzle 1
// @input = array of strings of form "+19" or "-10"
// Returns total after adding or subtracting all entries
const sumFrequency = input => {
	let sum = 0;
	for (var i = 0; i < input.length; i++) {
		const num = Number(input[i].slice(1));
		if (input[i][0] === '-') {
			sum -= num;
		}
		else sum += num;
	}
	return sum;
}

// Day 1 - Puzzle 2
// @input = array of strings of form "+19" or "-10"
// Returns the value of the first repeated frequency(sum)
// The list may repeat if no duplicates are found the first time through
const repeatedFrequency = input => {
	let prev = [0];
	let cur = 0;
	let count = 0;
	while (true) {
		for (var i = 0; i < input.length; i++) {
			const num = Number(input[i].slice(1));
			if (input[i][0] === '-') {
				cur -= num;
			}
			else cur += num;
			if (prev.includes(cur)) {
				return cur;
			}
			else {
				prev.push(cur);
			}
		}
		count++;
		console.log(count);
	}
}

// Day 2 - Puzzle 1
// @input = array of strings
// Returns product of strings with at least one letter that appears exactly twice
// and strings with at least one letter that appears exactly three times
const repeats2times3 = input => {
	let two = 0;
	let three = 0;
	input.forEach(str => {
		if (hasRepeatedLetter(str, 2)) {
			two++;
		}
		if (hasRepeatedLetter(str, 3)) {
			three++;
		}
	})

	return two * three;
}

// Returns true if @string contains at least one letter that appears exactly @num times
const hasRepeatedLetter = (string, num) => {
	let remaining = string;
	while(remaining.length) {
		const last = remaining.length;
		remaining = remaining.replace(new RegExp(remaining[0], 'g'),'');
		const next = remaining.length;
		if (last - next === num) {
			return true;
		}
	}
	return false;
}

// Day 2 - Puzzle 2
// @input = array of strings
// Finds the two strings that are off by one, returns their common substring
const findSimilar = input => {
	for (var i = 0; i < input.length - 1; i++) {
		for (var j = i+1; j < input.length; j++) {
			if (offByOne(input[i], input[j])) {
				return allButDiff(input[i], input[j]);
			}
		}
	}
	return 'nope';
}

// Returns true if str1 and str2 are identical except for one character
const offByOne = (str1, str2) => {
	if (str1.length !== str2.length) {
		return false;
	}
	let diffs = 0;
	str1.split('').forEach((char1, i) => {
		if (char1 !== str2[i]) {
			diffs++;
		}
	});
	return diffs === 1;
}

// str1 and str2 must differ by one character
// Returns the rest of the string without that character
const allButDiff = (str1, str2) => {
	if (!offByOne(str1, str2)) {
		return '';
	}
	for (var i = 0; i < str1.length; i++) {
		if (str1[i] !== str2[i]) {
			return str1.slice(0,i) + str1.slice(i+1);
		}
	}
	return '';
}

// Day 3 - Puzzle 1
// @input = array of claims
// Returns number of claims that overlap with another
const overlap = input => {
	let grid = Array(1000).fill(null).map(val => Array(1000).fill(0));
	let count = 0;
	input.forEach(claim => {
		const pieces = claim.split(/[\s\:@,x]/);
		const startA = +pieces[3];
		const startB = +pieces[4];
		const lenA = +pieces[6];
		const lenB = +pieces[7];		
		for (var i = startA; i < startA + lenA; i++) {
			for (var j = startB; j < startB + lenB; j++) {
				if (grid[j][i] === 1) {
					count++;
				}
				grid[j][i]++;
			}
		}
	});
	return count;
}

// Day 3 - Puzzle 2
// Finds the id of the claim that doesn't overlap
const overlap2 = input => {
	let grid = Array(1000).fill(null).map(val => Array(1000).fill(0));
	input.forEach(claim => {
		const pieces = claim.split(/[\s\:@,x]/);
		const startA = +pieces[3];
		const startB = +pieces[4];
		const lenA = +pieces[6];
		const lenB = +pieces[7];	
		for (var i = startA; i < startA + lenA; i++) {
			for (var j = startB; j < startB + lenB; j++) {
				grid[j][i]++;
			}
		}
	});
	for (var c = 0; c < input.length; c++) {
		const pieces = input[c].split(/[\s\:@,x]/);
		const startA = +pieces[3];
		const startB = +pieces[4];
		const lenA = +pieces[6];
		const lenB = +pieces[7];
		let overlaps = false;	
		for (var i = startA; i < startA + lenA; i++) {
			for (var j = startB; j < startB + lenB; j++) {
				if (grid[j][i] > 1) {
					overlaps = true;
				}
			}
		}
		if (!overlaps) {
			return pieces[0];
		}
	}
	return 'nope';
}

// Day 4 - Puzzle 1
const worstGuard = input => {
	input.sort(sortGuardTimes);
	console.log(input);
	let guards = {};
	let currentGuard = '';
	for (var i = 0; i < input.length; i++) {
		const [match, year, month, day, hour, minute, str] = input[i].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
		if (str.startsWith('Guard')) {
			currentGuard = Number(str.split(' ')[1].slice(1));
		}
		else if (str.startsWith('falls')) {
			const awakeMinute = +input[i+1].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/)[5];
			if (!guards[currentGuard]) {
				guards[currentGuard] = Array(60).fill(0);
			}
			for (var s = +minute; s < +awakeMinute; s++) {
				guards[currentGuard][s]++;
			}
			i++;
		}
		else {
			console.log('I messed up');
		}
	}
	console.log(guards);
	let guardMinutes = { ids: [], minutes: [] }
	for (var g in guards) {
		const min = guards[g].reduce((prev, cur) => prev + cur);
		guardMinutes.ids.push(g);
		guardMinutes.minutes.push(min);
	}
	console.log(guardMinutes);
	const guard = guardMinutes.ids[guardMinutes.minutes.indexOf(Math.max(...guardMinutes.minutes))];
	const max = guards[guard].indexOf(Math.max(...guards[guard]));
	console.log(max, guard);
	return max * guard;
}

const sortGuardTimes = (str1, str2) => {
	const [match1, year1, month1, day1, hour1, minute1, string1] = str1.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
	const [match2, year2, month2, day2, hour2, minute2, string2] = str2.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
	if (+year1 < +year2) {
		return -1;
	}
	if (+year1 > +year2) {
		return 1;
	}
	if (+month1 < +month2) {
		return -1;
	}
	if (+month1 > +month2) {
		return 1;
	}
	if (+day1 < +day2) {
		return -1;
	}
	if (+day1 > +day2) {
		return 1;
	}if (+hour1 < +hour2) {
		return -1;
	}
	if (+hour1 > +hour2) {
		return 1;
	}if (+minute1 < +minute2) {
		return -1;
	}
	if (+minute1 > +minute2) {
		return 1;
	}
	return 0;
}

// Day 4 - Puzzle 2
const worstGuard2 = input => {
	input.sort(sortGuardTimes);
	let guards = {};
	let currentGuard = '';
	for (var i = 0; i < input.length; i++) {
		const [match, year, month, day, hour, minute, str] = input[i].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
		if (str.startsWith('Guard')) {
			currentGuard = Number(str.split(' ')[1].slice(1));
		}
		else if (str.startsWith('falls')) {
			const awakeMinute = +input[i+1].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/)[5];
			if (!guards[currentGuard]) {
				guards[currentGuard] = Array(60).fill(0);
			}
			for (var s = +minute; s < +awakeMinute; s++) {
				guards[currentGuard][s]++;
			}
			i++;
		}
		else {
			console.log('I messed up');
		}
	}
	console.log(guards);
	let guardMaxes = { ids: [], maxes: [] }
	for (var g in guards) {
		const max = Math.max(...guards[g]);
		guardMaxes.ids.push(g);
		guardMaxes.maxes.push(max);
	}
	console.log(guardMaxes);
	const guard = guardMaxes.ids[guardMaxes.maxes.indexOf(Math.max(...guardMaxes.maxes))];
	const max = guards[guard].indexOf(Math.max(...guards[guard]));
	console.log(max, guard);
	return max * guard;
}

// Day 5 - Puzzle 1
// @input = string
// Removes adjacent pairs of the form aA, Zz, etc.
// Returns length of remaining string after all pairs are removed
const removeOpp = input => {
	let i = 0;
	while (i < input.length - 1) {
		if (input[i].toUpperCase() === input[i+1].toUpperCase() && input[i] !== input[i+1]) {
			input = input.slice(0,i) + input.slice(i+2);
			if (i > 0) {
				i--;
			}
		}
		else {
			i++;
		}
	}
	return input.length;
}

// Day 5 - Puzzle 2
// Removes all instances of char, case insensitive, in @input and returns remaining string
const removeUnit = (input, char) => {
	return input.replace(new RegExp(char, 'gi'), '');
}

// Cycles through each letter of the alphabet, removing that letter from input
// Returns the length of the shortest value returned from removeOpp after one letter is removed
const worstLetter = input => {
	const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
	const lengths = letters.map(letter => removeOpp(removeUnit(input, letter)));
	return Math.min(...lengths);
}

// Day 6 - Puzzle 1
// @input 2D array of coordinate pairs: [[x1,y1], [x2,y2]...]
const largestFiniteArea = input => {
	const allX = input.map(pair => pair[0]);
	const allY = input.map(pair => pair[1]);
	const minX = Math.min(...allX);
	const maxX = Math.max(...allX);
	const minY = Math.min(...allY);
	const maxY = Math.max(...allY);
	
	const grid = Array(maxY - minY + 2).fill(null).map(row => Array(maxX - minX + 2).fill(null));
	for (let c = 0; c < grid[0].length; c++) {
		for (let r = 0; r < grid.length; r++) {
			const row = r + minY - 1;
			const col = c + minX - 1;
			grid[c][r] = closestSpot(row, col, input);
		}
	}
	const areas = Array(input.length).fill(0);
	grid.forEach(row => {
		row.forEach(elem => {
			areas[elem]++;
		});
	});
	grid.forEach(row => {
		areas[row[0]] = 0;
		areas[row[row.length - 1]] = 0;
	});
	grid[0].forEach(elem => {
		areas[elem] = 0;
	});
	grid[grid.length-1].forEach(elem => {
		areas[elem] = 0;
	});
	return Math.max(...areas);
}

const closestSpot = (row, col, allCoords) => {
	const dist = allCoords.map(coord => manhattanDistance(coord, [row, col]));
	const min = Math.min(...dist);
	if (dist.indexOf(min) !== dist.lastIndexOf(min)) {
		return 'X';
	}
	return dist.indexOf(min);
}

const sumDistances = (row, col, allCoords) => {
	let dist = 0;
	allCoords.forEach(coord => {
		dist += manhattanDistance(coord, [row, col]);
	});
	return dist;
}

// Day 6 - Puzzle 2
const centralRegion = input => {
	const allX = input.map(pair => pair[0]);
	const allY = input.map(pair => pair[1]);
	const minX = Math.min(...allX);
	const maxX = Math.max(...allX);
	const minY = Math.min(...allY);
	const maxY = Math.max(...allY);
	
	const grid = Array(maxY - minY + 2).fill(null).map(row => Array(maxX - minX + 2).fill(null));
	let region = 0;
	for (let c = 0; c < grid[0].length; c++) {
		for (let r = 0; r < grid.length; r++) {
			const row = r + minY - 1;
			const col = c + minX - 1;
			if (sumDistances(row, col, input) < 10000) {
				region++;
				grid[c][r] = 1;
			} else {
				grid[c][r] = 0;
			}
		}
	}
	console.log(region); // This is the answer
	return grid;
	
}

// Day 7 - Puzzle 1
const stepOrder = input => {
	let steps = {};
	let order = '';
	// Populates steps as { letter: { before: [stepNames], after: [stepNames] } }
	input.forEach(step => {
		const [ str, first, second ] = step.match(/Step (.) must be finished before step (.) can begin./);
		if (!steps.hasOwnProperty(first)) {
			steps[first] = { before: [], after: [] };
		}
		if (!steps.hasOwnProperty(second)) {
			steps[second] = { before: [], after: [] };
		}
		steps[first].before.push(second);
		steps[second].after.push(first);
	});

	let stepNames = Object.keys(steps).sort();
	let count = stepNames.length;

	/* Finds `next`: the first step (alphabetically) with an empty `after` array 
	*  Adds `next` to the end of `order` string
	*  Removes `next` from all `after` arrays (by iterating through `next.before`)
	*  Removes `next` from `steps` and `stepNames` 
	*/
	while (count > 0) {
		const next = stepNames.find(letter => steps[letter].after.length === 0);
		order += next;
		steps[next].before.forEach(nextStep => {
			steps[nextStep].after = removeVal(steps[nextStep].after, next);
		});
		delete steps[next];
		stepNames = removeVal(stepNames, next);
		count--;
	}
	return order;
}

// Day 7 - Puzzle 2
const stepTime = input => {
	let steps = {};

	// Populates steps as { letter: { before: [stepNames], after: [stepNames], timeLeft: seconds } }
	input.forEach(step => {
		const [ str, first, second ] = step.match(/Step (.) must be finished before step (.) can begin./);
		if (!steps.hasOwnProperty(first)) {
			steps[first] = { before: [], after: [], timeLeft: first.charCodeAt(0) - 4 };
		}
		if (!steps.hasOwnProperty(second)) {
			steps[second] = { before: [], after: [], timeLeft: second.charCodeAt(0) - 4 };
		}
		steps[first].before.push(second);
		steps[second].after.push(first);
	});

	let stepNames = Object.keys(steps).sort();
	let count = stepNames.length;

	// Initialize workers
	let seconds = 0;
	let workers = Array(5).fill(null).map(el => { return { name: 'fillMe', timeLeft: -1}; });
	const first = stepNames.filter(letter => steps[letter].after.length === 0);
	const starters = stepNames.filter(letter => steps[letter].after.length === 0);
	for (let i = 0; i < starters.length && i < 5; i++) {
		workers[i] = { name: starters[i], ...steps[starters[i]] }; 
	}

	
	while (count > 0) {
		// Move x seconds in time, where x is the minumum time left of the steps being worked on
		const timeJump = minTimeRemaining(workers);
		seconds += timeJump;
		workers = decWorkers(workers, timeJump);

		// justEnded = letters of step(s) that finished after x seconds
		const justEnded = justFinished(workers);
		if (justEnded.length) {
			// Remove done from all after arrays, then remove done from steps and increment count
			justEnded.forEach(done => {		
				steps[done].before.forEach(nextStep => {
					steps[nextStep].after = removeVal(steps[nextStep].after, done);
				});
				delete steps[done];
				stepNames = removeVal(stepNames, done);
				count--;
			});

			// Fill any open workers with any steps that are ready to start
			const readySteps = stepNames.filter(ready => steps[ready].after.length === 0 && !workers.find(w => w.name === ready));
			const available = openWorkers(workers);
			available.forEach(open => {
				const nextUp = readySteps.shift();
				workers[open] = nextUp ? { name: nextUp, ...steps[nextUp] } : { name: 'fillMe', timeLeft: -1 };
			});
		}
	}
	return seconds;
}

// Decrements all workers by amt seconds
const decWorkers = (workers, amt = 1) => {
	return workers.map(w => w.timeLeft > 0 ? { ...w, timeLeft: w.timeLeft - amt } : w );
}

// Returns an array of letters that finished in this second
const justFinished = workers => {
	return workers
		.filter(w => w.timeLeft === 0)
		.map(w => w.name);
}

// Returns an array of numbers representing worker indices that aren't currently working
const openWorkers = workers => {
	return workers
		.map((w,i) => {
			return {
				name: w.name,
				timeLeft: w.timeLeft,
				index: i,
			};
		}).filter(w => w.timeLeft <= 0)
		.map(w => w.index);
}

// Returns the lowest number of seconds left for all steps in workers
const minTimeRemaining = workers => {
	const positiveTimes = workers.map(w => w.timeLeft).filter(time => time > 0);
	return Math.min(...positiveTimes)
}

// Day 8 - Puzzle 1
const buildTree = input => {
	const data = input.split(' ').map(el => +el);
	const tree = new Tree();
	let d = 0;
	while (d < data.length) {
		const numChildren = data[d];
		const numMetadata = data[d+1];
		d += 2;
		tree.addChildNode(numChildren, numMetadata);
		while (tree.getCurrent() && tree.getCurrent().hasAllChildren() && d < data.length) {
			// Fill in metadata
			while (!tree.getCurrent().isComplete()) {
				tree.addMetadata(data[d]);
				d++;
			}
			// Navigate to next incomplete node
			while (tree.getCurrent() && tree.getCurrent().isComplete()) {
				tree.setCurrent(tree.getCurrent().getParent());
			}
		}
		
	}
	return tree.getTotalMetadata();
}

// Day 8 - Puzzle 2
const getTreeValue = input => {
	const data = input.split(' ').map(el => +el);
	const tree = new Tree();
	let d = 0;
	while (d < data.length) {
		const numChildren = data[d];
		const numMetadata = data[d+1];
		d += 2;
		tree.addChildNode(numChildren, numMetadata);
		while (tree.getCurrent() && tree.getCurrent().hasAllChildren() && d < data.length) {
			// Fill in metadata
			while (!tree.getCurrent().isComplete()) {
				tree.addMetadata(data[d]);
				d++;
			}
			// Navigate to next incomplete node
			while (tree.getCurrent() && tree.getCurrent().isComplete()) {
				tree.setCurrent(tree.getCurrent().getParent());
			}
		}
		
	}
	return tree.getValue();
}

// Day 9 - Puzzles 1 & 2
const marbleGame = (numPlayers, marbles) => {
	let circle = [0, 4, 2, 1, 3];
	let currentIndex = 1;
	let nextMarble = 5;
	let totalMarbles = 5;
	let scores = Array(numPlayers).fill(0);
	for (nextMarble; nextMarble <= marbles; nextMarble++) {
		if (nextMarble % 23 !== 0) {
			currentIndex += 2;
			if (currentIndex > totalMarbles) {
				currentIndex -= totalMarbles;
			} 
			circle.splice(currentIndex, 0, nextMarble);
			totalMarbles++;
		} else {
			const turn = nextMarble % numPlayers;
			scores[turn] += nextMarble;
			const alsoRemoveIndex = currentIndex - 7 >= 0 ? currentIndex - 7 : currentIndex - 7 + totalMarbles;
			scores[turn] += circle[alsoRemoveIndex];
			circle.splice(alsoRemoveIndex,1);
			currentIndex = alsoRemoveIndex;
			totalMarbles--;
		}
		if (nextMarble % 100000 === 0) {
			console.log(nextMarble);
		}
	}
	return Math.max(...scores);
}

// Reimplement with CircularLinkedList - SO MUCH FASTER!!
const marbleGame2 = (numPlayers, marbles) => {
	let circle = new CircularLinkedList();
	let scores = Array(numPlayers).fill(0);
	circle.add(0,2);
	for (let i = 1; i <= marbles; i++) {
		if (i % 23 !== 0) {
			circle.add(i,2);
		}
		else {
			const turn = i % numPlayers;
			const removed = circle.removeFromLoc(-7);
			scores[turn] += i;
			scores[turn] += removed;
		}
	}
	return Math.max(...scores);
}

// Day 10 - Puzzle 1 & 2

// Takes an array of position/velocity strings from the puzzle input
// Returns an array of points of the form [{..}, { xpos, ypos, xvel, yvel }, {..}]
const setupPoints = (input) => {
	let points = [];
	input.forEach(point => {
		const [ str, xpos, ypos, xvel, yvel ] = point.match(/position=<\s*(-?\d+),\s+(-?\d+)>\s+velocity=<\s*(-?\d+),\s+(-?\d+)>/);
		points.push({
			xpos: +xpos,
			ypos: +ypos,
			xvel: +xvel,
			yvel: +yvel,
		});
	});
	return points;
}

// Takes an array of points, increments one velocity step and returns the points array 
const incrementPoints = points => {
	const minx = Math.min(...points.map(pt => pt.xpos));
	const maxx = Math.max(...points.map(pt => pt.xpos));
	const miny = Math.min(...points.map(pt => pt.ypos));
	const maxy = Math.max(...points.map(pt => pt.ypos));

	const width = maxx - minx + 1;
	const height = maxy - miny + 1;

	// This is how we find a small enough grid that the page won't crash
	if (width * height < 10000) {
		console.log('hooray!!!!', width*height);
	}
	return points.map(({xpos, ypos, xvel, yvel}) => {
		return {
			xpos: xpos + xvel,
			ypos: ypos + yvel,
			xvel,
			yvel,
		};
	});
}

// Takes an array of points and a 2D array of 0s and 1s where 1s are the points 
const mapPointsToGrid = points => {
	const minx = Math.min(...points.map(pt => pt.xpos));
	const maxx = Math.max(...points.map(pt => pt.xpos));
	const miny = Math.min(...points.map(pt => pt.ypos));
	const maxy = Math.max(...points.map(pt => pt.ypos));

	const width = maxx - minx + 1;
	const height = maxy - miny + 1;

	let grid = Array(height).fill(null).map(el => Array(width).fill(0));
	points.forEach(({ xpos, ypos }) => {
		grid[ypos - miny][xpos - minx] = 1;
	});

	return grid;
}

const visualizeGrid = grid => {
	let HTML = "";
	grid.forEach(row => {
		let rowHTML = '<div class="row">';
			row.forEach(elem => {
				const color = elem ? '#000000' : '#FFFFFF';
				rowHTML += `<div class="box" style="background-color: ${color};"></div>`;
			});
		rowHTML += '</div>';
		HTML += rowHTML;
	})
	return HTML;
}


// Day 11 - Puzzle 1
const maxFuelSection = serial => {
	let grid = Array(300).fill(null).map(el => Array(300).fill(null));
	grid = grid.map((row, i) => {
		return row.map((col, index) => {
			return [index + 1, i + 1];
		});
	});

	grid = grid.map(row => {
		return row.map(coords => {
			return findPowerLevel(coords[0], coords[1], serial);
		});
	});
	let maxFuel = sum3x3(grid, 1, 1);
	let maxTopLeft = [1,1];
	for (let x = 1; x <= 298; x++) {
		for (let y = 1; y <= 298; y++) {
			const sumRegion = sum3x3(grid, x, y);
			if (sumRegion > maxFuel) {
				maxFuel = sumRegion;
				maxTopLeft = [x, y];
			}
		}
	}
	console.log(maxFuel);
	return maxTopLeft;
}

const findPowerLevel = (x, y, serial) => {
	const rackID = x + 10;
	let power = rackID * y;
	power += serial;
	power *= rackID;
	power = +power.toString().slice(-3,-2);
	power -= 5;
	return power;
}

// Returns the sum of a 3x3 square with top left corner x,y in grid
// Note: x,y based on Puzzle 11 specs -> 1-indexed, x goes across
const sum3x3 = (grid, x, y) => {
	return grid[y-1][x-1] + grid[y][x-1] + grid[y+1][x-1] +
		grid[y-1][x] + grid[y][x] + grid[y+1][x] +
		grid[y-1][x+1] + grid[y][x+1] + grid[y+1][x+1];
}

// Day 11 - Puzzle 2
const maxFuelSection2 = serial => {
	let grid = Array(300).fill(null).map(el => Array(300).fill(null));
	grid = grid.map((row, i) => {
		return row.map((col, index) => {
			return [index + 1, i + 1];
		});
	});

	grid = grid.map(row => {
		return row.map(coords => {
			return findPowerLevel(coords[0], coords[1], serial);
		});
	});
	let maxFuel = sumSection(grid, 1, 1, 1);
	let maxTopLeft = [1,1,1];
	for (let x = 1; x <= 300; x++) {
		for (let y = 1; y <= 300; y++) {
			for (let size = 1; size <= 301 - y && size <= 301 - x; size++) {
				const sumRegion = sumSection(grid, x, y, size);
				if (sumRegion > maxFuel) {
					maxFuel = sumRegion;
					maxTopLeft = [x, y, size];
				}
			}
		}
	}
	console.log(maxFuel);
	return maxTopLeft;
}

const sumSection = (grid, x, y, size) => {
	let sum = 0;
	for (var i = y-1; i < size + y - 1; i++) {
		for (var j = x-1; j < size + x - 1; j++) {
			sum += grid[i][j];
		}
	}
	return sum;
}

// Day 12 - Puzzle 1
const flowerPots = (pots, rules, generations) => {
	let ruleMap = {};
	rules.forEach(rule => {
		const map = rule.split(' => ');
		ruleMap[map[0]] = map[1];
	});
	for (let g = 1; g <= generations; g++) {
		pots = '....' + pots + '....';
		let nextGen = '';
		for (let i = 0; i < pots.length - 4; i++) {
			const rule = pots.slice(i, i+5);
			nextGen += ruleMap[rule];
		}
		pots = nextGen;
		if (g % 1000 === 0) {
			console.log(g);
		}
	}
	let flowers = 0;
	pots.split('').forEach((pot, index) => {
		if (pot === '#') {
			flowers += index - (2*generations);
		}
	});
	return flowers;
}

// Day 12 - Puzzle 2
const flowerPots2 = (pots, rules, generations) => {
	let ruleMap = {};
	rules.forEach(rule => {
		const map = rule.split(' => ');
		ruleMap[map[0]] = map[1];
	});
	// We hit a cycle here or well before
	for (let g = 1; g <= 5000; g++) {
		if (g % 100000 === 0) {
			console.log(g);
		}
		const first = pots.indexOf('#');
		const last = pots.lastIndexOf('#');
		pots = '...' + pots.slice(first, last + 1) + '...';
		let nextGen = '';
		for (let i = 0; i < pots.length - 4; i++) {
			const rule = pots.slice(i, i+5);
			nextGen += ruleMap[rule];
		}
		pots = nextGen;
	}
	const first = pots.indexOf('#');
	const last = pots.lastIndexOf('#');
	pots = pots.slice(first, last + 1);
	let flowers = 0;
	pots.split('').forEach((pot, index) => {
		if (pot === '#') {
			// This came from analyzing the pattern of first # within the cycle
			flowers += index + generations - 95;
		}
	});
	return flowers;
}

// Day 13 - Puzzle 1
// Returns the location "x,y" of the first collsion between carts on the given input track
const firstCollision = input => {
	const tracks = input.split(/\n/).map(line => line.replace(/\s/g, 0));
	let carts = initializeCarts(tracks);
	let ticks = 0;
	// To guard against infinite loop on error
	while (ticks < 500) {
		carts.sort(sortCarts);
		let positions = carts.map(cart => cart.position.join(','));
		for (let i = 0; i < carts.length; i++) {
			carts = move(carts, i, tracks);
			const otherPositions = positions.slice(0,i).concat(positions.slice(i+1));
			if (otherPositions.includes(carts[i].position.join(','))) {
				return carts[i].position.reverse().join(',');
			} else {
				positions[i] = carts[i].position.join(',');
			}
		}
		ticks++;
		if (ticks % 50 === 0) {
			console.log(ticks);
		}
	}
	return 'not yet';
}

// Day 13 - Puzzle 2
// Returns the location "x,y" of the final remaining cart after all others have crashed
// The location is at the end of the tick in which the last crash occurs
const lastCart = input => {
	const tracks = input.split(/\n/).map(line => line.replace(/\s/g, 0));
	let carts = initializeCarts(tracks);
	console.log(carts);
	let ticks = 0;
	while (carts.length > 1 && ticks < 100000) {
		carts.sort(sortCarts);
		let positions = carts.map(cart => cart.position.join(','));
		let crashes = [];
		for (let i = 0; i < carts.length; i++) {
			carts = move(carts, i, tracks);
			const otherPositions = positions.slice(0,i).concat(positions.slice(i+1));
			if (otherPositions.includes(carts[i].position.join(','))) {
				otherIndex = otherPositions.indexOf(carts[i].position.join(','));
				otherIndex < i ? crashes.push(otherIndex, i) : crashes.push(i, otherIndex + 1);
			}
			positions[i] = carts[i].position.join(',');
		}
		if (crashes.length) {
			console.log('crashes', crashes);
			carts = removeIndex(carts, crashes);
		}
		ticks++;
		if (ticks % 500 === 0) {
			console.log(ticks);
		}
	}
	console.log(ticks);
	console.log(carts);
	return carts[0].position.reverse().join(',');
}

const initializeCarts = tracks => {
	let carts = [];
	tracks.forEach((row,i) => {
		row.split('').forEach((el, col) => {
			if ('v^<>'.includes(el)) {
				let c = {
					position: [i, col],
					nextTurn: 'left',
				};
				switch(row[col]) {
					case 'v':
					c.direction = 'down';
					row[col] = '|';
					break;
					case '^':
					c.direction = 'up';
					row[col] = '|';
					break;
					case '<':
					c.direction = 'left';
					row[col] = '-';
					break;
					case '>':
					c.direction = 'right';
					row[col] = '-';
					break;
				}
				carts.push(c);
			}
		});
	});
	return carts;
}
// Take an array of objects with a key of position, an array of length 2
// Sorts by position[0] then position[1]
const sortCarts = (a,b) => {
	if (a.position[0] < b.position[0]) {
		return -1;
	}
	if (a.position[0] > b.position[0]) {
		return 1;
	}
	if (a.position[1] < b.position[1]) {
		return -1;
	}
	if (a.position[1] > b.position[1]) {
		return 1;
	}
	return 0;
}

// Executes one move of cart[i], given the map tracks
const move = (carts, i, tracks) => {
	switch(carts[i].direction) {
		case 'up':
			carts[i].position[0]--;
			switch(tracks[carts[i].position[0]][carts[i].position[1]]) {
				case 'b':
					carts[i].direction = 'left';
					break;
				case '/':
					carts[i].direction = 'right';
					break;
				case '+':
					switch(carts[i].nextTurn) {
						case 'left':
							carts[i].direction = 'left';
							carts[i].nextTurn = 'straight';
							break;
						case 'straight':
							carts[i].nextTurn = 'right';
							break;
						case 'right':
							carts[i].direction = 'right';
							carts[i].nextTurn = 'left';
							break;
					}
					break;
			}
			break;
		case 'down':
			carts[i].position[0]++;
			switch(tracks[carts[i].position[0]][carts[i].position[1]]) {
				case 'b':
					carts[i].direction = 'right';
					break;
				case '/':
					carts[i].direction = 'left';
					break;
				case '+':
					switch(carts[i].nextTurn) {
						case 'left':
							carts[i].direction = 'right';
							carts[i].nextTurn = 'straight';
							break;
						case 'straight':
							carts[i].nextTurn = 'right';
							break;
						case 'right':
							carts[i].direction = 'left';
							carts[i].nextTurn = 'left';
							break;
					}
					break;
			}
			break;
		case 'left':
			carts[i].position[1]--;
			switch(tracks[carts[i].position[0]][carts[i].position[1]]) {
				case 'b':
					carts[i].direction = 'up';
					break;
				case '/':
					carts[i].direction = 'down';
					break;
				case '+':
					switch(carts[i].nextTurn) {
						case 'left':
							carts[i].direction = 'down';
							carts[i].nextTurn = 'straight';
							break;
						case 'straight':
							carts[i].nextTurn = 'right';
							break;
						case 'right':
							carts[i].direction = 'up';
							carts[i].nextTurn = 'left';
							break;
					}
					break;
			}
			break;
		case 'right':
			carts[i].position[1]++;
			switch(tracks[carts[i].position[0]][carts[i].position[1]]) {
				case 'b':
					carts[i].direction = 'down';
					break;
				case '/':
					carts[i].direction = 'up';
					break;
				case '+':
					switch(carts[i].nextTurn) {
						case 'left':
							carts[i].direction = 'up';
							carts[i].nextTurn = 'straight';
							break;
						case 'straight':
							carts[i].nextTurn = 'right';
							break;
						case 'right':
							carts[i].direction = 'down';
							carts[i].nextTurn = 'left';
							break;
					}
					break;
			}
			break;
	}
	return carts;
}

// Day 14 - Puzzle 1
const bestRecipe = numTurns => {
	let scoreboard = new LinkedList();
	scoreboard.add(3);
	scoreboard.add(7);
	while (scoreboard.sizeOfList() <= numTurns + 10) {
		if (scoreboard.sizeOfList() % 10000 === 0) {
			console.log(scoreboard.sizeOfList());
		}
		const newRecipe = scoreboard.getElfSum();
		if (newRecipe < 10) {
			scoreboard.add(newRecipe);
		} else {
			scoreboard.add(1);
			scoreboard.add(newRecipe - 10);
		}
		scoreboard.moveElves();
	}
	// console.log(scoreboard.printList());
	return scoreboard.getNextTenAfterIndex(numTurns);
}

// Day 14 - Puzzle 2
// Attempt 1 with LinkedList -> Way too slow
const recipeSequence = seq => {
	let scoreboard = new LinkedList(seq.length);
	scoreboard.add(3);
	scoreboard.add(7);
	while (scoreboard.getSequence() !== seq) {
		if (scoreboard.sizeOfList() % 50000 === 0) {
			console.log(scoreboard.sizeOfList());
		}
		const newRecipe = scoreboard.getElfSum();
		if (newRecipe < 10) {
			scoreboard.add(newRecipe);
		} else {
			scoreboard.add(1);
			if (scoreboard.getSequence() === seq) {
				break;
			}
			scoreboard.add(newRecipe - 10);
		}
		scoreboard.moveElves();
	}
	// console.log(scoreboard.printList());
	return scoreboard.sizeOfList() - seq.length;
}

// Using strings instead of linked list
// Faster but still way too slow
const recipeSequence2 = seq => {
	let scoreboard = '37'
	let elf1 = 0, elf2 = 1;
	const len = seq.length;
	while (scoreboard.slice(0-len) !== seq && scoreboard.slice(-1-len, -1) !== seq) {
		const elf1score = +scoreboard[elf1];
		const elf2score = +scoreboard[elf2];
		scoreboard += (elf1score + elf2score);
		elf1 = (elf1 + elf1score + 1) % scoreboard.length;
		elf2 = (elf2 + elf2score + 1) % scoreboard.length;
		if (scoreboard.length % 100000 === 0) {
			console.log(scoreboard.length);
		}
	}
	return scoreboard.indexOf(seq);
}

// Final attempt, runs in a little over a minute
// Store as an array of strings with length 100,000 for fastest processing
const recipeSequence3 = seq => {
	let scoreboard = ['37'];
	let elf1 = 0, elf2 = 1;
	const len = seq.length;
	let last = 0;
	while (scoreboard[last].slice(0-len) !== seq && 
				scoreboard[last].slice(-1-len,-1) !== seq) {
		const elf1score = +scoreboard[Math.floor(elf1/100000)][elf1 % 100000];
		const elf2score = +scoreboard[Math.floor(elf2/100000)][elf2 % 100000];
		scoreboard[last] += (elf1score + elf2score);
		if (scoreboard[last].length >= 100000 + len) {
			scoreboard.push(scoreboard[last].slice(100000));
			scoreboard[last] = scoreboard[last].slice(0,100000);
			last++;
		}
		elf1 = (elf1 + elf1score + 1) % ((scoreboard.length - 1) * 100000 + scoreboard[last].length);
		elf2 = (elf2 + elf2score + 1) % ((scoreboard.length - 1) * 100000 + scoreboard[last].length);
	}
	return (scoreboard.length - 1) * 100000 + scoreboard[last].indexOf(seq);
}

// ---------- GOBLINS -----------------------

// Day 16 - Puzzle 1
// Returns the number of samples that could be three or more opcodes
const sampleOpcodes = input => {
	const samples = cleanupSamples(input);
	let found = 0;
	samples.forEach(([before, instr, after]) => {
		if (possOpcodes(before, instr, after).length >=3 ) {
			found++;
		}
	});
	return found;
}

/* Parses input into an array of arrays of the form [before, instructions, after]
 * where each item is an array of 4 integers
 * i.e. 
 * `Before: [2, 0, 2, 2]
 * 3 0 2 1
 * After:  [2, 1, 2, 2]`
 * to
 * [[2, 0, 2, 2],
 *  [3, 0, 2, 1],
 *  [2, 1, 2, 2]]
 */
const cleanupSamples = input => {
	return input.split(/\n\n/)
							.map(s => s.split(/\n/)
													.map(el => el.split(/\[|,?\s|\]/)
																				.filter(el => !isNaN(el) && el.length)
																				.map(el => +el)));
}

// Returns an array of the possible op codes the sample could produce
const possOpcodes = (before, instr, after) => {
	let opcodes = [];
	let result = after.join(',');
	const [op, A, B, C] = instr;
	let worker;

	//addr
	if (A < 4 && B < 4) {
		worker = [...before];
		worker[C] = worker[A] + worker[B];
		if (worker.join(',') === result) {
			opcodes.push('addr');
		}
	}

	//addi
	if (A < 4) {
		worker = [...before];
		worker[C] = worker[A] + B;
		if (worker.join(',') === result) {
			opcodes.push('addi');
		}
	}

	//mulr
	if (A < 4 && B < 4) {
		worker = [...before];
		worker[C] = worker[A] * worker[B];
		if (worker.join(',') === result) {
			opcodes.push('mulr');
		}
	}

	//muli
	if (A < 4) {
		worker = [...before];
		worker[C] = worker[A] * B;
		if (worker.join(',') === result) {
			opcodes.push('muli');
		}
	}

	//banr
	if (A < 4 && B < 4) {
		worker = [...before];
		worker[C] = worker[A] & worker[B];
		if (worker.join(',') === result) {
			opcodes.push('banr');
		}
	}

	//bani
	if (A < 4) {
		worker = [...before];
		worker[C] = worker[A] & B;
		if (worker.join(',') === result) {
			opcodes.push('bani');
		}
	}

	//borr
	if (A < 4 && B < 4) {
		worker = [...before];
		worker[C] = worker[A] | worker[B];
		if (worker.join(',') === result) {
			opcodes.push('borr');
		}
	}

	//bori
	if (A < 4) {
		worker = [...before];
		worker[C] = worker[A] | B;
		if (worker.join(',') === result) {
			opcodes.push('bori');
		}
	}

	//setr
	if (A < 4) {
		worker = [...before];
		worker[C] = worker[A];
		if (worker.join(',') === result) {
			opcodes.push('setr');
		}
	}

	//seti
	if (A < 4) {
		worker = [...before];
		worker[C] = A;
		if (worker.join(',') === result) {
			opcodes.push('seti');
		}
	}

	//gtir
	if (B < 4) {
		worker = [...before];
		worker[C] = A > worker[B] ? 1 : 0;
		if (worker.join(',') === result) {
			opcodes.push('gtir');
		}
	}

	//gtri
	if (A < 4) {
		worker = [...before];
		worker[C] = worker[A] > B ? 1 : 0;
		if (worker.join(',') === result) {
			opcodes.push('gtri');
		}
	}

	//gtrr
	if (A < 4 && B < 4) {
		worker = [...before];
		worker[C] = worker[A] > worker[B] ? 1 : 0;
		if (worker.join(',') === result) {
			opcodes.push('gtrr');
		}
	}

	//eqir
	if (B < 4) {
		worker = [...before];
		worker[C] = A === worker[B] ? 1 : 0;
		if (worker.join(',') === result) {
			opcodes.push('eqir');
		}
	}

	//eqri
	if (A < 4) {
		worker = [...before];
		worker[C] = worker[A] === B ? 1 : 0;
		if (worker.join(',') === result) {
			opcodes.push('eqri');
		}
	}

	//eqrr
	if (A < 4 && B < 4) {
		worker = [...before];
		worker[C] = worker[A] === worker[B] ? 1 : 0;
		if (worker.join(',') === result) {
			opcodes.push('eqrr');
		}
	}
	return opcodes;
}

// Day 16 - Puzzle 2
// Performs @operations after using @sampleList to decode the opcode ids
const performOps = (sampleList, operations) => {
	const samples = cleanupSamples(sampleList);
	const opMap = decodeOpcodes(samples);
	const ops = operations.split(/\n/).map(str => str.split(' ').map(el => +el));
	let registers = [0, 0, 0, 0];
	ops.forEach(([code, A, B, C], i) => {
		switch(opMap[code]) {
			case 'addr':
				registers[C] = registers[A] + registers[B];
				break;
			case 'addi':
				registers[C] = registers[A] + B;
				break;
			case 'mulr':
				registers[C] = registers[A] * registers[B];
				break;
			case 'muli':
				registers[C] = registers[A] * B;
				break;
			case 'banr':
				registers[C] = registers[A] & registers[B];
				break;
			case 'bani':
				registers[C] = registers[A] & B;
				break;
			case 'borr':
				registers[C] = registers[A] | registers[B];
				break;
			case 'bori':
				registers[C] = registers[A] | B;
				break;
			case 'setr':
				registers[C] = registers[A];
				break;
			case 'seti':
				registers[C] = A;
				break;
			case 'gtir':
				registers[C] = A > registers[B] ? 1 : 0;
				break;
			case 'gtri':
				registers[C] = registers[A] > B ? 1 : 0;
				break;
			case 'gtrr':
				registers[C] = registers[A] > registers[B] ? 1 : 0;
				break;
			case 'eqir':
				registers[C] = A === registers[B] ? 1 : 0;
				break;
			case 'eqri':
				registers[C] = registers[A] === B ? 1 : 0;
				break;
			case 'eqrr':
				registers[C] = registers[A] === registers[B] ? 1 : 0;
				break;
			default:
				console.log('uh oh');
		}
	});
	return registers;
}

// Returns an array that maps opcode id (index of array) to opcode
const decodeOpcodes = samples => {
	let opcodes = ['addr', 'addi', 'mulr', 'muli', 'banr', 'bani', 'borr', 'bori', 
		'setr', 'seti', 'gtir', 'gtri', 'gtrr', 'eqir', 'eqri', 'eqrr'];
	let opcodeMap = Array(16).fill(null);

	// Maps each sample to [opcode id, [possible opcodes]]
	let sampleLogic = samples.map(([before, instr, after]) => [instr[0], possOpcodes(before, instr, after)]);
	let singles = ['array']; // In case this method didn't work, guards against infinite loop when no singles found
	while (opcodeMap.includes(null) && singles.length) {
		singles = sampleLogic.filter(([id, codes]) => codes.length === 1);
		singles.forEach(([id, code]) => {
			if (!opcodeMap[id]) {
				opcodeMap[id] = code[0];
				opcodes = removeVal(opcodes, code[0]);
			}
		});
		sampleLogic = sampleLogic.map(([code, posscodes]) => [code, posscodes.filter(el => !opcodeMap.includes(el))]);
	}
	console.log(opcodeMap);
	return opcodeMap;
}

// --------- DAY 17 - WATER/SAND --------------------------------

// Day 18 - Puzzle 1
const lumberValue = (input, minutes) => {
	let yard = input.split(/\n/);
	for (var m = 0; m < minutes; m++) {
		yard = yardStep(yard);
	}
	return countInstances2D(yard, '|') * countInstances2D(yard, '#');
}

// Day 18 - Puzzle 2
const lumberValue2 = (input, minutes) => {
	let yard = input.split(/\n/);
	let config = [];
	let m = 0;
	// Find the first repeat
	while (!config.includes(yard.join('')) && m < minutes) {
		config.push(yard.join(''));
		yard = yardStep(yard);
		m++;
	}
	// Never found a pattern
	if (m === minutes) {
		return countInstances2D(yard, '|') * countInstances2D(yard, '#');
	}
	// Find the second repeat
	const firstRepeat = m;
	config = yard.join('');
	m = 0;
	do {
		yard = yardStep(yard);
		m++;
	}
	while (yard.join('') !== config && m + firstRepeat < minutes);
	if (m + firstRepeat === minutes) {
		return countInstances2D(yard, '|') * countInstances2D(yard, '#');
	}
	console.log(firstRepeat, m);
	const sameAs = ((minutes - firstRepeat) % m) + firstRepeat;
	return lumberValue(input, sameAs);
}


// Turn over yarn one minute and return new yard
const yardStep = yard => {
	return yard.map((row, rowi, yard) => {
		return row.split('').map((el, coli) => {
			const neighbors = lumberNeighbors(yard, rowi, coli);
			switch(el) {
				case '.':
					return neighbors.trees >= 3 ? '|' : '.';
				case '|':
					return neighbors.lumberyard >= 3 ? '#' : '|';
				case '#':
					return neighbors.trees >= 1 && neighbors.lumberyard >= 1 ? '#' : '.';
			}
		}).join('');
	});
}

// Returns an object with keys open, trees, lumberyard
// representing the totals of each type that are adjacent to yard[rowi][coli]
const lumberNeighbors = (yard, rowi, coli) => {
	let neighbors = {
		'.': 0,
		'|': 0,
		'#': 0,
	};
	if (rowi > 0) {
		neighbors[yard[rowi-1][coli-1]]++;
		neighbors[yard[rowi-1][coli]]++;
		neighbors[yard[rowi-1][coli+1]]++;
	}
	neighbors[yard[rowi][coli-1]]++;
	neighbors[yard[rowi][coli+1]]++;
	if (rowi + 1 < yard.length) {
		neighbors[yard[rowi+1][coli-1]]++;
		neighbors[yard[rowi+1][coli]]++;
		neighbors[yard[rowi+1][coli+1]]++;
	}
	return {
		open: neighbors['.'],
		trees: neighbors['|'],
		lumberyard: neighbors['#'],
	};
}

