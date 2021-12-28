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
      { 0: 0, 1: 0 },
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
      { 0: 0, 1: 0 },
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
      rows: [5, 5, 5, 5, 5],
      cols: [5, 5, 5, 5, 5],
    };

    board.split('\n').forEach((row, whichRow) => {
      row
        .trim()
        .split(/\s+/)
        .forEach((num, whichCol) => {
          parsedBoard.unmarkedNumbers.push(num);
          parsedBoard[num] = { row: whichRow, col: whichCol };
        });
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
};

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
      rows: [5, 5, 5, 5, 5],
      cols: [5, 5, 5, 5, 5],
      done: false,
    };

    board.split('\n').forEach((row, whichRow) => {
      row
        .trim()
        .split(/\s+/)
        .forEach((num, whichCol) => {
          parsedBoard.unmarkedNumbers.push(num);
          parsedBoard[num] = { row: whichRow, col: whichCol };
        });
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
};

// -------------- DAY 5 --------------

/**
 * DAY 5 - PUZZLE 1
 * @param {string} input a list of coordinates for lines
 * @returns number of points where at least two lines overlap
 * Only consider horizontal and vertical lines, ignore all others
 */
const overlappingVents90 = (input) => {
  let maxX = 0;
  let maxY = 0;

  const lines = input.split('\n').flatMap((el) => {
    const [start, end] = el.split(' -> ');
    const [x1, y1] = start.split(',');
    const [x2, y2] = end.split(',');

    if (x1 === x2 || y1 === y2) {
      if (Math.max(x1, x2) > maxX) {
        maxX = Math.max(x1, x2);
      }

      if (Math.max(y1, y2) > maxY) {
        maxY = Math.max(y1, y2);
      }

      return [
        {
          x1: Number(x1),
          x2: Number(x2),
          y1: Number(y1),
          y2: Number(y2),
        },
      ];
    } else {
      return [];
    }
  });

  let overlaps = 0;
  const grid = Array(maxY + 1)
    .fill(null)
    .map((el) => Array(maxX + 1).fill(0));

  lines.forEach(({ x1, x2, y1, y2 }) => {
    if (x1 === x2) {
      if (y1 < y2) {
        for (let i = y1; i <= y2; i++) {
          grid[i][x1]++;
          if (grid[i][x1] === 2) {
            overlaps++;
          }
        }
      } else {
        for (let i = y2; i <= y1; i++) {
          grid[i][x1]++;
          if (grid[i][x1] === 2) {
            overlaps++;
          }
        }
      }
    } else {
      if (x1 < x2) {
        for (let i = x1; i <= x2; i++) {
          grid[y1][i]++;
          if (grid[y1][i] === 2) {
            overlaps++;
          }
        }
      } else {
        for (let i = x2; i <= x1; i++) {
          grid[y1][i]++;
          if (grid[y1][i] === 2) {
            overlaps++;
          }
        }
      }
    }
  });

  return overlaps;
};

/**
 * DAY 5 - PUZZLE 2
 * @param {string} input a list of coordinates for lines
 * @returns number of points where at least two lines overlap
 * Consider ALL lines
 */
const overlappingVentsAll = (input) => {
  let maxX = 0;
  let maxY = 0;

  const lines = input.split('\n').map((el) => {
    const [start, end] = el.split(' -> ');
    const [x1, y1] = start.split(',');
    const [x2, y2] = end.split(',');

    if (Math.max(x1, x2) > maxX) {
      maxX = Math.max(x1, x2);
    }

    if (Math.max(y1, y2) > maxY) {
      maxY = Math.max(y1, y2);
    }

    return {
      x1: Number(x1),
      x2: Number(x2),
      y1: Number(y1),
      y2: Number(y2),
    };
  });

  let overlaps = 0;
  const grid = Array(maxY + 1)
    .fill(null)
    .map((el) => Array(maxX + 1).fill(0));

  lines.forEach(({ x1, x2, y1, y2 }) => {
    if (x1 === x2) {
      if (y1 < y2) {
        for (let i = y1; i <= y2; i++) {
          grid[i][x1]++;
          if (grid[i][x1] === 2) {
            overlaps++;
          }
        }
      } else {
        for (let i = y2; i <= y1; i++) {
          grid[i][x1]++;
          if (grid[i][x1] === 2) {
            overlaps++;
          }
        }
      }
    } else if (y1 === y2) {
      if (x1 < x2) {
        for (let i = x1; i <= x2; i++) {
          grid[y1][i]++;
          if (grid[y1][i] === 2) {
            overlaps++;
          }
        }
      } else {
        for (let i = x2; i <= x1; i++) {
          grid[y1][i]++;
          if (grid[y1][i] === 2) {
            overlaps++;
          }
        }
      }
    } else {
      let startX = x1;
      let endX = x2;
      let startY = y1;
      let isYIncreasing = y1 < y2;

      if (x2 < x1) {
        startX = x2;
        endX = x1;
        startY = y2;
        isYIncreasing = y2 < y1;
      }

      for (let i = 0; i <= endX - startX; i++) {
        const x = startX + i;
        const y = isYIncreasing ? startY + i : startY - i;

        grid[y][x]++;
        if (grid[y][x] === 2) {
          overlaps++;
        }
      }
    }
  });

  return overlaps;
};

// -------------- DAY 6 --------------
/**
 * The brute force way
 * @param {sting} input csv of integers representing fish
 * @param {*} days how many iterations of breeding to run
 * @returns how much fish there are after @days days
 */
const lanternfishBreeding1 = (input, days = 80) => {
  let fish = input.split(',').map((el) => Number(el));
  for (let i = 0; i < days; i++) {
    fish = fish.flatMap((f) => {
      if (f === 0) {
        return [6, 8];
      } else {
        return [f - 1];
      }
    });
    console.log(i, fish.length);
  }
  return fish.length;
};

/**
 * The much better way
 * @param {sting} input csv of integers representing fish
 * @param {*} days how many iterations of breeding to run
 * @returns how much fish there are after @days days
 */
const lanternfishBreeding2 = (input, days = 80) => {
  const starters = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  let fish = input.split(',').reduce((obj, f) => {
    obj[f]++;
    return obj;
  }, starters);

  for (let i = 0; i < days; i++) {
    let nextRound = { ...starters };
    for (let num = 0; num < 8; num++) {
      nextRound[num] = fish[num + 1];
    }
    nextRound[8] = fish[0];
    nextRound[6] += fish[0];
    fish = { ...nextRound };
  }
  return sum(Object.values(fish));
};

// -------------- DAY 7 --------------
/**
 * DAY 7 - PUZZLE 1
 * @param {string} input csv of crab locations
 * Determines the location that requires the least fuel
 * for all crabs to move to, where movement is linear (1 fuel unit per step)
 * @returns fuel required for all crabs to move to that location
 */
const alignCrabs1 = (input) => {
  const crabs = input.split(',').map((el) => +el);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  let minFuel = Infinity;
  let location = min;
  for (let i = min; i <= max; i++) {
    const fuel = sum(crabs.map((pos) => Math.abs(pos - i)));
    if (fuel < minFuel) {
      minFuel = fuel;
      location = i;
    }
  }
  console.log({ minFuel, location });
  return minFuel;
};

/**
 * DAY 7 - PUZZLE 2
 * @param {string} input csv of crab locations
 * Determines the location that requires the least fuel
 * for all crabs to move to, where movement is exponential (1+2+3+...)
 * @returns fuel required for all crabs to move to that location
 */
const alignCrabs2 = (input) => {
  const crabs = input.split(',').map((el) => +el);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  let minFuel = Infinity;
  let location = min;
  for (let i = min; i <= max; i++) {
    const fuel = sum(
      crabs.map((pos) => {
        const distance = Math.abs(pos - i);
        return (distance * (distance + 1)) / 2;
      }),
    );

    if (fuel < minFuel) {
      minFuel = fuel;
      location = i;
    }
  }
  console.log({ minFuel, location });
  return minFuel;
};

// -------------- DAY 8 --------------
/**
 *
 * @param {string} input list of encoded entries
 * @returns how many of the output value digits are
 * the ones that can be made with a unique amount of segments (1,4,7,8) - lengths 2,3,4,7
 */
const uniqueSegmentDigits = (input) => {
  let unique = 0;
  input.split('\n').forEach((row) => {
    const [, output] = row.split(' | ');
    output.split(' ').forEach((digit) => {
      if ([2, 3, 4, 7].includes(digit.length)) {
        unique++;
      }
    });
  });
  return unique;
};

const sumDecodedSegments = (input) => {
  return sum(input.split('\n').map((entry) => decodeEntry(entry)));
};

/**
 * Decodes a single entry from the input and determines the output value
 * @param {string} entry a single entry from the input
 * @returns {number} the decoded output value
 */
const decodeEntry = (entry) => {
  const [encoded, output] = entry.split(' | ');

  const entries = encoded.split(' ').reduce(
    (obj, value) => {
      const ordered = value.split('').sort().join('');
      if (value.length === 5) {
        obj[5].push(ordered);
      } else if (value.length === 6) {
        obj[6].push(ordered);
      } else {
        obj[value.length] = ordered;
      }
      return obj;
    },
    { 5: [], 6: [] },
  );

  const decryption = {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
  };

  let decrypted = '';

  // 1. a is determined by the letter in 7 (len3) and not 1 (len2)
  let regex = new RegExp(`[${entries[2]}]`, 'g');
  decryption.a = entries[3].replace(regex, '');
  decrypted += decryption.a;

  // 2. differentiate c & f by checking which one is in all three 6s (f) vs missing from one (c)
  if (entries[6].every((code) => code.includes(entries[2][0]))) {
    decryption.f = entries[2][0];
    decryption.c = entries[2][1];
  } else {
    decryption.c = entries[2][0];
    decryption.f = entries[2][1];
  }
  decrypted += decryption.c;
  decrypted += decryption.f;

  // 3. differentiate e & b by checking which 5 has c without f vs f without c (and the third has both)
  const three = entries[5].find((el) => el.includes(decryption.c) && el.includes(decryption.f));
  regex = new RegExp(`[${decryption.c}${decryption.f}]`, 'g');
  let inAll = three.replace(regex, '');
  const two = entries[5].find((el) => !el.includes(decryption.f));
  const five = entries[5].find((el) => !el.includes(decryption.c));
  decryption.e = two.split('').find((letter) => !inAll.includes(letter) && letter !== decryption.c);
  decryption.b = five
    .split('')
    .find((letter) => !inAll.includes(letter) && letter !== decryption.f);

  decrypted += decryption.b;
  decrypted += decryption.e;

  // 4. differentiate between d and g by checking which is in all three 6s (g)
  const removeDecrypted = entries[6].map((el) => {
    const regex = new RegExp(`[${decrypted}]`, 'g');
    return el.replace(regex, '');
  });

  decryption.g = removeDecrypted.find((el) => el.length === 1);
  decryption.d = removeDecrypted.find((el) => el.length === 2).replace(decryption.g, '');

  // --- We've cracked the code, now let's decode the output ---
  const NUMBERS = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
  };

  const reverseDecryption = reverseObject(decryption);

  return parseInt(
    output
      .split(' ')
      .map((encodedNumber) => {
        const translated = encodedNumber
          .split('')
          .map((enc) => reverseDecryption[enc])
          .sort()
          .join('');
        return NUMBERS[translated];
      })
      .join(''),
  );
};

