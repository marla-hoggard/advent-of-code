// ---------- DAY 1 ----------- //

const callibration = (input) => {
  let sum = 0;
  input.split('\n').forEach((line) => {
    const digits = line.match(/\d/g);
    const num = digits[0] + digits.at(-1);
    sum += +num;
  });

  return sum;
};

const toNum = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
};

// This was my first successful solution
const callibration2orig = (input) => {
  let sum = 0;

  const regex = /\d|one|two|three|four|five|six|seven|eight|nine/;

  input.split('\n').forEach((line) => {
    let match = line.match(regex);
    const first = match[0];
    let last = first;
    let i = match.index + 1;

    // Find the last match
    // Need a loop to account for overlapping matches, like "twone"
    // that would otherwise be skipped
    while (match && i < line.length) {
      match = line.slice(i).match(regex);
      if (match) {
        last = match[0];
        i = match.index + i + 1;
      }
    }

    const pair = `${toNum[first]}${toNum[last]}`;
    sum += Number(pair);
  });

  return sum;
};

// This was my second solution
// Cleaner code, but more complicated regex
const callibration2 = (input) => {
  let sum = 0;

  const pattern = '\\d|one|two|three|four|five|six|seven|eight|nine';
  const firstRegex = new RegExp(pattern);
  // Finds the last occurrence of the pattern by searching for the pattern (optionally)
  // then anything then the pattern again. It's greedy so it will return the longest-such pattern,
  // aka the pattern that spans the first to the last occurrences. And captures the last in groups.last.
  // Note: If the whole sting is overlapping, like "twone" this will successfully capture "one" as last
  // but NOT "two" as the first match, so we should always do a regular first match separately
  const lastRegex = new RegExp(`(?:${pattern})?.*(?<last>${pattern})`);

  input.split('\n').forEach((line) => {
    const firstMatch = line.match(firstRegex);
    const lastMatch = line.match(lastRegex);

    const first = toNum[firstMatch[0]];
    const last = lastMatch ? toNum[lastMatch.groups.last] : first;

    const pair = `${first}${last}`;

    sum += Number(pair);
  });

  return sum;
};

// ---------- DAY 2 ----------- //
const possibleGames = (input) => {
  let sum = 0;
  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };

  input.split('\n').forEach((game) => {
    const [title, pulls] = game.split(': ');
    const gameId = +title.split(' ')[1];

    let isPossible = true;

    for (const draw of pulls.split(/[,;]\s/)) {
      const [count, color] = draw.split(' ');
      if (count > max[color]) {
        isPossible = false;
        break;
      }
    }

    if (isPossible) {
      sum += gameId;
    }
  });

  return sum;
};

const cubePowers = (input) => {
  let sum = 0;

  input.split('\n').forEach((game) => {
    pulls = game.split(': ')[1];

    const colorMax = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const draw of pulls.split(/[,;]\s/)) {
      const [count, color] = draw.split(' ');
      if (count > colorMax[color]) {
        colorMax[color] = +count;
      }
    }

    const power = colorMax.red * colorMax.green * colorMax.blue;
    sum += power;
  });

  return sum;
};

// ----------- DAY 3 ---------- //
const partNumbers = (input) => {
  const partNumRegex = /\d+/g;
  const symbolRegex = /[^.1-9]/;

  let sum = 0;

  input.split('\n').forEach((row, whichRow, rows) => {
    const matches = [...row.matchAll(partNumRegex)];
    for (const match of matches) {
      const value = +match[0];
      const startLoc = match.index - 1;
      const endLoc = match.index + match[0].length;

      if (whichRow !== 0) {
        const adjBefore = rows[whichRow - 1].substring(startLoc, endLoc + 1);
        if (symbolRegex.test(adjBefore)) {
          sum += value;
          continue;
        }
      }

      if (whichRow !== rows.length - 1) {
        const adjAfter = rows[whichRow + 1].substring(startLoc, endLoc + 1);
        if (symbolRegex.test(adjAfter)) {
          sum += value;
          continue;
        }
      }

      if (startLoc !== -1) {
        if (symbolRegex.test(row[startLoc])) {
          sum += value;
          continue;
        }
      }

      if (endLoc !== row.length) {
        if (symbolRegex.test(row[endLoc])) {
          sum += value;
          continue;
        }
      }
    }
  });

  return sum;
};

