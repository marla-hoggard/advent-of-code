const INPUTS = [
  null,
  DAY1,
  DAY2,
  DAY3,
  DAY4,
  DAY5,
  DAY6,
  DAY7,
  DAY8,
  DAY9,
  DAY10,
  DAY11,
  DAY12,
  DAY13,
  DAY14,
  DAY15,
  DAY16,
  DAY17,
  DAY18,
  DAY19,
  DAY20,
  DAY21,
  DAY22,
  DAY23,
  DAY24,
  DAY25,
];

// Which function to run to display the answer to a given puzzle
// Key: {day}-{puzzle}
// The function is passed one parameter, INPUT[day]
// If the answer function requires other parameters, write an anonymous function that takes input (i.e. 2-1)
const ANSWERS = {
  "1-1": totalFuelRequirement,
  "1-2": totalFuelRequirement2,
  "2-1": input => programAlarm1202(input, 12, 2), // noun = 12, verb = 2, from puzzle spec
  "2-2": input => findNounVerb(input, 19690720), // output = 19690720, from puzzle spec
  "3-1": crossedWires,
  "3-2": crossedWires2,
  "4-1": validPasswords,
  "4-2": validPasswords2,
  "5-1": input => diagnosticTest({ puzzleInput: input, input1: 1 }), // inputValue = 1, from puzzle spec
  "5-2": input => diagnosticTest({ puzzleInput: input, input1: 5 }), // inputValue = 5, from puzzle spec
  "6-1": totalOrbits,
  "6-2": fromYouToSanta,
  "7-1": findMaxOutput,
  "7-2": findMaxOutput2,
  "8-1": digitalSendingNetwork,
  "8-2": drawImage,
  "9-1": input => diagnosticTest({ puzzleInput: input, input1: 1 }), // inputValue = 1, from puzzle spec
  "9-2": input => diagnosticTest({ puzzleInput: input, input1: 2 }), // inputValue = 2, from puzzle spec
  "10-1": bestAsteroid,
  "10-2": destroyAsteroids,
  "11-1": howManyPainted,
  "11-2": doThePainting,
  "12-1": totalMoonEnergy,
  "12-2": repeatMoon,
  "13-1": carePackage,
  "13-2": () => "incomplete", // brickBreaker
  "14-1": makeOneFuel,
  "14-2": () => "incomplete", // aTrillionOre
  "15-1": () => "incomplete",
  "15-2": () => "incomplete",
  "16-1": input => calculateFFT(input, 100), // 100 phases, from puzzle spec
  "16-2": () => "incomplete",
  "17-1": createRobotMap,
  "17-2": () => "incomplete",
  "18-1": () => "incomplete",
  "18-2": () => "incomplete",
  "19-2": () => "incomplete",
  "20-1": () => "incomplete",
  "20-2": () => "incomplete",
  "21-1": () => "incomplete",
  "21-2": () => "incomplete",
  "22-1": () => "incomplete",
  "22-2": () => "incomplete",
  "23-1": () => "incomplete",
  "23-2": () => "incomplete",
  "24-1": () => "incomplete",
  "24-2": () => "incomplete",
  "25-1": () => "incomplete",
  "25-2": () => "incomplete",
};