const numbers = {
  1: 'cf',
  7: 'cfa',
  4: 'cfbd',

  2: 'adgce', // c + e
  3: 'adgcf', // cf
  5: 'adgbf', // f + b

  0: 'abcefg', // no d
  6: 'abdefg', // no c
  9: 'abcdfg', // no e

  8: 'abcdefg',
};

// -------------- DAY 9 --------------
// DAY 9 - PUZZLE 1
const lavaLowPoints = (input) => {
  let risk = 0;
  input.split('\n').forEach((row, i, grid) => {
    row.split('').forEach((value, j) => {
      if (
        (i === 0 || grid[i - 1][j] > value) &&
        (i === grid.length - 1 || grid[i + 1][j] > value) &&
        (j === 0 || grid[i][j - 1] > value) &&
        (j === row.length - 1 || grid[i][j + 1] > value)
      ) {
        risk += 1 + +value;
      }
    });
  });
  return risk;
};

// DAY 9 - PUZZLE 2
const lavaBasins = (input) => {
  const lowPoints = [];
  const grid = input.split(`\n`).map((row) => row.split('').map((el) => +el));
  const gridForDraw = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill('E'));

  const coords = (row, col) => `${row},${col}`;

  grid.forEach((row, i) => {
    row.forEach((value, j) => {
      if (
        (i === 0 || grid[i - 1][j] > value) &&
        (i === grid.length - 1 || grid[i + 1][j] > value) &&
        (j === 0 || grid[i][j - 1] > value) &&
        (j === row.length - 1 || grid[i][j + 1] > value)
      ) {
        lowPoints.push({ row: i, col: j, value, coords: coords(i, j) });
        gridForDraw[i][j] = 'L';
      }
      if (value === 9) {
        gridForDraw[i][j] = 'W';
      }
    });
  });

  let basins = [];
  let basinPoints = [];
  lowPoints.forEach((lowPoint) => {
    let points = [];
    let toCheck = [lowPoint];
    let i = 0;
    while (i < toCheck.length) {
      const { row, col, value } = toCheck[i];
      if (points.includes(coords(row, col))) {
        i++;
        continue;
      }
      const above =
        row > 0
          ? { row: row - 1, col, value: grid[row - 1][col], coords: coords(row - 1, col) }
          : null;
      const below =
        row < grid.length - 1
          ? { row: row + 1, col, value: grid[row + 1][col], coords: coords(row + 1, col) }
          : null;
      const left =
        col > 0
          ? { row, col: col - 1, value: grid[row][col - 1], coords: coords(row, col - 1) }
          : null;
      const right =
        col < grid[0].length - 1
          ? { row, col: col + 1, value: grid[row][col + 1], coords: coords(row, col + 1) }
          : null;

      if (
        (!above || above.value >= value || points.includes(above.coords)) &&
        (!below || below.value >= value || points.includes(below.coords)) &&
        (!left || left.value >= value || points.includes(left.coords)) &&
        (!right || right.value >= value || points.includes(right.coords))
      ) {
        // This point is part of the basin. Add it to points if it's not there already
        points.push(coords(row, col));
        if (gridForDraw[row][col] !== 'L') gridForDraw[row][col] = 'B';

        // Add all the adjacent locations to the check queue if they exist, aren't already in points, and aren't 9
        if (above && above.value !== 9 && !points.includes(above.coords)) {
          toCheck.push(above);
        }
        if (below && below.value !== 9 && !points.includes(below.coords)) {
          toCheck.push(below);
        }
        if (left && left.value !== 9 && !points.includes(left.coords)) {
          toCheck.push(left);
        }
        if (right && right.value !== 9 && !points.includes(right.coords)) {
          toCheck.push(right);
        }
      }
      i++;
    }
    basins.push(points.length);
    basinPoints = basinPoints.concat(points);
  });
  basins.sort((a, b) => b - a);
  drawBasins(grid, gridForDraw);
  return basins[0] * basins[1] * basins[2];
};

