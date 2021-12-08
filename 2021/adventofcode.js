// -------------- DAY 1 --------------

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

// -------------- DAY 2 --------------

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

// -------------- DAY 3 --------------

/**
 * DAY 3 - PUZZLE 1
 * @param {string} input list of binary values
 * Calculates the most and least common digits in each place
 * to create gamma (most) and epsilon (least)
 * @returns gamma * epsilon
 */
const day3puzzle1 = (input) => {
  let gamma = ''; // most common digit
  let epsilon = ''; // least common digit
  const strings = input.split('\n');
  const digits = Array(strings[0].length)
    .fill(null)
    .map(() => ({ 0: 0, 1: 0 }));
  strings.forEach((binaryString) => {
    binaryString.split('').forEach((d, i) => {
      digits[i][d]++;
    });
  });

  digits.forEach((d) => {
    if (d[0] > d[1]) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  });

  console.log({ gamma, epsilon });
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

/**
 * DAY 3 - PUZZLE 2
 * @param {string} input list of binary numbers
 * Oxygen: Filters the list of numbers so only those with the most common digit remain,
 * one digit at a time from first digit, until one number is left
 *
 * CO2: Filters the list of numbers so only those with the least common digit remain,
 * one digit at a time from first digit, until one number is left
 * @returns Oxygen * CO2
 */
const day3puzzle2 = (input) => {
  let oxygen = input.split('\n');
  let carbon = input.split('\n');

  let i = 0;
  while (oxygen.length > 1) {
    const mapping = oxygen.reduce(
      (m, str) => {
        m[str[i]]++;
        return m;
      },
      { 0: 0, 1: 0 }
    );

    let val = mapping[0] > mapping[1] ? '0' : '1';
    oxygen = oxygen.filter((str) => str[i] === val);
    i++;
  }

  i = 0;
  while (carbon.length > 1) {
    const mapping = carbon.reduce(
      (m, str) => {
        m[str[i]]++;
        return m;
      },
      { 0: 0, 1: 0 }
    );

    let val = mapping[0] > mapping[1] ? '1' : '0';
    carbon = carbon.filter((str) => str[i] === val);
    i++;
  }

  return parseInt(oxygen[0], 2) * parseInt(carbon[0], 2);
};

// -------------- DAY 4 --------------

/**
 * DAY 4 - PUZZLE 1
 * @param {string} input an ordered list of bingo numbers drawn and a bunch of bingo boards
 * @returns the 'score' of the first board to win
 * where score = (sum of unmarked numbers) * winning number
 */
const firstBingoWinner = (input) => {
  const [rawNumbers, ...rawBoards] = input.split('\n\n');

  const drawnNumbers = rawNumbers.split(',');

  const boards = rawBoards.map((board) => {
    const parsedBoard = {
      unmarkedNumbers: [],
      rows: [5,5,5,5,5],
      cols: [5,5,5,5,5],
    };

    board.split('\n').forEach((row, whichRow) => {
      row.trim().split(/\s+/).forEach((num, whichCol) => {
        parsedBoard.unmarkedNumbers.push(num);
        parsedBoard[num] = { row: whichRow, col: whichCol };
      })
    });

    return parsedBoard;
  });

  for (const num of drawnNumbers) {
    for (const board of boards) {
      const index = board.unmarkedNumbers.indexOf(num);
      if (index !== -1) {
        board.unmarkedNumbers.splice(index, 1);
        const { row, col } = board[num];
        if (board.rows[row] === 1) {
          return sum(board.unmarkedNumbers) * num;
        } else {
          board.rows[row]--;
        }

        if (board.cols[col] === 1) {
          return sum(board.unmarkedNumbers) * num;
        } else {
          board.cols[col]--;
        }
      }
    }
  }
  return 'Nobody won';
}

/**
 * DAY 4 - PUZZLE 2
 * @param {string} input an ordered list of bingo numbers drawn and a bunch of bingo boards
 * @returns the 'score' of the last board to win
 * where score = (sum of unmarked numbers) * winning number
 */
const lastBingoWinner = (input) => {
  const [rawNumbers, ...rawBoards] = input.split('\n\n');

  const drawnNumbers = rawNumbers.split(',');

  const boards = rawBoards.map((board) => {
    const parsedBoard = {
      unmarkedNumbers: [],
      rows: [5,5,5,5,5],
      cols: [5,5,5,5,5],
      done: false,
    };

    board.split('\n').forEach((row, whichRow) => {
      row.trim().split(/\s+/).forEach((num, whichCol) => {
        parsedBoard.unmarkedNumbers.push(num);
        parsedBoard[num] = { row: whichRow, col: whichCol };
      })
    });

    return parsedBoard;
  });

  let boardsRemaining = boards.length;

  for (const num of drawnNumbers) {
    for (const board of boards) {
      if (!board.done) {
        const index = board.unmarkedNumbers.indexOf(num);
        if (index !== -1) {
          board.unmarkedNumbers.splice(index, 1);
          const { row, col } = board[num];
          if (board.rows[row] === 1) {
            if (boardsRemaining === 1) {
              return sum(board.unmarkedNumbers) * num;
            } else {
              board.done = true;
              boardsRemaining--;
            }
          } else {
            board.rows[row]--;
          }

          if (!board.done && board.cols[col] === 1) {
            if (boardsRemaining === 1) {
              return sum(board.unmarkedNumbers) * num;
            } else {
              board.done = true;
              boardsRemaining--;
            }
          } else {
            board.cols[col]--;
          }
        }
      }
    }
  }
  return 'Nobody won';
}