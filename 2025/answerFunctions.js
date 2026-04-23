const INPUTS = [null, DAY1, DAY2, DAY3, DAY4, DAY5, DAY6, DAY7, DAY8, DAY9, DAY10, DAY11, DAY12];

const placeholder = () => 'incomplete';

// Which function to run to display the answer to a given puzzle
// Key: {day}-{puzzle}
// The function is passed one parameter, INPUT[day]
// If the answer function requires other parameters, write an anonymous function that takes input
// i.e. (input) => fn(input, extraParam)
const ANSWERS = {
  '1-1': day1puzzle1,
  '1-2': day1puzzle2,
  '2-1': day2puzzle1,
  '2-2': day2puzzle2,
  '3-1': (input) => day3(input, 2),
  '3-2': (input) => day3(input, 12),
  '4-1': day4puzzle1,
  '4-2': day4puzzle2,
  '5-1': day5puzzle1,
  '5-2': day5puzzle2,
  '6-1': day6puzzle1,
  '6-2': day6puzzle2,
  '7-1': day7puzzle1,
  '7-2': day7puzzle2,
  '8-1': (input) => day8puzzle1(input, 1000),
  '8-2': day8puzzle2,
  '9-1': day9puzzle1,
  '9-2': day9puzzle2,
  '10-1': day10puzzle1,
  '10-2': day10puzzle2,
  '11-1': day11puzzle1,
  '11-2': day11puzzle2,
  '12-1': placeholder,
  '12-2': placeholder,
};