const gearRatios = (input) => {
  const isNumber = (char) => /\d/.test(char);

  const processNumLeft = (rowToProcess, index) => {
    if (index >= 0 && isNumber(rowToProcess[index - 1])) {
      let loc = index - 1;
      let cur = rowToProcess[loc];
      let val = '';
      while (loc >= 0 && isNumber(cur)) {
        val = `${cur}${val}`;
        loc--;
        cur = rowToProcess[loc];
      }

      return val;
    } else {
      return '';
    }
  };

  const processNumRight = (rowToProcess, index) => {
    if (index < rowToProcess.length && isNumber(rowToProcess[index + 1])) {
      let loc = index + 1;
      let cur = rowToProcess[loc];
      let val = '';
      while (loc < rowToProcess.length && isNumber(cur)) {
        val = `${val}${cur}`;
        loc++;
        cur = rowToProcess[loc];
      }
      return val;
    } else {
      return '';
    }
  };

  const processRow = (rowToProcess, index) => {
    const adjNumbers = [];

    const leftVal = processNumLeft(rowToProcess, index);
    const rightVal = processNumRight(rowToProcess, index);

    // The middle char is a '.' so process left and right separately
    if (rowToProcess[index] === '.') {
      if (leftVal) {
        adjNumbers.push(leftVal);
      }

      if (rightVal) {
        adjNumbers.push(rightVal);
      }
    } else {
      // There is at most one number. Process both directions then smoosh it together
      const val = `${leftVal}${rowToProcess[index]}${rightVal}`;
      if (val) {
        adjNumbers.push(val);
      }
    }
    return adjNumbers;
  };

  let sum = 0;

  input.split('\n').forEach((row, whichRow, rows) => {
    const stars = [...row.matchAll(/\*/g)];

    for (const star of stars) {
      const index = star.index;
      let adjNumbers = [];

      // Check the row before
      if (whichRow !== 0) {
        adjNumbers = adjNumbers.concat(processRow(rows[whichRow - 1], index));
      }

      // Check the row after
      if (whichRow !== rows.length - 1) {
        adjNumbers = adjNumbers.concat(processRow(rows[whichRow + 1], index));
      }

      // Check directly to the left
      if (index !== 0) {
        if (isNumber(row[index - 1])) {
          adjNumbers.push(processNumLeft(row, index));
        }
      }

      // Check directly to the right
      if (index !== row.length - 1) {
        if (isNumber(row[index + 1])) {
          adjNumbers.push(processNumRight(row, index));
        }
      }

      if (adjNumbers.length == 2) {
        sum += adjNumbers[0] * adjNumbers[1];
      }
    }
  });

  return sum;
};

// -------------- DAY 4 ----------------------
const winningNumbers = (input) => {
  let sum = 0;
  input.split('\n').forEach((card) => {
    const [_title, winning, mine] = card.split(/:\s+|\s+\|\s+/g);
    const winningNumbers = winning.split(/\s+/g);
    const myNumbers = mine.split(/\s+/g);
    let winningCount = 0;

    myNumbers.forEach((num) => {
      if (winningNumbers.includes(num)) {
        winningCount++;
      }
    });

    // 0, 1, 2, 4, 8, ...
    if (winningCount > 2) {
      winningCount = 2 ** (winningCount - 1);
    }

    sum += winningCount;
  });

  return sum;
};

const scratchcards = (input) => {
  const scores = [];

  // Calculate the score (count of winning numbers) of each card
  input.split('\n').forEach((card) => {
    const [_title, winning, mine] = card.split(/:\s+|\s+\|\s+/g);
    const winningNumbers = winning.split(/\s+/g);
    const myNumbers = mine.split(/\s+/g);
    let score = 0;

    myNumbers.forEach((num) => {
      if (winningNumbers.includes(num)) {
        score++;
      }
    });

    scores.push({ score, count: 1 });
  });

  // For each winning number on each copy of card X, increment the count of card X+1...X+score
  scores.forEach((card, index, scores) => {
    if (card.score) {
      for (let i = index + 1; i < index + 1 + card.score; i++) {
        scores[i].count += card.count;
      }
    }
  });

  // Total up the counts of all the cards
  return scores.reduce((sum, cur) => sum + cur.count, 0);
};

// ------------- DAY 5 ---------------- //
const seedLocation = (input) => {
  const [seedList, ...mapList] = input.split('\n\n');
  let seeds = seedList
    .split(' ')
    .slice(1)
    .map((el) => +el)
    .sort();

  const maps = mapList.map((text) => {
    const [_title, ...list] = text.split('\n');
    const ranges = list.map((content) => {
      const [dest, source, len] = content.split(' ').map((el) => +el);
      const diff = dest - source;
      const range = [source, source + len - 1];
      return { range, diff };
    });
    return ranges;
  });

  maps.forEach((translation) => {
    seeds = seeds.map((seed) => {
      const rule = translation.find(({ range }) => range[0] <= seed && range[1] >= seed);
      if (rule) {
        return seed + rule.diff;
      } else {
        return seed;
      }
    });
  });

  return Math.min(...seeds);
};

