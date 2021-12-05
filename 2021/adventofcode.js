// ------ DAY 1 -----
/**
 * DAY 1 - PUZZLE 1
 * @param {string} input list of numbers separated by line breaks
 * @returns how many are pair-wise increasing
 */
const day1Puzzle1 = (input) => {
  const numbers = input.split('\n').map((el) => +el);
  let increaseCounter = 0;

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] < numbers[i + 1]) {
      increaseCounter++;
    }
  }
  return increaseCounter;
};

/**
 * DAY 1 - PUZZLE 2
 * @param {string} input list of numbers separated by line breaks
 * @returns for each consecutive triple, how many are pair-wise increasing
 * i.e. for [A,B,C,D] is A+B+C < B+C+D
 */
const day1Puzzle2 = (input) => {
  const numbers = input.split('\n').map((el) => +el);
  let increaseCounter = 0;

  for (let i = 0; i < numbers.length - 3; i++) {
    // Equivalent to numbers[i] + numbers[i + 1] + numbers[i + 2] < numbers[i + 1] + numbers[i + 2] + numbers[i + 3];
    if (numbers[i] < numbers[i + 3]) {
      increaseCounter++;
    }
  }
  return increaseCounter;
};

// ------ DAY 2 -----
/**
 * DAY 2 - PUZZLE 1
 * @param {string} input list of directions for the submarine
 * 'down X' adds X to the depth value
 * 'up X' subtracts X from the depth value
 * 'forward X' adds X to the horizontal value
 * @returns horizontal * depth
 */
const day2puzzle1 = (input) => {
  let horiz = 0;
  let depth = 0;
  input.split('\n').forEach((instr) => {
    const [dir, dist] = instr.split(' ');
    switch (dir) {
      case 'forward':
        horiz += Number(dist);
        break;
      case 'down':
        depth += Number(dist);
        break;
      case 'up':
        depth -= Number(dist);
        break;
      default:
        console.log('invalid direction', { instr });
    }
  });
  console.log({ horiz, depth });
  return horiz * depth;
};

/**
 * DAY 2 - PUZZLE 2
 * @param {string} input list of directions for the submarine
 * 'down X' adds X to the aim value
 * 'up X' subtracts X from the aim value
 * 'forward X' adds X to the horizontal value and adds X * aim to the depth value
 * @returns horizontal * depth
 */
const day2puzzle2 = (input) => {
  let horiz = 0;
  let depth = 0;
  let aim = 0;
  input.split('\n').forEach((instr) => {
    const [dir, dist] = instr.split(' ');
    switch (dir) {
      case 'forward':
        horiz += Number(dist);
        depth += aim * Number(dist);
        break;
      case 'down':
        aim += Number(dist);
        break;
      case 'up':
        aim -= Number(dist);
        break;
      default:
        console.log('invalid direction', { instr });
    }
  });
  console.log({ horiz, depth });
  return horiz * depth;
};
