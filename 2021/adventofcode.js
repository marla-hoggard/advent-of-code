// ------ DAY 1 -----
/**
 *
 * @param input list of numbers separated by line breaks
 * @returns how many are pair-wise increasing
 */
const day1Puzzle1 = (input) => {
  const numbers = input.split("\n").map((el) => +el);
  let increaseCounter = 0;

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] < numbers[i + 1]) {
      increaseCounter++;
    }
  }
  return increaseCounter;
};

/**
 *
 * @param {*} input list of numbers separated by line breaks
 * @returns for each consecutive triple, how many are pair-wise increasing
 * i.e. for [A,B,C,D] is A+B+C < B+C+D
 */
const day1Puzzle2 = (input) => {
  const numbers = input.split("\n").map((el) => +el);
  let increaseCounter = 0;

  for (let i = 0; i < numbers.length - 3; i++) {
    // Equivalent to numbers[i] + numbers[i + 1] + numbers[i + 2] < numbers[i + 1] + numbers[i + 2] + numbers[i + 3];
    if (numbers[i] < numbers[i + 3]) {
      increaseCounter++;
    }
  }
  return increaseCounter;
};