const seedLocation2 = (input) => {
  const [seedList, ...mapList] = input.split('\n\n');

  const seeds = seedList
    .split(' ')
    .slice(1)
    .map((el) => +el);

  let ranges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    ranges.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
  }

  const maps = mapList.map((text) => {
    const [_title, ...list] = text.split('\n');
    return list.map((content) => {
      const [dest, source, len] = content.split(' ').map((el) => +el);
      const diff = dest - source;
      return { min: source, max: source + len - 1, diff };
    });
  });

  maps.forEach((map) => {
    let newRanges = [];

    ranges.forEach((range) => {
      newRanges = newRanges.concat(transformRange(range, map));
    });

    ranges = reduceRanges(newRanges);
  });

  return ranges[0][0];
};

/**
 *
 * @param {*} range : A tuple representing a range, i.e. [0,3] => 0,1,2,3
 * @param {*} map : A mapping object with properties min, max and diff
 * @returns An array of ranges representing the output of the range with the map applied
 */
const transformRange = (range, map) => {
  let [min, max] = range;
  let newRanges = [];
  let done = false;

  while (!done) {
    let rule = map.find((m) => min >= m.min && min <= m.max);
    if (rule) {
      // The whole current range fits into this range rule
      if (max <= rule.max) {
        newRanges.push([min + rule.diff, max + rule.diff]);
        done = true;
      } else {
        newRanges.push([min + rule.diff, rule.max + rule.diff]);
        min = rule.max + 1;
      }
    } else {
      rule = map.find((m) => max >= m.min && max <= m.max);
      if (rule) {
        newRanges.push([min, rule.min - 1]);
        newRanges.push([rule.min + rule.diff, max + rule.diff]);
        done = true;
      } else {
        newRanges.push([min, max]);
        done = true;
      }
    }
  }

  return newRanges;
};

/**
 * Takes an array of ranges and combines any that overlap or are back to back
 * i.e. [[0,3], [4,6]] => [[0,6]]
 * i.e. [[0,3], [1,2]] => [[0,3]]
 * i.e. [[0,3], [1,6]] => [[0,6]]
 *
 * The resulting array should be sorted ascending
 */
const reduceRangesComplete = (ranges) => {
  ranges.sort((a, b) => a[0] - b[0]);
  let i = 0;
  while (i < ranges.length - 1) {
    const now = ranges[i];
    const next = ranges[i + 1];
    if (next[0] >= now[0] && next[1] <= now[1]) {
      console.log('next inside now', { now, next, i, ranges });
      ranges.splice(i + 1, 1);
    } else if (now[0] >= next[0] && now[1] <= next[1]) {
      console.log('now inside next', { now, next, i, ranges });
      ranges.splice(i, 1);
    } else if (next[0] <= now[1]) {
      console.log('overlapping', { now, next, i, ranges });
      ranges.splice(i, 2, [now[0], next[1]]);
    } else if (next[0] === now[1] + 1) {
      console.log('back to back', { now, next, i, ranges });
      ranges.splice(i, 2, [now[0], next[1]]);
    } else {
      i++;
    }
  }
  return ranges;
};

/**
 * Takes an array of ranges and combines any that are back to back:
 * i.e. [[0,3], [4,6]] => [[0,6]]
 *
 * The resulting array should be sorted ascending.
 *
 * This is a faster, simplified version of reduceRangesComplete, because this puzzle has no overlapping ranges
 */
const reduceRanges = (ranges) => {
  ranges.sort((a, b) => a[0] - b[0]);
  let i = 0;
  while (i < ranges.length - 1) {
    const now = ranges[i];
    const next = ranges[i + 1];
    if (next[0] === now[1] + 1) {
      ranges.splice(i, 2, [now[0], next[1]]);
    } else {
      i++;
    }
  }
  return ranges;
};

// -------------- DAY 6 ----------------------
const boatRaces = (input) => {
  const races = [];
  const [times, distances] = input.split('\n').map((row) => row.split(/\s+/).slice(1));
  times.forEach((time) => races.push({ time: +time }));
  distances.forEach((dist, i) => (races[i].distance = +dist));

  const options = races.map(({ time, distance: goal }) => {
    let count = 0;
    for (let i = 1; i < time; i++) {
      const dist = (time - i) * i;
      if (dist > goal) {
        count++;
      } else if (count > 0) {
        // We've passed the last option, break early
        break;
      }
    }

    return count;
  });

  return options.reduce((total, next) => total * next, 1);
};

// Note: The quadratic algorithm would work for part 1 or 2, but the input parsing is different
const boatRaceQuadratic = (input) => {
  const [time, distance] = input.split('\n').map((row) => row.split(':')[1].replace(/\s+/g, ''));

  // We can find the min and max solutions by solving a quadratic equation of the form
  // x^2 - tx + d < 0 where t = time and d = distance
  const solutions = quadratic(1, -time, +distance).sort((a, b) => a - b);

  // Find the number of integers between min and max, exclusive
  let diff = Math.floor(solutions[1]) - Math.ceil(solutions[0]) + 1;

  if (Math.floor(solutions[1]) === solutions[1]) {
    diff--;
  }

  if (Math.ceil(solutions[0]) === solutions[0]) {
    diff--;
  }

  return diff;
};