const drawBasins = (numberGrid, markedGrid) => {
  const imageDiv = document.getElementById('day9visualization');
  imageDiv.style.visibility = 'visible';
  imageDiv.innerHTML = '';
  markedGrid.forEach((row, whichRow) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('day9row');
    row.forEach((cell, whichCol) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('day9cell');
      cellDiv.textContent = numberGrid[whichRow][whichCol];
      if (cell === 'L') {
        cellDiv.classList.add('red');
      } else if (cell === 'W') {
        cellDiv.classList.add('black');
      } else if (cell === 'B') {
        cellDiv.classList.add('yellow');
      }
      rowDiv.appendChild(cellDiv);
    });
    imageDiv.appendChild(rowDiv);
  });
  imageDiv.style.visibility = 'visible';
};

// -------------- DAY 10 --------------
// DAY 10 - PUZZLE 1
const countCorrupted = (input) => {
  const scores = input.split('\n').map((line) => {
    let open = '';

    for (const char of line.split('')) {
      switch (char) {
        case ')': {
          if (open.at(-1) !== '(') {
            return 3;
          } else {
            open = open.slice(0, -1);
            break;
          }
        }
        case ']': {
          if (open.at(-1) !== '[') {
            return 57;
          } else {
            open = open.slice(0, -1);
            break;
          }
        }
        case '}': {
          if (open.at(-1) !== '{') {
            return 1197;
          } else {
            open = open.slice(0, -1);
            break;
          }
        }
        case '>': {
          if (open.at(-1) !== '<') {
            return 25137;
          } else {
            open = open.slice(0, -1);
            break;
          }
        }
        case '(':
        case '{':
        case '[':
        case '<':
          open += char;
      }
    }
    return 0;
  });

  console.log(scores);
  return sum(scores);
};

// DAY 10 - PUZZLE 2
const fixIncomplete = (input) => {
  const closings = input
    .split('\n')
    .filter((line) => {
      let open = '';

      for (const char of line.split('')) {
        switch (char) {
          case ')': {
            if (open.at(-1) !== '(') {
              return false;
            } else {
              open = open.slice(0, -1);
              break;
            }
          }
          case ']': {
            if (open.at(-1) !== '[') {
              return false;
            } else {
              open = open.slice(0, -1);
              break;
            }
          }
          case '}': {
            if (open.at(-1) !== '{') {
              return false;
            } else {
              open = open.slice(0, -1);
              break;
            }
          }
          case '>': {
            if (open.at(-1) !== '<') {
              return false;
            } else {
              open = open.slice(0, -1);
              break;
            }
          }
          case '(':
          case '{':
          case '[':
          case '<':
            open += char;
        }
      }
      return true;
    })
    .map((line) => {
      let open = '';

      for (const char of line.split('')) {
        switch (char) {
          case ')':
          case ']':
          case '}':
          case '>':
            open = open.slice(0, -1);
            break;
          case '(':
          case '{':
          case '[':
          case '<':
            open += char;
            break;
        }
      }

      let score = 0;

      open
        .split('')
        .reverse()
        .forEach((char) => {
          score *= 5;
          switch (char) {
            case '(':
              score += 1;
              break;
            case '[':
              score += 2;
              break;
            case '{':
              score += 3;
              break;
            case '<':
              score += 4;
              break;
          }
        });
      return score;
    });

  return closings.sort((a, b) => b - a)[Math.floor(closings.length / 2)];
};

