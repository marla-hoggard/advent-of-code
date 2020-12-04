//Advent of Code - Day 20 - Puzzle 1
//Takes in semicolon-separated input string
//Returns whichever particle stays closest to 0 on avg
function particleSwarm(input) {
	//particles is an array of Particle objects from the input
	var particles = particleArray(input);

	//Check closest after many iterations - if they are all the same, that's the answer
	var avgs1000 = particles.map(part => avgDistance(part,1000));
	var min1000 = avgs1000.indexOf(Math.min(...avgs1000));
	var avgs2000 = particles.map(part => avgDistance(part,2000));
	var min2000 = avgs2000.indexOf(Math.min(...avgs2000));
	var avgs5000 = particles.map(part => avgDistance(part,5000));
	var min5000 = avgs5000.indexOf(Math.min(...avgs5000));
	var avgs10000 = particles.map(part => avgDistance(part,10000));
	var min10000 = avgs10000.indexOf(Math.min(...avgs10000));
	console.log(min1000,min2000,min5000,min10000);
	return;
}

//Prototype to create Particle objects
//Can be made with (input line,index) for parsing from puzzle input
//Or can be made with dummy input, index, p, v, a
function Particle (input,index,p,v,a) {
	if (p === undefined) {
		//Array of each <...> section: pos, vel acc in order
		var triples = input.match(/<[\d,-]+>/g);
		triples = triples.map(function(elem) {
			var triple = elem.replace(/[<>]/g,"").split(",");
			return triple.map(item => Number(item));
		});

		this.position = triples[0];
		this.velocity = triples[1];
		this.acceleration = triples[2];
	}
	else {
		this.position = p;
		this.velocity = v;
		this.acceleration = a;
	}
	this.index = index;
	this.distance = 
		Math.sqrt(
			  (this.position[0] ** 2)
			+ (this.position[1] ** 2)
			+ (this.position[2] ** 2)
		);
		
}

//Takes comma-separated string of particle input, returns array of Particle objects
function particleArray(input) {
	var particles = input.split(";");
	for (var x = 0, n = particles.length; x < n; x++) {
		particles[x] = new Particle(particles[x],x);
	}
	return particles;
}

//Takes in a particle, returns that particle after one move
function particleMove(particle) {
	//Change velocity
	var vel = (particle.velocity).map(function(elem,index) {
		return elem + particle.acceleration[index];
	});
	//Change position
	var pos = (particle.position).map(function(elem,index) {
		return elem + vel[index];
	});
	return new Particle("",particle.index,pos,vel,particle.acceleration);
}

//Returns avg distance from 0 of part after m moves
function avgDistance(part,m) {
	var distances = [];
	distances.push(part.distance);
	for (var i = 0; i < m; i++) {
		part = particleMove(part);
		distances.push(part.distance);
	}
	//console.log(distances);
	return distances.reduce(((prev,cur) => prev + cur),0) / (m + 1);
}