// -------------- DAY 7 ----------------------
const camelCards = (input, puzzle) => {
  const hands = input.split('\n').map((row) => {
    const [hand, bid] = row.split(' ');
    const handType = puzzle === 2 ? getHandType2(hand) : getHandType1(hand);
    return { hand, bid: +bid, handRank: handRanks[handType] };
  });

  hands.sort((a, b) => compareHands(a, b, puzzle));

  let score = 0;
  hands.forEach(({ bid }, i) => {
    score += bid * (i + 1);
  });

  return score;
};

const cardRanks1 = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11, // jack
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const cardRanks2 = {
  ...cardRanks1,
  J: 1, // joker
};

const handRanks = {
  fiveOfAKind: 7,
  fourOfAKind: 6,
  fullHouse: 5,
  threeOfAKind: 4,
  twoPair: 3,
  pair: 2,
  highCard: 1,
};

const getHandType1 = (hand) => {
  const countMap = {};
  hand.split('').forEach((card) => {
    if (countMap[card]) {
      countMap[card]++;
    } else {
      countMap[card] = 1;
    }
  });

  const counts = Object.values(countMap).sort((a, b) => b - a);
  if (counts[0] === 5) {
    return 'fiveOfAKind';
  } else if (counts[0] === 4) {
    return 'fourOfAKind';
  } else if (counts[0] === 3) {
    if (counts[1] === 2) {
      return 'fullHouse';
    } else {
      return 'threeOfAKind';
    }
  } else if (counts[0] === 2) {
    if (counts[1] === 2) {
      return 'twoPair';
    } else {
      return 'pair';
    }
  }

  return 'highCard';
};

const getHandType2 = (hand) => {
  const countMap = {};
  let jokers = 0;

  hand.split('').forEach((card) => {
    if (card === 'J') {
      jokers++;
    } else if (countMap[card]) {
      countMap[card]++;
    } else {
      countMap[card] = 1;
    }
  });

  const counts = Object.values(countMap).sort((a, b) => b - a);
  if (jokers === 5) {
    return 'fiveOfAKind';
  } else {
    counts[0] += jokers;
  }

  if (counts[0] === 5) {
    return 'fiveOfAKind';
  } else if (counts[0] === 4) {
    return 'fourOfAKind';
  } else if (counts[0] === 3) {
    if (counts[1] === 2) {
      return 'fullHouse';
    } else {
      return 'threeOfAKind';
    }
  } else if (counts[0] === 2) {
    if (counts[1] === 2) {
      return 'twoPair';
    } else {
      return 'pair';
    }
  }

  return 'highCard';
};

/**
 * A comparison method to pass into a sort function to order an array of hands by value, ascending
 */