// -------------- DAY 11 --------------
// Day 11 - Puzzle 1
const countFlashes = (input, steps = 100) => {
  const grid = input.split('\n').map((row) => row.split('').map((el) => +el));
  let numFlashes = 0;

  for (let step = 0; step < steps; step++) {
    flashed = new Set();

    const increment = (row, col) => {
      if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
        return;
      }

      grid[row][col]++;

      if (grid[row][col] > 9) {
        flashed.add(`${row},${col}`);
      }
    };

    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        increment(r, c);
      });
    });

    flashed.forEach((coords) => {
      const [r, c] = coords.split(',').map((el) => +el);

      increment(r - 1, c - 1);
      increment(r - 1, c);
      increment(r - 1, c + 1);
      increment(r, c - 1);
      increment(r, c + 1);
      increment(r + 1, c - 1);
      increment(r + 1, c);
      increment(r + 1, c + 1);
    });

    flashed.forEach((coords) => {
      const [r, c] = coords.split(',').map((el) => +el);
      grid[r][c] = 0;
    });

    numFlashes += flashed.size;
    if (step % 10 === 0) {
      console.log({ step, numFlashes });
    }
  }
  return numFlashes;
};

// Day 11 - Puzzle 2
const flashConvergence = (input) => {
  const grid = input.split('\n').map((row) => row.split('').map((el) => +el));
  const numCells = grid.length * grid[0].length;

  let step = 1;
  while (true) {
    flashed = new Set();

    const increment = (row, col) => {
      if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
        return;
      }

      grid[row][col]++;

      if (grid[row][col] > 9) {
        flashed.add(`${row},${col}`);
      }
    };

    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        increment(r, c);
      });
    });

    flashed.forEach((coords) => {
      const [r, c] = coords.split(',').map((el) => +el);

      increment(r - 1, c - 1);
      increment(r - 1, c);
      increment(r - 1, c + 1);
      increment(r, c - 1);
      increment(r, c + 1);
      increment(r + 1, c - 1);
      increment(r + 1, c);
      increment(r + 1, c + 1);
    });

    flashed.forEach((coords) => {
      const [r, c] = coords.split(',').map((el) => +el);
      grid[r][c] = 0;
    });

    if (flashed.size === numCells) {
      return step;
    }

    step++;
  }
};

// -------------- DAY 12 --------------
const countCavePaths = (input) => {
  const graph = new Graph();
  input.split('\n').forEach((edge) => {
    const [node1, node2] = edge.split('-');
    graph.addEdge(node1, node2);
  });

  let completePaths = new Set();
  let openPaths = [new GraphPath([graph.start])];

  while (openPaths.length) {
    openPaths = openPaths.flatMap((p) => {
      let newPaths = [];

      for (const neighbor of p.last.neighbors) {
        if (p.canAddNode(neighbor)) {
          const path = new GraphPath([...p.path, neighbor]);
          if (neighbor.isEnd) {
            completePaths.add(path.toString());
          } else if (!path.isDeadEnd()) {
            newPaths.push(path);
          }
        }
      }
      return newPaths;
    });
  }

  console.log(completePaths);
  return completePaths.size;
};

const countCavePaths2 = (input) => {
  const graph = new Graph();
  input.split('\n').forEach((edge) => {
    const [node1, node2] = edge.split('-');
    graph.addEdge(node1, node2);
  });

  let completePaths = new Set();
  let openPaths = [new GraphPath2([graph.start])];

  while (openPaths.length) {
    openPaths = openPaths.flatMap((p) => {
      let newPaths = [];

      for (const neighbor of p.last.neighbors) {
        if (p.canAddNode(neighbor)) {
          const path = p.newWithAddedNode(neighbor);
          if (neighbor.isEnd) {
            completePaths.add(path.toString());
          } else if (!path.isDeadEnd()) {
            newPaths.push(path);
          }
        }
      }
      return newPaths;
    });
  }

  console.log(completePaths);
  return completePaths.size;
};

// -------------- DAY 13 --------------

const singleFold = (input) => {
  const [stars, folds] = input.split('\n\n');
  let starCoords = new Set(stars.split('\n'));
  const [dir, amt] = folds
    .split('\n')[0]
    .split('=')
    .map((el, i) => {
      if (i === 0) {
        return el.at(-1);
      } else {
        return +el;
      }
    });

  let folded = new Set();
  starCoords.forEach((coord) => {
    const [x, y] = coord.split(',').map((el) => +el);
    if (dir === 'x') {
      if (x < amt) {
        folded.add(coord);
      } else {
        folded.add(`${2 * amt - x},${y}`);
      }
    } else {
      if (y < amt) {
        folded.add(coord);
      } else {
        folded.add(`${x},${2 * amt - y}`);
      }
    }
  });

  console.log(folded);
  return folded.size;
};

const foldForCode = (input) => {
  const [stars, folds] = input.split('\n\n');
  let starCoords = new Set(stars.split('\n'));

  folds.split('\n').forEach((fold) => {
    const [dir, amt] = fold.split('=').map((el, i) => {
      if (i === 0) {
        return el.at(-1);
      } else {
        return +el;
      }
    });
    let folded = new Set();
    starCoords.forEach((coord) => {
      const [x, y] = coord.split(',').map((el) => +el);
      if (dir === 'x') {
        if (x < amt) {
          folded.add(coord);
        } else {
          folded.add(`${2 * amt - x},${y}`);
        }
      } else {
        if (y < amt) {
          folded.add(coord);
        } else {
          folded.add(`${x},${2 * amt - y}`);
        }
      }
    });
    starCoords = folded;
  });

  drawFoldedGrid(starCoords);
  return 'See visualization';
};

