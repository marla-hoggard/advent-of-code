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

const placeholder = () => 'incomplete';

// Which function to run to display the answer to a given puzzle
// Key: {day}-{puzzle}
// The function is passed one parameter, INPUT[day]
// If the answer function requires other parameters, write an anonymous function that takes input
// i.e. (input) => fn(input, extraParam)
const ANSWERS = {
  '1-1': pathDistance,
  '1-2': pathRepeat,
  '2-1': bathroomCode,
  '2-2': bathroomCodeWeird,
  '3-1': checkTriangleList,
  '3-2': checkTriangleListColumns,
  '4-1': sumRealIds,
  '4-2': findNorthPole,
  '5-1': chessPassword, // 40 sec
  '5-2': chessPassword2, // 106 sec
  '6-1': repetitionCode,
  '6-2': repititionCode2,
  '7-1': numTLS,
  '7-2': numSSL,
  '8-1': tinyScreen,
  '8-2': (input) => tinyScreen(input, true),
  '9-1': decompress,
  '9-2': fullDecompress, // 73 sec
  '10-1': botMicrochips,
  '10-2': botMicrochipsOutput,
  '11-1': placeholder,
  '11-2': placeholder,
  '12-1': (input) => monorailProgram(input, { a: 0, b: 0, c: 0, d: 0 }),
  '12-2': (input) => monorailProgram(input, { a: 0, b: 0, c: 1, d: 0 }),
  '13-1': cubicleMaze,
  '13-2': nearbyCubicles, // 20sec
  '14-1': (input) => hashKeys(input, md5),
  '14-2': (input) => hashKeys(input, stretchedHash), // 3 min
  '15-1': slotMachine,
  '15-2': (input) => slotMachine(input, { slots: 11, start: 0 }),
  '16-1': (input) => dragonCheck(input, 272),
  '16-2': (input) => dragonCheck(input, 35651584), // 11 sec
  '17-1': (input) => vaultPath(input, 'shortest'),
  '17-2': (input) => vaultPath(input, 'longest'),
  '18-1': placeholder,
  '18-2': placeholder,
  '19-1': whiteElfant,
  '19-2': placeholder,
  '20-1': placeholder,
  '20-2': placeholder,
  '21-1': placeholder,
  '21-2': placeholder,
  '22-1': placeholder,
  '22-2': placeholder,
  '23-1': placeholder,
  '23-2': placeholder,
  '24-1': placeholder,
  '24-2': placeholder,
  '25-1': placeholder,
  '25-2': placeholder,
};