const compareHands = (hand1, hand2, puzzle) => {
  const cardRanks = puzzle === 2 ? cardRanks2 : cardRanks1;

  if (hand1.handRank !== hand2.handRank) {
    return hand1.handRank - hand2.handRank;
  }

  const cardRanksHand1 = hand1.hand.split('').map((card) => cardRanks[card]);
  const cardRanksHand2 = hand2.hand.split('').map((card) => cardRanks[card]);

  for (let i = 0; i < cardRanksHand1.length; i++) {
    const diff = cardRanksHand1[i] - cardRanksHand2[i];
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
};

// -------------- DAY 8 ----------------------
const wasteland = (input) => {
  const [directions, nodeText] = input.split('\n\n');
  const nodes = {};
  nodeText.split('\n').forEach((str) => {
    const matches = str.match(/(?<node>\w{3})\s=\s\((?<left>\w{3}),\s(?<right>\w{3})\)/);
    if (matches?.groups) {
      const { node, left, right } = matches.groups;
      nodes[node] = { left, right };
    }
  });

  let steps = 0;
  let i = 0;
  let cur = 'AAA';
  while (cur != 'ZZZ') {
    if (directions[i] === 'L') {
      cur = nodes[cur].left;
    } else {
      cur = nodes[cur].right;
    }

    steps++;
    i++;
    if (i === directions.length) {
      i = 0;
    }

    // console.log(cur);
  }

  return steps;
};

const hauntedWasteland = (input) => {
  const [directions, nodeText] = input.split('\n\n');
  const nodes = {};
  let starters = [];
  nodeText.split('\n').forEach((str) => {
    const matches = str.match(/(?<node>\w{3})\s=\s\((?<left>\w{3}),\s(?<right>\w{3})\)/);
    if (matches?.groups) {
      const { node, left, right } = matches.groups;
      const endsInA = node[2] === 'A';
      const endsInZ = node[2] === 'Z';
      nodes[node] = { left, right, endsInZ };
      if (endsInA) {
        starters.push(node);
      }
    }
  });

  // Find the first time each one finishes -- from there, they cycle
  const finishes = starters.map((n) => {
    let steps = 0;
    let i = 0;
    let cur = n;
    while (true) {
      if (directions[i] === 'L') {
        cur = nodes[cur].left;
      } else {
        cur = nodes[cur].right;
      }

      steps++;

      if (nodes[cur].endsInZ) {
        return steps;
      }

      i++;
      if (i === directions.length) {
        i = 0;
      }
    }
  });

  console.log(finishes);

  // Find the lowest common denominator of all the individual finishes
  return lcmArray(finishes);
};

// -------------- DAY 9 ----------------------
const diffPyramid = (input) => {
  return input.split('\n').reduce((sum, row) => {
    const array = row.split(' ').map((el) => +el);
    const next = findNextInSequence(array);
    return sum + next;
  }, 0);
};

const findNextInSequence = (array) => {
  const rows = [array];
  let cur = array;
  while (cur.some((val) => val !== 0)) {
    let next = [];
    for (let i = 0; i < cur.length - 1; i++) {
      next.push(cur[i + 1] - cur[i]);
    }
    rows.push(next);
    cur = next;
  }

  let diff = 0;
  let i = rows.length - 2;
  while (i >= 0) {
    const lastVal = rows[i].at(-1);
    const nextVal = lastVal + diff;
    rows[i].push(nextVal);
    diff = nextVal;
    i--;
  }

  return rows[0].at(-1);
};

const diffPyramid2 = (input) => {
  return input.split('\n').reduce((sum, row) => {
    const array = row.split(' ').map((el) => +el);
    const next = findPrevInSequence(array);
    return sum + next;
  }, 0);
};

const findPrevInSequence = (array) => {
  const rows = [array];
  let cur = array;
  while (cur.some((val) => val !== 0)) {
    let next = [];
    for (let i = 0; i < cur.length - 1; i++) {
      next.push(cur[i + 1] - cur[i]);
    }
    rows.push(next);
    cur = next;
  }

  let diff = 0;
  let i = rows.length - 2;
  while (i >= 0) {
    const firstVal = rows[i][0];
    const prevVal = firstVal - diff;
    rows[i].unshift(prevVal);
    diff = prevVal;
    i--;
  }

  return rows[0][0];
};

// -------------- DAY 10 ----------------------
const pipeLoop = (input) => {
  const rows = input.split('\n');
  const startRow = rows.findIndex((row) => row.includes('S'));
  const startCol = rows[startRow].indexOf('S');

  // Make our first move
  let { r, c, prev } = firstMove(rows, startRow, startCol);
  let cur = rows[r][c];
  let moves = 1;

  const moveLeft = () => {
    c--;
    prev = 'right';
  };

  const moveRight = () => {
    c++;
    prev = 'left';
  };

  const moveUp = () => {
    r--;
    prev = 'down';
  };

  const moveDown = () => {
    r++;
    prev = 'up';
  };

  while (cur !== 'S') {
    switch (cur) {
      case '|':
        prev === 'down' ? moveUp() : moveDown();
        break;
      case '-':
        prev === 'left' ? moveRight() : moveLeft();
        break;
      case 'L':
        prev === 'up' ? moveRight() : moveUp();
        break;
      case 'J':
        prev === 'up' ? moveLeft() : moveUp();
        break;
      case '7':
        prev === 'left' ? moveDown() : moveLeft();
        break;
      case 'F':
        prev === 'right' ? moveDown() : moveRight();
        break;
      default:
        console.log(`Unexpected value: ${cur}`);
        return;
    }

    moves++;
    cur = rows[r][c];
  }

  return moves / 2;
};

const firstMove = (map, r, c) => {
  if (r > 0) {
    const up = map[r - 1][c];
    if (up === '|' || up === '7' || up === 'F') {
      return { r: r - 1, c, prev: 'down' };
    }
  }
  if (r < map.length - 1) {
    const down = map[r + 1][c];
    if (down === '|' || down === 'L' || down === 'J') {
      return { r: r + 1, c, prev: 'up' };
    }
  }
  if (c > 0) {
    const left = map[r][c - 1];
    if (left === '-' || left === 'L' || left === 'F') {
      return { r, c: c - 1, prev: 'right' };
    }
  }
  if (c < map[r].length - 1) {
    const right = map[r][c + 1];
    if (right === '-' || right === '7' || right === 'J') {
      return { r, c: c + 1, prev: 'left' };
    }
  }
  console.log('Could not make first move');
};

// -------------- TODO DAY 10 Part 2 ----------

// -------------- DAY 11 ----------------------
// Part 1 - Replaced by part 2 impl
// Since expandGalaxy actually adds the rows, we can just use plain manhttan distance
const shortestGalaxyPaths = (input) => {
  const expanded = expandGalaxy(input);
  const galaxies = [];
  let total = 0;
  expanded.forEach((row, r) => {
    row.split('').forEach((cell, c) => {
      if (cell === '#') {
        galaxies.forEach((gal) => {
          total += manhattanDistance(gal, [r, c]);
        });
        galaxies.push([r, c]);
      }
    });
  });
  return total;
};

// Part 1 - Replaced by part 2 impl
// Returns an "expanded" gallery for part 1, by phyisically adding extra rows and columns
const expandGalaxy = (input) => {
  let rows = input.split('\n');

  // Expand columns
  let i = 0;
  while (i < rows[0].length) {
    if (rows.every((row) => row[i] === '.')) {
      rows = rows.map((row) => row.slice(0, i).concat('.', row.slice(i)));
      i += 2;
    } else {
      i++;
    }
  }

  // Expand rows
  i = 0;
  while (i < rows.length) {
    if (rows[i].includes('#')) {
      i++;
    } else {
      rows.splice(i, 0, rows[i]);
      i += 2;
    }
  }

  return rows;
};
/**
 * @param {*} input puzzle input
 * @param {*} expandTo how many lines to expand an "old" line to
 *
 * This can be used for parts 1 and 2, but the orig part 1 implementation was faster for it
 */
const shortestGalaxyPathsMulti = (input, expandTo) => {
  const { expandedCols, expandedRows } = getExpansionData(input);
  const galaxies = [];
  let total = 0;
  input.split('\n').forEach((row, r) => {
    row.split('').forEach((cell, c) => {
      if (cell === '#') {
        galaxies.forEach((gal) => {
          total += findGalaxyDistance(expandTo, expandedCols, expandedRows, gal, [r, c]);
        });
        galaxies.push([r, c]);
      }
    });
  });
  return total;
};

/**
 * Returns the indexes of the rows and columns to be expanded
 */
const getExpansionData = (input) => {
  let galaxy = input.split('\n');
  let expandedRows = [];
  let expandedCols = [];

  // Find expanded columns
  for (let i = 0; i < galaxy[0].length; i++) {
    if (galaxy.every((row) => row[i] === '.')) {
      expandedCols.push(i);
    }
  }

  // Find expanded rows
  for (let i = 0; i < galaxy.length; i++) {
    if (!galaxy[i].includes('#')) {
      expandedRows.push(i);
    }
  }

  return { expandedCols, expandedRows };
};

/**
 * Finds the distance between gal1 and gal2
 * @param {*} expandTo how many rows an expanded galaxy represents
 * @param {*} expandedCols which columns are expanded
 * @param {*} expandedRows which rows are expanded
 * @param {*} gal1 coords of the first galaxy [r, c]
 * @param {*} gal2 coords of the first galaxy [r, c]
 * @returns
 */
const findGalaxyDistance = (expandTo, expandedCols, expandedRows, gal1, gal2) => {
  const minR = Math.min(gal1[0], gal2[0]);
  const maxR = Math.max(gal1[0], gal2[0]);
  const minC = Math.min(gal1[1], gal2[1]);
  const maxC = Math.max(gal1[1], gal2[1]);

  // Find the number of expanded rows and columns between the two galaxies
  const colCount = expandedCols.filter((col) => col > minC && col < maxC).length;
  const rowCount = expandedRows.filter((row) => row > minR && row < maxR).length;

  // Find the regular distance between the two, then add the expansion amount for each expanded line
  // Using expandTo - 1 since the original row/col was already counted in manhattanDistance
  return manhattanDistance(gal1, gal2) + (expandTo - 1) * (colCount + rowCount);
};

// -------------- DAY 12 ----------------------
// TODO PART TWO
const springArrangments = (input) => {
  let validCount = 0;
  input.split('\n').forEach((row) => {
    const [record, nums] = row.split(' ');
    const counts = nums.split(',').map((el) => +el);
    const total = sum(counts);
    validCount += countArrangements(record, counts, total);
  });
  return validCount;
};

// As expected, this brute force takes forever. Need a better plan
const foldedSpringArrangments = (input) => {
  let validCount = 0;
  input.split('\n').forEach((row) => {
    const [record, nums] = row.split(' ');
    const counts = nums.split(',').map((el) => +el);
    const total = sum(counts);
    const origCount = countArrangements(record, counts, total);
    const foldedRecord = `${record}?${record}`;
    const foldedCounts = counts.concat(counts);
    const folded = countArrangements(foldedRecord, foldedCounts, total * 2);
    const arrangments = origCount * (folded / origCount) ** 4;
    console.log(row, arrangments);
    validCount += arrangments;
  });
  return validCount;
};

const countArrangements = (record, counts, total) => {
  const existing = numOccurrences(record, '#');
  const missing = total - existing;
  // if (missing === 0) {
  //   console.log("nothing's missing");
  //   return 1;
  // }
  const qLocations = findOccurrences(record, '?');
  // if (missing > qLocations) {
  //   console.log('too many missing');
  //   return 0;
  // }

  const permutations = springPermutations(qLocations.length, missing);
  let validCount = 0;
  permutations.forEach((perm) => {
    const indexes = perm.map((i) => qLocations[i]);
    const springMap = replaceSprings(record, indexes);
    if (isValidSpringMap(springMap, counts)) {
      // console.log(`Valid: ${springMap}, ${counts}`);
      validCount++;
    }
  });
  // console.log(validCount);
  return validCount;
};

const isValidSpringMap = (record, counts) => {
  const groups = record.split(/\.+/).filter((el) => el.length);
  if (groups.length !== counts.length) {
    return false;
  }

  return counts.every((count, i) => groups[i].length === count);
};

const replaceSpringsOld = (record, springs, nulls) => {
  const springMap = record.split('');
  springs.forEach((i) => {
    springMap[i] = '#';
  });
  nulls.forEach((i) => {
    springMap[i] = '.';
  });
  return springMap.join('');
};

const replaceSprings = (record, springs) => {
  const springMap = record.split('');
  springs.forEach((index) => {
    springMap[index] = '#';
  });
  return springMap.join('').replace(/\?/g, '.');
};

const springPermutations = (max, count) => {
  let permutations = [[]];
  for (let len = 0; len < count; len++) {
    let updated = [];
    permutations.forEach((per) => {
      for (let i = (per.at(-1) ?? -1) + 1; i < max; i++) {
        updated.push(per.concat(i));
      }
    });
    permutations = updated;
  }

  return permutations;
};

// -------------- DAY 13 ----------------------
const mirrorLocations = (input) => {
  return input.split('\n\n').reduce((total, pattern) => {
    const score = findMirror(pattern);
    return total + score;
  }, 0);
};

const findMirror = (pattern) => {
  const rows = pattern.split('\n');
  const horiz = findHorizMirrorLocation(rows);
  if (horiz !== null) {
    // console.log(`Horizontal, row ${horiz}`);
    return 100 * (horiz + 1);
  }

  const swapped = reverseGrid(rows);
  const vert = findHorizMirrorLocation(swapped);
  if (vert !== null) {
    // console.log(`Vertical, column ${vert}`);
    return vert + 1;
  }

  console.log("Uh oh, we didn't find it");
};

/**
 * Given an array of rows, finds where there is a horizontal reflection line - if there is one
 */
const findHorizMirrorLocation = (rows) => {
  for (let i = 0; i < rows.length - 1; i++) {
    if (rows[i] === rows[i + 1]) {
      let j = i - 1;
      let k = i + 2;
      let good = true;
      while (j >= 0 && k < rows.length && good) {
        if (rows[j] === rows[k]) {
          j--;
          k++;
        } else {
          good = false;
        }
      }

      if (good) {
        return i;
      }
    }
  }

  return null;
};

// Part 2
const smudgedMirrors = (input) => {
  return input.split('\n\n').reduce((total, pattern) => {
    const score = findSmudgedMirror(pattern);
    return total + score;
  }, 0);
};

const findSmudgedMirror = (pattern) => {
  const rows = pattern.split('\n');
  // Looks for a horizontal reflection line
  const horiz = findSmudgedHorizMirrorLocation(rows);
  if (horiz !== null) {
    // console.log(`Horizontal, row ${horiz}`);
    return 100 * (horiz + 1);
  }

  // If we didn't find one, swaps the rows and columns, then tries again
  const swapped = reverseGrid(rows);
  const vert = findSmudgedHorizMirrorLocation(swapped);
  if (vert !== null) {
    // console.log(`Vertical, column ${vert}`);
    return vert + 1;
  }

  console.log("Uh oh, we didn't find it");
};

/**
 * Given an array of rows, finds where there is a horizontal reflection line
 * with exactly one "smudge", if it exists.
 * Meaning, if you change exactly one character in the whole pattern,
 * then this would be the horizontal reflection line.
 */
const findSmudgedHorizMirrorLocation = (rows) => {
  for (let i = 0; i < rows.length - 1; i++) {
    if (rows[i] === rows[i + 1] || smudgeMatch(rows[i], rows[i + 1])) {
      let j = i - 1;
      let k = i + 2;
      let smudged = rows[i] !== rows[i + 1];
      let good = true;
      while (j >= 0 && k < rows.length && good) {
        if (rows[j] === rows[k]) {
          j--;
          k++;
        } else if (!smudged && smudgeMatch(rows[j], rows[k])) {
          j--;
          k++;
          smudged = true;
        } else {
          good = false;
        }
      }

      if (smudged && good) {
        return i;
      }
    }
  }

  return null;
};

/**
 * Takes two strings of the same length.
 * Returns true if they are identical except for one character.
 */
const smudgeMatch = (row1, row2) => {
  if (row1 === row2) {
    return false;
  }

  let smudged = false;
  for (let i = 0; i <= row1.length; i++) {
    if (row1[i] !== row2[i]) {
      if (smudged) {
        return false;
      } else {
        smudged = true;
      }
    }
  }
  return true;
};

// ----------- DAY 14 ----------------
const singleTilt = (input) => {
  const rows = input.split('\n');
  let sum = 0;
  for (let x = 0; x < rows[0].length; x++) {
    const col = [];
    for (let y = 0; y < rows.length; y++) {
      col.unshift(rows[y][x]);
    }
    col.unshift('.');

    for (let i = col.lastIndexOf('O'); i >= 0; i--) {
      if (col[i] !== 'O') {
        continue;
      }

      let j = i + 1;
      while (j < col.length) {
        if (col[j] === '.') {
          j++;
        } else {
          break;
        }
      }
      col[i] = '.';
      col[j - 1] = 'O';
      sum += j - 1;
    }
  }
  return sum;
};

const cycleTiltRepeat = (input) => {
  let grid = input.split('\n').map((row) => row.split(''));

  // We expect the grids to cycle at some point, so save each one until we get a match
  const grids = [grid.map((row) => row.join('')).join('\n')];

  let count = 0;
  while (true) {
    count++;
    grid = tiltCycle(grid);
    const flattened = grid.map((row) => row.join('')).join('\n');

    // We got a match so a cycle has started
    // Now, we just have to calculate where 1000000000 would hit in this cycle
    if (grids.includes(flattened)) {
      const firstMatch = grids.indexOf(flattened); // Index of the last time we had the same pattern
      const cadence = count - firstMatch; // How long ago was it? This is the length of a cycle
      const cycleGrids = grids.slice(firstMatch); // Delete all the grids before the first natch, not in cycle
      const index = (1000000000 - firstMatch) % cadence; // Since first match is 0, subtract in, then take mod

      const winner = cycleGrids[index]; // This should match the 1000000000th iteration
      return calcNorthLoad(winner.split('\n').map((row) => row.split('')));
    } else {
      grids.push(flattened);
    }
  }
};

const calcNorthLoad = (grid) => {
  const reversed = grid.reverse();
  let sum = 0;
  reversed.forEach((row, i) => {
    sum += numOccurrences(row, 'O') * (i + 1);
  });
  return sum;
};

const tiltCycle = (grid) => {
  return tiltEast(tiltSouth(tiltWest(tiltNorth(grid))));
};

const tiltNorth = (grid) => {
  // Evaluate each column, from left to right
  for (let x = 0; x < grid[0].length; x++) {
    // For each O in the column, move it up as far as it can go, starting from the top
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] !== 'O') {
        continue;
      }

      // travel past as many . up until we hit a rock
      let j = y - 1;
      while (j >= 0) {
        if (grid[j][x] === '.') {
          j--;
        } else {
          break;
        }
      }
      // swap the rock and the last . we found (one before we stopped)
      grid[y][x] = '.';
      grid[j + 1][x] = 'O';
    }
  }

  return grid;
};

const tiltSouth = (grid) => {
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = grid.length - 1; y >= 0; y--) {
      if (grid[y][x] !== 'O') {
        continue;
      }

      let j = y + 1;
      while (j < grid.length) {
        if (grid[j][x] === '.') {
          j++;
        } else {
          break;
        }
      }
      grid[y][x] = '.';
      grid[j - 1][x] = 'O';
    }
  }

  return grid;
};

const tiltWest = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== 'O') {
        continue;
      }

      let j = x - 1;
      while (j >= 0) {
        if (grid[y][j] === '.') {
          j--;
        } else {
          break;
        }
      }
      grid[y][x] = '.';
      grid[y][j + 1] = 'O';
    }
  }

  return grid;
};

const tiltEast = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = grid[0].length - 1; x >= 0; x--) {
      if (grid[y][x] !== 'O') {
        continue;
      }

      let j = x + 1;
      while (j < grid[0].length) {
        if (grid[y][j] === '.') {
          j++;
        } else {
          break;
        }
      }
      grid[y][x] = '.';
      grid[y][j - 1] = 'O';
    }
  }

  return grid;
};