/**
 * Draws the coordinates to the screen
 * @param {Set} coords Set of coords of the form "x,y"
 */
const drawFoldedGrid = (coords) => {
  const imageDiv = document.getElementById('day13visualization');
  imageDiv.style.visibility = 'visible';
  imageDiv.innerHTML = '';

  let maxX = 0;
  let maxY = 0;
  coords.forEach((coord) => {
    const [x, y] = coord.split(',').map((el) => +el);
    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
  });

  const grid = Array(maxY + 1)
    .fill(null)
    .map(() => Array(maxX + 1).fill('white'));
  coords.forEach((coord) => {
    const [x, y] = coord.split(',').map((el) => +el);
    grid[y][x] = 'black';
  });

  grid.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('day13row');
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('day13cell');
      if (cell === 'black') {
        cellDiv.classList.add('black');
      }
      rowDiv.appendChild(cellDiv);
    });
    imageDiv.appendChild(rowDiv);
  });
  imageDiv.style.visibility = 'visible';
};

// -------------- DAY 14 --------------
const polymerPairInsertion = (input, steps = 10) => {
  const [start, , ...rulesRaw] = input.split('\n');
  const rules = {};
  rulesRaw.forEach((rule) => {
    const [key, val] = rule.split(' -> ');
    rules[key] = val;
  });

  let polymer = start;
  let frequency = {};
  for (let step = 0; step < steps; step++) {
    let nextRound = '';
    frequency = {};

    for (let i = 0; i < polymer.length - 1; i++) {
      const key = polymer.slice(i, i + 2);
      const toAdd = rules[key];
      nextRound += polymer[i];
      nextRound += toAdd;

      frequency[polymer[i]] ? frequency[polymer[i]]++ : (frequency[polymer[i]] = 1);
      frequency[toAdd] ? frequency[toAdd]++ : (frequency[toAdd] = 1);
    }

    nextRound += polymer.at(-1);
    frequency[polymer.at(-1)] ? frequency[polymer.at(-1)]++ : (frequency[polymer.at(-1)] = 1);

    polymer = nextRound;
  }

  const sortedFreq = Object.values(frequency).sort((a, b) => a - b);
  return sortedFreq.at(-1) - sortedFreq[0];
};

// -------------- TODO - Better algorithm for DAY 14 for part 2 --------------

// -------------- DAY 15 --------------

// -------------- DAY 16 --------------
// Day 16 - Puzzle 1
const processPacketVersions = (input) => {
  const binaryString = input
    .split('')
    .map((hexDigit) => parseInt(hexDigit, 16).toString(2).padStart(4, '0'))
    .join('');

  const versionList = [];

  const parsePacket = (packet) => {
    const version = parseInt(packet.slice(0, 3), 2);
    const op = parseInt(packet.slice(3, 6), 2);
    const lengthId = op === 4 ? null : packet[6];
    const type =
      op === 4
        ? 'literalNum'
        : lengthId === '0'
        ? 'totalLengthBits'
        : lengthId === '1'
        ? 'numSubPackets'
        : 'done';
    const totalLengthBits = type === 'totalLengthBits' ? parseInt(packet.slice(7, 22), 2) : null;
    const numSubPackets = type === 'numSubPackets' ? parseInt(packet.slice(7, 18), 2) : null;
    const rest =
      type === 'literalNum'
        ? packet.slice(6)
        : type === 'totalLengthBits'
        ? packet.slice(22)
        : packet.slice(18);
    return {
      version,
      type,
      totalLengthBits,
      numSubPackets,
      rest,
    };
  };

  const calculatePacket = (packet) => {
    if (!packet) {
      return;
    }
    const { version, type, totalLengthBits, numSubPackets, rest } = parsePacket(packet);

    versionList.push(version);

    switch (type) {
      case 'literalNum':
        const { value, remainder } = parseLiteralNumber(rest);
        return { version, value, remainder };
      case 'totalLengthBits':
        const sub = getSubpacketsByLength(rest.slice(0, totalLengthBits));

        return {
          version,
          subpackets: sub,
          remainder: packet.slice(totalLengthBits + 22),
        };
      case 'numSubPackets':
        const { subpackets, remainder: rem } = getSubpacketsByNumber(rest, numSubPackets);
        return {
          version,
          subpackets: subpackets,
          remainder: rem,
        };
    }
  };

  const parseLiteralNumber = (packetNumber) => {
    let binaryString = '';
    let toParse = packetNumber.slice(0, 5);
    let remainder = packetNumber.slice(5);
    binaryString += toParse.slice(1);
    while (toParse.startsWith('1')) {
      toParse = remainder.slice(0, 5);
      remainder = remainder.slice(5);
      binaryString += toParse.slice(1);
    }

    const value = parseInt(binaryString, 2);
    return {
      value,
      remainder,
    };
  };

  // We don't know how many subpackets there are,
  // but we should parse the full length of @packets
  const getSubpacketsByLength = (packets) => {
    const subpackets = [];
    let parsed = calculatePacket(packets);

    do {
      subpackets.push(parsed);
      parsed = calculatePacket(parsed.remainder);
    } while (parsed && parsed.remainder.includes('1'));

    return subpackets;
  };

  // We know how many subpackets are in @packets
  // We don't know how many chars are part of it
  // Need to return the rest for the next round of parsing
  const getSubpacketsByNumber = (packets, num) => {
    const subpackets = [];
    let toParse = packets;

    for (let i = 0; i < num; i++) {
      const parsed = calculatePacket(toParse);
      subpackets.push(parsed);
      toParse = parsed.remainder;
    }
    return { subpackets, remainder: toParse };
  };

  calculatePacket(binaryString);
  return sum(versionList);
};

