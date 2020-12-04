//Takes the puzzle input as an array of tower strings, i.e. "emlzcpy (106) -> pwmoihf, sdwnkb"
//Returns the name of the bottom tower
function bottomTower(towers) {

	//Create an array of the towers that carry something
	var carriers = towers.filter(elem =>  elem.includes('->'));
	
	//trim whitespace from each tower
	carriers = carriers.map(elem => elem.trim());
	
	//Create an array carrierObjs that contains each carrier as an object with prop name, weight and carrying
	var carrierObjs = carriers.map(carrier => {
		var carrierArray = carrier.split(" "); //split this carrier by whitespace
		var carrying = (carrierArray.slice(3)).join("").split(","); //an array of what it's carrying
		return new Tower(carrierArray[0], carrierArray[1],carrying);		
	});
	
	//Make carried an array of the towers that are carried 
	var carried = [];
	carrierObjs.forEach(carrier => {
		carrier.carrying.forEach(tow => {
			if (!carried.includes(tow)) {
				carried.push(tow);
			}
		});
	});

	
	//Find the tower that no one is carrying
	for (var c = 0; c < carrierObjs.length; c++) {
		if (!carried.includes(carrierObjs[c].name)) {
			return carrierObjs[c].name;
		}
	}
	return null;
}

//Object constructor for towers
function Tower(name, weight, carrying) {
	this.name = name;
	this.weight = +weight.match(/\d+/)[0];
	this.carrying = carrying;
}