// Day 16 - Puzzle 2
const processPackets = (input) => {
  const parsePacket = (packet) => {
    const version = parseInt(packet.slice(0, 3), 2);
    const op = parseInt(packet.slice(3, 6), 2);
    const lengthId = op === 4 ? null : packet[6];
    const type =
      op === 4
        ? 'literalNum'
        : lengthId === '0'
        ? 'totalLengthBits'
        : lengthId === '1'
        ? 'numSubPackets'
        : 'done';
    const totalLengthBits = type === 'totalLengthBits' ? parseInt(packet.slice(7, 22), 2) : null;
    const numSubPackets = type === 'numSubPackets' ? parseInt(packet.slice(7, 18), 2) : null;
    const rest =
      type === 'literalNum'
        ? packet.slice(6)
        : type === 'totalLengthBits'
        ? packet.slice(22)
        : packet.slice(18);
    return {
      version,
      op,
      type,
      totalLengthBits,
      numSubPackets,
      rest,
    };
  };

  const calculatePacket = (packet) => {
    if (!packet) {
      return;
    }
    const { op, type, totalLengthBits, numSubPackets, rest } = parsePacket(packet);

    switch (type) {
      case 'literalNum':
        const { value, remainder } = parseLiteralNumber(rest);
        return { value, op, remainder };
      case 'totalLengthBits':
        const sub = getSubpacketsByLength(rest.slice(0, totalLengthBits));
        parsedPackets = {
          op,
          subpackets: sub,
          type: 'length',
        };
        return {
          op,
          subpackets: sub,
          remainder: packet.slice(totalLengthBits + 22),
        };
      case 'numSubPackets':
        const { subpackets, remainder: rem } = getSubpacketsByNumber(rest, numSubPackets);
        parsedPackets = {
          op,
          subpackets,
          type: 'num',
        };
        return {
          op,
          subpackets,
          remainder: rem,
        };
    }
  };

  const parseLiteralNumber = (packetNumber) => {
    let binaryString = '';
    let toParse = packetNumber.slice(0, 5);
    let remainder = packetNumber.slice(5);
    binaryString += toParse.slice(1);
    while (toParse.startsWith('1')) {
      toParse = remainder.slice(0, 5);
      remainder = remainder.slice(5);
      binaryString += toParse.slice(1);
    }

    const value = parseInt(binaryString, 2);
    return {
      value,
      remainder,
    };
  };

  // We don't know how many subpackets there are,
  // but we should parse the full length of @packets
  const getSubpacketsByLength = (packets) => {
    const subpackets = [];
    let parsed = calculatePacket(packets);
    subpackets.push(parsed);

    do {
      parsed = calculatePacket(parsed.remainder);
      if (parsed) {
        subpackets.push(parsed);
      }
    } while (parsed && parsed.remainder.includes('1'));

    return subpackets;
  };

  // We know how many subpackets are in @packets
  // We don't know how many chars are part of it
  // Need to return the rest for the next round of parsing
  const getSubpacketsByNumber = (packets, num) => {
    const subpackets = [];
    let toParse = packets;

    for (let i = 0; i < num; i++) {
      const parsed = calculatePacket(toParse);
      subpackets.push(parsed);
      toParse = parsed.remainder;
    }
    return { subpackets, remainder: toParse };
  };

  // HERE IS WHERE THIS FUNCTION ACTUALLY STARTS
  const binaryString = input
    .split('')
    .map((hexDigit) => parseInt(hexDigit, 16).toString(2).padStart(4, '0'))
    .join('');

  let parsedPackets = {};
  calculatePacket(binaryString);
  return evaluatePacket(parsedPackets);
};

const evaluatePacket = (packet) => {
  while (packet.value == undefined) {
    packet = evaluateSubpackets(packet);
  }

  return packet.value;
};

const evaluateSubpackets = (packet) => {
  if (!packet) {
    return;
  }

  if (packet.value != undefined) {
    return packet;
  }

  if (packet.subpackets.every((sub) => sub.value != undefined)) {
    const values = packet.subpackets.map(({ value }) => value);
    let value = 0;
    switch (packet.op) {
      // SUM
      case 0:
        value = sum(values);
        break;
      // PRODUCT
      case 1:
        value = values.reduce((prev, cur) => prev * cur, 1);
        break;

      // MINIMUM
      case 2:
        value = Math.min(...values);
        break;

      // MAXIMUM
      case 3:
        value = Math.max(...values);
        break;

      case 4:
        value = values[0];
        break;

      // GREATER THAN
      case 5:
        value = values[0] > values[1] ? 1 : 0;
        break;

      // LESS THAN
      case 6:
        value = values[0] < values[1] ? 1 : 0;
        break;

      // EQUAL TO
      case 7:
        value = values[0] === values[1] ? 1 : 0;
        break;

      default:
        console.log('bad op', op);
    }
    return { op: 4, value };
  } else {
    packet.subpackets = packet.subpackets.map((sub) => evaluateSubpackets(sub));
    return packet;
  }
};

// -------------- DAY 17 --------------
// If the y range is negative, the best initial y is |minY| - 1
// because you'd go (1+2+...+minY-1) - (1+2+...+minY-1) = 0
// then 0 - minY = the bottom of the range
// As long as maxHeight is greater then minX, it will have been possible
// to 0 out the x velocity long before we hit the maxHeight and will
// land somewhere in the bottom row of the target area
// This fact is true for the example and my input, so it works for this puzzle
const trickShot = (input) => {
  const [, , xRaw, yRaw] = input.split(' ');
  const [xMin, xMax] = xRaw
    .slice(2, -1)
    .split('..')
    .map((el) => +el);
  const [yMin, yMax] = yRaw
    .slice(2)
    .split('..')
    .map((el) => +el);

  if (yMin < 0) {
    const bestY = Math.abs(yMin) - 1;
    const maxHeight = (bestY * (bestY + 1)) / 2;
    if (maxHeight > xMin) {
      return maxHeight;
    }
  }

  return 'Need a different alg';
};

// Day 17 - Puzzle 2
const initialVelocities = (input) => {
  const [, , xRaw, yRaw] = input.split(' ');
  const [xMin, xMax] = xRaw
    .slice(2, -1)
    .split('..')
    .map((el) => +el);

  let x = {};
  let val = xMax;
  const pyramids = findPyramids(xMin, xMax);
  x.pyramids = pyramids;
  while (val >= pyramids[0]) {
    let sum = val;
    for (let i = 1; i <= val && sum <= xMax; i++) {
      if (xMin <= sum && sum <= xMax) {
        if (x[i]) {
          x[i].push(val);
        } else {
          x[i] = [val];
        }
      }
      sum += val - i;
    }
    val--;
  }

  pyramids.forEach((p) => {
    pyramids.forEach((p2) => {
      if (!x[p].includes(p2)) {
        x[p].push(p2);
      }
    });
  });
  x.pastPyramids = Math.max(...pyramids) + 1;

  const [yMin, yMax] = yRaw
    .slice(2)
    .split('..')
    .map((el) => +el);

  let y = {};
  for (let val = yMin; val < Math.abs(yMin); val++) {
    let sum = val;
    let i = 1;
    y[val] = [];
    while (sum >= yMin) {
      if (yMin <= sum && sum <= yMax) {
        y[val].push(i);
      }
      sum += val - i;
      i++;
    }
  }

  let pairs = 0;
  Object.values(y).forEach((len) => {
    let lengthSet = new Set();
    len.forEach((l) => {
      if (x[l]) {
        lengthSet = new Set([...lengthSet, ...x[l]]);
      } else if (l >= x.pastPyramids) {
        lengthSet = new Set([...lengthSet, ...x.pyramids]);
      }
    });
    pairs += lengthSet.size;
  });

  return pairs;
};

// Returns an array of numbers whose pyramid sum (1+2+...+n)
// falls between min and max, inclusive
const findPyramids = (min, max) => {
  let pyramids = [];
  let sum = 0;
  let n = 1;
  while (sum <= max) {
    sum += n;
    if (min <= sum && sum <= max) {
      pyramids.push(n);
    }
    n++;
  }
  return pyramids;
};

// -------------- DAY 18 --------------
const snailAddition = (input) => {
  const [first, ...rest] = input.split('\n');
  let sum = first;
  rest.forEach((nextNum) => {
    const added = addSnailNums(sum, nextNum);
    sum = reduceSnailNum(added);
  });
  console.log(sum);
  return getSnailMagnitude(sum);
};

const addSnailNums = (num1, num2) => `[${num1},${num2}]`;

const reduceSnailNum = (snailNum) => {
  let reduced = snailNum;
  while (true) {
    const pair = findExplodingPair(reduced);
    if (pair) {
      reduced = explodePair(reduced, pair);
      continue;
    }
    const double = findDoubleDigit(reduced);
    if (double) {
      reduced = splitDoubleDigit(reduced, double);
      continue;
    }
    return reduced;
  }
};

const findExplodingPair = (snailNum) => {
  let openParens = 0;
  let i = 0;
  while (i < snailNum.length && openParens < 5) {
    if (snailNum[i] === '[') {
      openParens++;
    } else if (snailNum[i] === ']') {
      openParens--;
    }
    i++;
  }
  if (openParens === 5) {
    const endIndex = snailNum.indexOf(']', i);
    const pair = snailNum.slice(i, endIndex);
    const [left, right] = pair.split(',');
    return {
      startIndex: i - 1,
      endIndex,
      left: +left,
      right: +right,
      pair: `[${pair}]`,
    };
  }
  return null;
};

const explodePair = (snailNum, explodingPair) => {
  let before = snailNum.slice(0, explodingPair.startIndex);
  let after = snailNum.slice(explodingPair.endIndex + 1);
  const leftNums = before.match(/[0-9]+/g);
  const rightNums = after.match(/[0-9]+/g);
  if (rightNums) {
    const first = rightNums[0];
    const newFirst = +first + explodingPair.right;
    const firstIndex = after.indexOf(first);
    after = `${after.slice(0, firstIndex)}${newFirst}${after.slice(firstIndex + first.length)}`;
  }
  if (leftNums) {
    const last = leftNums.at(-1);
    const newLast = +last + explodingPair.left;
    const lastIndex = before.lastIndexOf(last);
    before = `${before.slice(0, lastIndex)}${newLast}${before.slice(lastIndex + last.length)}`;
  }
  return `${before}0${after}`;
};

const findDoubleDigit = (snailNum) => {
  const match = snailNum.match(/\d\d/);
  if (match) {
    return {
      value: +match[0],
      index: match.index,
    };
  }
  return null;
};

const splitDoubleDigit = (snailNum, data) => {
  const replacement = `[${Math.floor(data.value / 2)},${Math.ceil(data.value / 2)}]`;
  return snailNum.slice(0, data.index) + replacement + snailNum.slice(data.index + 2);
};

const getSnailMagnitude = (snailNum) => {
  const SIMPLE_PAIR_REGEX = /\[(?<left>\d+),(?<right>\d+)\]/;
  let reduced = snailNum;
  while (true) {
    const match = reduced.match(SIMPLE_PAIR_REGEX);
    if (!match) {
      console.log('no match found', reduced);
      return reduced;
    }
    const magnitude = +match.groups.left * 3 + +match.groups.right * 2;
    if (match[0] === reduced) {
      return magnitude;
    } else {
      reduced = reduced.replace(match[0], magnitude);
    }
  }
};

// Day 18 - Puzzle 2
const findLargestSnailSum = (input) => {
  const snails = input.split('\n');
  let maxMagnitude = 0;
  for (const first of snails) {
    for (const second of snails) {
      if (first === second) {
        continue;
      }
      const mag = getSnailMagnitude(reduceSnailNum(addSnailNums(first, second)));
      if (mag > maxMagnitude) {
        maxMagnitude = mag;
      }
    }
  }
  return maxMagnitude;
};

// -------------- DAY 19 --------------

// -------------- DAY 20 --------------
const imageEnhancement = (input, steps = 2) => {
  let [algorithm, image] = input.split('\n\n');

  algorithm = algorithm.replace(/\./g, '0').replace(/#/g, '1');
  image = image
    .replace(/\./g, '0')
    .replace(/#/g, '1')
    .split('\n')
    .map((row) => row.split(''));

  const getValue = (array2D, row, col, fallback) => {
    if (row < 0 || row >= array2D.length || col < 0 || col >= array2D[0].length) {
      return fallback;
    } else {
      return array2D[row][col];
    }
  };

  for (let step = 0; step < steps; step++) {
    // Since algorithm[0] = 1 and algorithm[511] = 0,
    // we have to alternate the fallback value (infinite border) on each step
    const fallback = step % 2 ? '1' : '0';
    const width = image[0].length + 2;
    const height = image.length + 2;
    const nextImage = create2DArray(width, height, fallback);
    const paddedImage = image.map((row) => [fallback].concat(row, [fallback]));
    paddedImage.unshift(Array(width).fill(fallback));
    paddedImage.push(Array(width).fill(fallback));

    for (let r = 0; r < paddedImage.length; r++) {
      for (let c = 0; c < paddedImage[r].length; c++) {
        const binary =
          getValue(paddedImage, r - 1, c - 1, fallback) +
          getValue(paddedImage, r - 1, c, fallback) +
          getValue(paddedImage, r - 1, c + 1, fallback) +
          getValue(paddedImage, r, c - 1, fallback) +
          getValue(paddedImage, r, c, fallback) +
          getValue(paddedImage, r, c + 1, fallback) +
          getValue(paddedImage, r + 1, c - 1, fallback) +
          getValue(paddedImage, r + 1, c, fallback) +
          getValue(paddedImage, r + 1, c + 1, fallback);

        const base10 = parseInt(binary, 2);
        nextImage[r][c] = algorithm[base10];
      }
    }
    image = [...nextImage];
  }

  return numOccurrences(image, '1');
};

// -------------- DAY 21 --------------
const deterministicDice = (input) => {
  let [p1Loc, p2Loc] = input.split('\n').map((line) => +line.split(': ')[1]);
  let p1Score = 0;
  let p2Score = 0;
  let die = 2;
  let numRolls = 0;
  let whoseTurn = 1;

  while (p1Score < 1000 && p2Score < 1000) {
    if (whoseTurn === 1) {
      p1Loc += die * 3;
      p1Loc = p1Loc % 10 || 10; // A number 1-10, wraps around
      p1Score += p1Loc;
      whoseTurn = 2;
    } else {
      p2Loc += die * 3;
      p2Loc = p2Loc % 10 || 10; // A number 1-10, wraps around
      p2Score += p2Loc;
      whoseTurn = 1;
    }
    die += 3;
    die = die % 100 || 100; // A number 1-100, wraps around
    numRolls += 3;
  }

  console.log({ die, numRolls, p1Score, p2Score });

  return p1Score < 1000 ? p1Score * numRolls : p2Score * numRolls;
};

// ------- TODO - DAY 21 Puzzle 2 --------

// -------------- DAY 22 --------------
const rebootReactor = (input) => {
  const steps = input.split('\n').map((line) => {
    const [dir, rest] = line.split(' ');
    const value = dir === 'on' ? 1 : 0;
    const [x, y, z] = rest.split(',').map((el) =>
      el
        .replace(/[xyz]=/, '')
        .split('..')
        .map((el) => +el),
    );
    return { value, x, y, z };
  });

  // [-50...50];
  const INDEXES = Array(101)
    .fill(-50)
    .map((el, i) => el + i);

  const reactor = {};
  INDEXES.forEach((x) => {
    reactor[x] = {};
    INDEXES.forEach((y) => {
      reactor[x][y] = {};
      INDEXES.forEach((z) => {
        reactor[x][y][z] = 0;
      });
    });
  });

  let lightsOn = 0;

  steps.forEach((step) => {
    const startX = step.x[0] < -50 ? -50 : step.x[0];
    const endX = step.x[1] > 50 ? 50 : step.x[1];
    const startY = step.y[0] < -50 ? -50 : step.y[0];
    const endY = step.y[1] > 50 ? 50 : step.y[1];
    const startZ = step.z[0] < -50 ? -50 : step.z[0];
    const endZ = step.z[1] > 50 ? 50 : step.z[1];

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        for (let z = startZ; z <= endZ; z++) {
          if (step.value === 0 && reactor[x][y][z] === 1) {
            reactor[x][y][z] = 0;
            lightsOn--;
          } else if (step.value === 1 && reactor[x][y][z] === 0) {
            reactor[x][y][z] = 1;
            lightsOn++;
          }
        }
      }
    }
  });

  return lightsOn;
};

// -------------- DAY 23 --------------

// -------------- DAY 24 --------------

// -------------- DAY 25 --------------
const seaCucumberMoves = (input) => {
  let east = new Set();
  let south = new Set();
  input.split('\n').forEach((row, r) => {
    row.split('').forEach((cell, c) => {
      const coords = `${r},${c}`;
      if (cell === '>') {
        east.add(coords);
      } else if (cell === 'v') {
        south.add(coords);
      }
    });
  });

  const bounds = {
    r: input.split('\n').length - 1,
    c: input.split('\n')[0].length - 1,
  };

  let moves = 1;
  let step = 0;
  while (moves > 0) {
    moves = 0;
    step++;
    let eastMoved = new Set();
    let southMoved = new Set();
    east.forEach((orig) => {
      const [r, c] = orig.split(',').map((el) => +el);
      const moved = c === bounds.c ? `${r},0` : `${r},${c + 1}`;
      if (east.has(moved) || south.has(moved)) {
        eastMoved.add(orig);
      } else {
        eastMoved.add(moved);
        moves++;
      }
    });
    south.forEach((orig) => {
      const [r, c] = orig.split(',').map((el) => +el);
      const moved = r === bounds.r ? `0,${c}` : `${r + 1},${c}`;
      if (eastMoved.has(moved) || south.has(moved)) {
        southMoved.add(orig);
      } else {
        southMoved.add(moved);
        moves++;
      }
    });
    east = new Set(eastMoved);
    south = new Set(southMoved);
  }
  return step;
};
