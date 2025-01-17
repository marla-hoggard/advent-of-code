/**
 * Day 1 - Puzzle 1
 *
 * 1. Parse the input into two lists, one for each column
 * 2. Sort both lists ascending
 * 3. Compute the difference between left[i] and right[i] for each index
 * 4. Return the sum of the differences
 */
const diffLists = (input) => {
  const left = [];
  const right = [];
  input.split('\n').forEach((row) => {
    const [l, r] = row.split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
  });
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let diffs = 0;
  for (let i = 0; i < left.length; i++) {
    diffs += Math.abs(left[i] - right[i]);
  }

  return diffs;
};

/**
 * Day 1 - Puzzle 2
 * 1. Parse the input into two lists, one for each column
 * 2. Determine how many times each element of left appears in right
 * 3. Compute count * num for each element, and return the sum of each computation
 */
const similarityScore = (input) => {
  const left = [];
  const right = [];
  input.split('\n').forEach((row) => {
    const [l, r] = row.split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
  });

  // Cache each value so we don't have to count occurrences more than once for a given value
  let countMap = {};

  let score = 0;
  left.forEach((num) => {
    if (countMap[num]) {
      score += countMap[num];
    } else {
      const count = numOccurrences(right, num) * num;
      countMap[num] = count;
      score += count;
    }
  });
  return score;
};

/**
 * Day 2 - Puzzle 1
 * Counts the number of safe reports, where a report is a line of the input
 */
const safeReports = (input) => {
  let safeCount = 0;
  input.split('\n').forEach((report) => {
    if (isSafeReport(report)) {
      safeCount++;
    }
  });
  return safeCount;
};

/**
 * Day 2 - Puzzle 2
 * Counts the number of reports that are safe as is
 * or would be with a single item removed
 */
const tolerantSafeReports = (input) => {
  let safeCount = 0;
  input.split('\n').forEach((report) => {
    if (isSafeReport(report)) {
      safeCount++;
      return;
    }

    for (let i = 0; i < report.length; i++) {
      if (isSafeReport(report, i)) {
        safeCount++;
        return;
      }
    }
  });
  return safeCount;
};

/**
 * A report is safe if:
 * - It is strictly increasing or decreasing
 * - The difference between each neighboring pair of values is between 1-3
 * @param indexToRemove - If provided, remove the value at this index before testing
 */
const isSafeReport = (report, indexToRemove) => {
  let values = report.split(' ').map(Number);
  if (indexToRemove !== undefined) {
    values = values.toSpliced(indexToRemove, 1);
  }
  let isIncreasing = values[1] > values[0];
  for (let i = 1; i < values.length; i++) {
    const diff = values[i] - values[i - 1];
    if (diff > 3 || diff < -3 || diff === 0) {
      return false;
    }
    if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
      return false;
    }
  }
  return true;
};

/**
 * Day 3 - Puzzle 1
 * Find all instances of mul(a,b) where a and b can be 1-3 digit numbers
 * Return the sum of each product a*b
 */
const decodeAndMultiply = (input) => {
  const regex = /mul\((?<first>\d{1,3}),(?<second>\d{1,3})\)/g;
  const matches = [...input.matchAll(regex)];
  let sum = 0;
  for (const match of matches) {
    sum += match.groups.first * match.groups.second;
  }
  return sum;
};

/**
 * Day 3 - Puzzle 2
 * Find all instances of mul(a,b) where a and b can be 1-3 digit numbers
 * However, if don't() appears, then ignore everything after it, until a do() appears
 * Return the sum of each product that's found in the enabled sections on the input
 */
const disabledMultiply = (input) => {
  const mulRegex = /mul\((?<first>\d{1,3}),(?<second>\d{1,3})\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;

  const mulMatches = [...input.matchAll(mulRegex)].map((m) => ({
    type: 'mul',
    first: m.groups.first,
    second: m.groups.second,
    index: m.index,
  }));
  const doIndexes = [...input.matchAll(doRegex)].map((m) => ({ type: 'do', index: m.index }));
  const dontIndexes = [...input.matchAll(dontRegex)].map((m) => ({ type: 'dont', index: m.index }));

  // Combine all the matches into a single array, sorted by index
  const combined = mulMatches.concat(doIndexes, dontIndexes).sort((a, b) => a.index - b.index);

  let enabled = true;
  let sum = 0;
  for (const m of combined) {
    switch (m.type) {
      case 'mul':
        if (enabled) {
          sum += m.first * m.second;
        }
        break;
      case 'do':
        enabled = true;
        break;
      case 'dont':
        enabled = false;
        break;
    }
  }
  return sum;
};

/**
 * Count all the occurrences of "XMAS" in the word search.
 * All 8 directions are valid, including backwards and diagonals.
 */
const xmasWordSearch = (input) => {
  const grid = input.split('\n').map((row) => row.split(''));
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== 'X') continue;
      if (grid[y - 1]?.[x] === 'M' && grid[y - 2]?.[x] === 'A' && grid[y - 3]?.[x] === 'S') {
        count++;
      }
      if (grid[y + 1]?.[x] === 'M' && grid[y + 2]?.[x] === 'A' && grid[y + 3]?.[x] === 'S') {
        count++;
      }
      if (grid[y]?.[x - 1] === 'M' && grid[y]?.[x - 2] === 'A' && grid[y]?.[x - 3] === 'S') {
        count++;
      }
      if (grid[y]?.[x + 1] === 'M' && grid[y]?.[x + 2] === 'A' && grid[y]?.[x + 3] === 'S') {
        count++;
      }

      if (
        grid[y - 1]?.[x - 1] === 'M' &&
        grid[y - 2]?.[x - 2] === 'A' &&
        grid[y - 3]?.[x - 3] === 'S'
      ) {
        count++;
      }
      if (
        grid[y - 1]?.[x + 1] === 'M' &&
        grid[y - 2]?.[x + 2] === 'A' &&
        grid[y - 3]?.[x + 3] === 'S'
      ) {
        count++;
      }
      if (
        grid[y + 1]?.[x - 1] === 'M' &&
        grid[y + 2]?.[x - 2] === 'A' &&
        grid[y + 3]?.[x - 3] === 'S'
      ) {
        count++;
      }
      if (
        grid[y + 1]?.[x + 1] === 'M' &&
        grid[y + 2]?.[x + 2] === 'A' &&
        grid[y + 3]?.[x + 3] === 'S'
      ) {
        count++;
      }
    }
  }
  return count;
};

/**
 * Counts the occurrences of "MAS" crossing itself in an X shape in the word search
 * M M
 *  A
 * S S
 */
const x_masWordSearch = (input) => {
  const grid = input.split('\n').map((row) => row.split(''));
  let count = 0;

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] !== 'A') continue;
      const tl = grid[y - 1][x - 1];
      const tr = grid[y - 1][x + 1];
      const bl = grid[y + 1][x - 1];
      const br = grid[y + 1][x + 1];
      const letters = { S: 0, M: 0 };
      [tl, tr, bl, br].forEach((letter) => {
        if (letter in letters) {
          letters[letter]++;
        }
      });

      if (letters.S === 2 && letters.M === 2 && tl !== br) {
        count++;
      }
    }
  }
  return count;
};

/**
 * Day 5 - Puzzle 1 & 2
 * - Determines which updates are properly ordered.
 * - Takes the sum of the middle pages from each update that is being tracked
 * - track = 'ordered' to look at ordered updates, track = 'unordered' to count out-of-order updates
 */
const pageOrdering = (input, track) => {
  const [orders, updates] = input.split('\n\n');
  const orderMap = {};

  // Create a mapping of each page to a list of the pages it comes after
  for (const order of orders.split('\n')) {
    const [first, second] = order.split('|');
    orderMap[first] ??= [];
    orderMap[first].push(second);
  }

  let sum = 0;
  for (const update of updates.split('\n')) {
    const pages = update.split(',');
    pages.sort((a, b) => {
      const orderA = orderMap[a];
      if (orderA.includes(b)) {
        return -1;
      } else {
        return 1;
      }
    });

    const getMiddlPage = (pages) => {
      const middleIndex = Math.floor(pages.length / 2);
      const middle = +pages[middleIndex];
      return middle;
    };

    if (pages.join(',') === update) {
      if (track === 'ordered') {
        sum += getMiddlPage(pages);
      }
    } else if (track === 'unordered') {
      sum += getMiddlPage(pages);
    }
  }

  return sum;
};

/**
 * Day 6, Puzzle 1
 * Find the total number of spaces the guard visits before exiting the map bounds
 */
const guardTracker = (input) => {
  // Find the blocks and starting point
  const data = setupBlocks(input);

  // Find all the visited locations
  const visited = getGuardVisits(data);

  return visited.size;
};

/**
 * Parses the input and returns a Set of block coordinates,
 * plus the start location and map bounds
 */
const setupBlocks = (input) => {
  const rows = input.split('\n');
  const maxX = rows[0].length - 1;
  const maxY = rows.length - 1;

  const blocks = new Set();
  let startX = 0;
  let startY = 0;

  rows.forEach((row, whichRow) => {
    row.split('').forEach((cell, whichCol) => {
      switch (cell) {
        case '#':
          blocks.add(`${whichCol},${whichRow}`);
          break;
        case '^':
          startX = whichCol;
          startY = whichRow;
          break;
      }
    });
  });

  return { blocks, startX, startY, maxX, maxY };
};

/**
 * Executes a single move or turn of the guard
 */
const moveGuard = (blocks, x, y, dir) => {
  let nextX = x;
  let nextY = y;
  switch (dir) {
    case 0: // up
      nextY = y - 1;
      break;
    case 1: // right
      nextX = x + 1;
      break;
    case 2: // down
      nextY = y + 1;
      break;
    case 3: // left
      nextX = x - 1;
      break;
  }
  if (blocks.has(`${nextX},${nextY}`)) {
    return { x, y, dir: (dir + 1) % 4 };
  } else {
    return { x: nextX, y: nextY, dir };
  }
};

/**
 * Returns a Set of "x,y" coordinates that the guard visits,
 * given the blocks, start location, and map bounds
 */
const getGuardVisits = ({ blocks, startX, startY, maxX, maxY }) => {
  const visited = new Set();
  let x = startX;
  let y = startY;
  let dir = 0; // up

  // Calculate the path
  while (x >= 0 && x <= maxX && y >= 0 && y <= maxY) {
    visited.add(`${x},${y}`);
    ({ x, y, dir } = moveGuard(blocks, x, y, dir));
  }

  return visited;
};

/**
 * Day 6, Puzzle 2
 * Determines all locations in which adding a block in that location
 * (and only that location) would cause the guard to get stuck in a loop
 *
 * This is attempt2, down from 17 to 4 seconds, but still not as fast as I'd like
 */
const guardLoops = (input) => {
  const data = setupBlocks(input);
  const visited = getGuardVisits(data);
  const { blocks: blockSet, ...values } = data;

  let loops = 0;

  // The only places that could affect the path must be on the path,
  // so iterate though each path location and check if adding a block there creates a loop
  visited.forEach((loc) => {
    const [blockX, blockY] = loc.split(',').map(Number);
    if (guardPathHasLoop({ ...values, blockSet, blockX, blockY })) {
      loops++;
    }
  });

  return loops;
};

/**
 * Adds blockX,blockY to the blocks list and then checks if the path now contains a loop
 */
const guardPathHasLoop = ({ blockSet, startX, startY, maxX, maxY, blockX, blockY }) => {
  const blocks = new Set(blockSet);
  blocks.add(`${blockX},${blockY}`);

  let x = startX;
  let y = startY;
  let dir = 0; // up
  let visited = new Set();
  while (x >= 0 && x <= maxX && y >= 0 && y <= maxY) {
    const visitHash = `${x},${y},${dir}`;
    if (visited.has(visitHash)) {
      return true;
    }

    visited.add(visitHash);
    ({ x, y, dir } = moveGuard(blocks, x, y, dir));
  }
  return false;
};

/**
 * Day 7, Puzzle 1
 */
const calibratedEquations1 = (input) => {
  let sum = 0;
  input.split('\n').forEach((line) => {
    const [goal, values] = line.split(': ').map((val, index) => {
      if (index === 0) {
        return +val;
      } else {
        return val.split(' ').map(Number);
      }
    });

    if (values.length === 1) {
      if (goal === values[0]) {
        sum += goal;
      }
      return;
    }

    let results = [values[0]];
    for (let i = 1; i < values.length; i++) {
      const sums = results.map((val) => val + values[i]);
      const products = results.map((val) => val * values[i]);
      results = sums.concat(products);
    }
    if (results.some((val) => val === goal)) {
      sum += goal;
    }
  });
  return sum;
};

/**
 * Day 7, Puzzle 2
 */
const calibratedEquations2 = (input) => {
  let sum = 0;
  input.split('\n').forEach((line) => {
    const [goal, values] = line.split(': ').map((val, index) => {
      if (index === 0) {
        return +val;
      } else {
        return val.split(' ').map(Number);
      }
    });

    if (values.length === 1) {
      if (goal === values[0]) {
        sum += goal;
      }
      return;
    }

    let results = [values[0]];
    for (let i = 1; i < values.length; i++) {
      let newResults = [];
      for (const val of results) {
        const sum = val + values[i];
        if (sum <= goal) {
          newResults.push(sum);
        }
        const prod = val * values[i];
        if (prod <= goal) {
          newResults.push(prod);
        }
        const concat = Number(`${val}${values[i]}`);
        if (concat <= goal) {
          newResults.push(concat);
        }
      }
      results = newResults;
    }
    if (results.some((val) => val === goal)) {
      sum += goal;
    }
  });
  return sum;
};

/**
 * Day 8, Puzzle 1
 * For each pair of antennae with matching frequency,
 * find two antenodes, which are located along the line connecting the pair
 * at exactly the same distance past one antenna as separates the two.
 *
 * Find how many unique locations within the map bounds contain an antenode.
 * If an antenode falls in the same spot as an antenna, it counts.
 */
const antenodes1 = (input) => {
  const antennae = {};
  const rows = input.split('\n');
  const maxX = rows[0].length - 1;
  const maxY = rows.length - 1;
  rows.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      if (cell === '.') {
        return;
      }
      const loc = `${x},${y}`;
      antennae[cell] ??= [];
      antennae[cell].push(loc);
    });
  });

  const antenodes = new Set();
  Object.values(antennae).forEach((list) => {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const [firstX, firstY] = list[i].split(',').map(Number);
        const [secondX, secondY] = list[j].split(',').map(Number);

        const x1 = firstX + firstX - secondX;
        const y1 = firstY + firstY - secondY;
        const x2 = secondX + secondX - firstX;
        const y2 = secondY + secondY - firstY;

        if (x1 >= 0 && x1 <= maxX && y1 >= 0 && y1 <= maxY) {
          antenodes.add(`${x1},${y1}`);
        }
        if (x2 >= 0 && x2 <= maxX && y2 >= 0 && y2 <= maxY) {
          antenodes.add(`${x2},${y2}`);
        }
      }
    }
  });

  return antenodes.size;
};

/**
 * Day 8, Puzzle 2
 * For each pair of antennae with matching frequency,
 * find all integer locations on the map including the antennae themselves
 * that fall directly on the line that connects the two antennae.
 *
 */
const antenodes2 = (input) => {
  const antennae = {};
  const rows = input.split('\n');
  const maxX = rows[0].length - 1;
  const maxY = rows.length - 1;
  rows.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      if (cell === '.') {
        return;
      }
      const loc = `${x},${y}`;
      antennae[cell] ??= [];
      antennae[cell].push(loc);
    });
  });

  const antenodes = new Set();
  Object.values(antennae).forEach((list) => {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const [firstX, firstY] = list[i].split(',').map(Number);
        const [secondX, secondY] = list[j].split(',').map(Number);

        antenodes.add(`${firstX},${firstY}`);
        antenodes.add(`${secondX},${secondY}`);

        let x1 = firstX + firstX - secondX;
        let y1 = firstY + firstY - secondY;
        while (x1 >= 0 && x1 <= maxX && y1 >= 0 && y1 <= maxY) {
          antenodes.add(`${x1},${y1}`);
          x1 = x1 + firstX - secondX;
          y1 = y1 + firstY - secondY;
        }

        let x2 = secondX + secondX - firstX;
        let y2 = secondY + secondY - firstY;

        while (x2 >= 0 && x2 <= maxX && y2 >= 0 && y2 <= maxY) {
          antenodes.add(`${x2},${y2}`);
          x2 = x2 + secondX - firstX;
          y2 = y2 + secondY - firstY;
        }
      }
    }
  });

  return antenodes.size;
};

/**
 * Day 9, Puzzle 1
 * Sets up an "amphipod" file/space map based on the puzzle input.
 * Fills in all the blank spaces by going one index at a time,
 * moving the right-most file spot into the left-most open space.
 *
 * Returns a checksum which is the sum of (index * value) for all spaces with numeric (file) values.
 */
const amphipodByBlock = (input) => {
  let id = 0;
  let i = 0;
  let isFile = true;
  let amph = [];
  let blanks = [];
  input.split('').forEach((el) => {
    for (let idx = 0; idx < +el; idx++) {
      if (isFile) {
        amph.push(id);
      } else {
        amph.push('X');
        blanks.push(i);
      }
      i++;
    }
    if (!isFile) {
      id++;
    }
    isFile = !isFile;
  });

  i--;

  let blank = blanks.shift();

  do {
    while (amph[i] === 'X') {
      i--;
    }
    amph[blank] = amph[i];
    amph[i] = 'X';

    blank = blanks.shift();
  } while (blanks.length && i >= blank);

  let checksum = 0;
  for (let idx = 0; idx < amph.length && amph[idx] !== 'X'; idx++) {
    checksum += amph[idx] * idx;
  }

  return checksum;
};

/**
 * Day 9, Puzzle 2
 * Sets up an "amphipod" file/space map based on the puzzle input.
 * Iterates through each whole file from right to left (highest id to lowest id),
 * attempting exactly once for each file to move it to an open space to the left of itself,
 * choosing the left-most space to its left in which it can fit.
 * Only try once for each file. If it can't be moved, it never moves and we check the next file.å
 *
 * Returns a checksum which is the sum of (index * value) for all spaces with numeric (file) values.
 */
const amphipodByFile = (input) => {
  let files = [];
  let blanks = [];
  let id = 0;
  let index = 0;
  let isFile = true;
  input.split('').forEach((el) => {
    const val = +el;
    if (isFile) {
      files.push({
        index,
        id,
        size: val,
      });
      id++;
    } else {
      blanks.push({ index, size: val });
    }
    index += val;
    isFile = !isFile;
  });

  for (let f = id - 1; f > 0; f--) {
    const file = files[f];
    const blankIndex = blanks.findIndex((b) => b.size >= file.size && b.index < file.index);
    if (blankIndex !== -1) {
      // NOTE: For completeness, we should blank out the space where the file was,
      // but it turns out we don't need to, because we never try to move anything there again,
      // and we don't care about spaces for the checksum
      // ------------------------------------------------
      // const blankBefore = blanks.findLast((b) => b.index < file.index);
      // const blankAfter = blanks.find((b) => b.index > file.index);
      // const beforeIsBlank = blankBefore
      //   ? blankBefore.index + blankBefore.size === file.index
      //   : false;
      // const afterIsBlank = blankAfter ? file.index + file.size === blankAfter.index : false;
      // if (beforeIsBlank) {
      //   blankBefore.size += file.size;
      //   if (afterIsBlank) {
      //     blankBefore.size += blankAfter.size;
      //     blanks = blanks.filter((b) => b.index !== blankAfter.index);
      //   }
      // } else if (afterIsBlank) {
      //   blankAfter.index -= file.size;
      //   blankAfter.size += file.size;
      // } else {
      //   blanks.push({ index: file.index, size: file.size });
      //   blanks.sort((a, b) => a.index - b.index);
      // }
      // ------------------------------------------------

      // Move the file to the space
      const blank = blanks[blankIndex];
      if (blank.size === file.size) {
        file.index = blank.index;
        blanks.splice(blankIndex, 1);
      } else {
        file.index = blank.index;
        blank.index += file.size;
        blank.size -= file.size;
      }
    }
  }

  let checksum = 0;
  files.forEach(({ index, id, size }) => {
    for (let i = index; i < index + size; i++) {
      checksum += i * id;
    }
  });
  return checksum;
};

/**
 * Day 10, Puzzle 1
 * Finds the number of trailhead (0) to trailend (9) pairings that can be made,
 * where a trail always goes 0123456789 moving orthogonally.
 * We only need to find how many 9s each 0 can reach, not how many ways it can get there.
 */
const findTrails = (input) => {
  const trails = new Set();
  const trailheads = [];
  const grid = input.split('\n').map((row, y) =>
    row.split('').map((cell, x) => {
      const val = +cell;
      if (val === 0) {
        trailheads.push({ startX: x, startY: y, curX: x, curY: y, val });
      }
      return val;
    }),
  );

  for (const trailhead of trailheads) {
    let paths = [trailhead];
    while (paths.length) {
      const path = paths.shift();
      function move(x, y) {
        const newVal = grid[y]?.[x];
        if (newVal !== path.val + 1) {
          return;
        }
        if (newVal === 9) {
          trails.add(`(${path.startX},${path.startY})-(${x},${y})`);
        } else {
          paths.push({ ...path, curX: x, curY: y, val: newVal });
        }
      }

      move(path.curX - 1, path.curY);
      move(path.curX + 1, path.curY);
      move(path.curX, path.curY - 1);
      move(path.curX, path.curY + 1);
    }
  }

  return trails.size;
};

/**
 * Day 10, Puzzle 2
 * Finds the number of distinct trails that can be made,
 * where a trail goes 0123456789 with only orthogonal movements.
 */
const findDistinctTrails = (input) => {
  let trailCount = 0;
  const trailheads = [];
  const grid = input.split('\n').map((row, y) =>
    row.split('').map((cell, x) => {
      const val = +cell;
      if (val === 0) {
        trailheads.push({ startX: x, startY: y, curX: x, curY: y, val });
      }
      return val;
    }),
  );

  for (const trailhead of trailheads) {
    let paths = [trailhead];
    while (paths.length) {
      const path = paths.shift();
      function move(x, y) {
        const newVal = grid[y]?.[x];
        if (newVal !== path.val + 1) {
          return;
        }
        if (newVal === 9) {
          trailCount++;
        } else {
          paths.push({ ...path, curX: x, curY: y, val: newVal });
        }
      }

      move(path.curX - 1, path.curY);
      move(path.curX + 1, path.curY);
      move(path.curX, path.curY - 1);
      move(path.curX, path.curY + 1);
    }
  }

  return trailCount;
};

/**
 * Day 11, Puzzle 1 & 2
 * Determines how many "pebbles" there will be after the given number of "blinks"
 */
const pebbleBlinks = (input, blinks) => {
  // pebbles maps values to the count of pebbles with that value
  let pebbles = {};
  let pebbleCount = 0;

  input.split(' ').forEach((val) => {
    incrementObjVal(pebbles, val, 1);
    pebbleCount++;
  });

  for (let i = 0; i < blinks; i++) {
    let newPebbles = {};
    for (const [val, count] of Object.entries(pebbles)) {
      if (val === '0') {
        incrementObjVal(newPebbles, '1', count);
      } else if (val.length % 2 === 0) {
        const mid = val.length / 2;
        incrementObjVal(newPebbles, `${+val.slice(0, mid)}`, count);
        incrementObjVal(newPebbles, `${+val.slice(mid)}`, count);
        // This is the only step in which pebbles are added,
        // so incremement the pebbleCount but the number of pebbles we just added
        pebbleCount += count;
      } else {
        incrementObjVal(newPebbles, `${+val * 2024}`, count);
      }
    }
    pebbles = newPebbles;
  }

  return pebbleCount;
};

// This was my first attempt, which worked well for part one,
// but got slow somewhere in the 30s and would completely overflow in the mid-40s.
// Even various attempts at batching still never made it to 50, let alone 75 blinks.
const pebbleBlinksOld = (input, blinks) => {
  let pebbles = input.split(' ');
  let pebbleCount = 0;
  while (pebbles.length) {
    const pebble = pebbles.shift();
    let pebblesToProcess = [pebble];
    for (let i = 0; i < blinks; i++) {
      let newPebbles = [];
      for (const p of pebblesToProcess) {
        const blinked = blink(p);
        newPebbles.push(...blinked);
      }
      pebblesToProcess = newPebbles;
    }
    pebbleCount += pebblesToProcess.length;
  }

  return pebbleCount;
};

const blink = (val) => {
  if (val === '0') {
    return ['1'];
  }
  if (val.length % 2 === 0) {
    const mid = val.length / 2;
    return [`${+val.slice(0, mid)}`, `${+val.slice(mid)}`];
  }
  return [`${+val * 2024}`];
};

/**
 * Day 12, Puzzle 1
 * Calculates the price of garden fences by computing:
 *   For each contiguous region of the same letter,
 *   Multiply the area (number of cells with the letter)
 *   by the simple perimeter (length of its entire border).
 * Returns the sum of these products
 *
 * Note that the same fence is typically counted twice, once for the region on each side
 */
const gardenFencePerimeter = (input) => {
  let counted = new Set();
  let price = 0;
  const grid = input.split('\n').map((row) => row.split(''));

  // Iterate through each element of the grid, and find the whole region it's in
  // (once that region's been tracked, will skip additional processing on the rest of its elements)
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (counted.has(`${row},${col}`)) continue;
      const val = grid[row][col]; // The letter of the garden region
      const coords = new Set([`${row},${col}`]); // Will contain all the coordinates of this region

      // Iterate over all the coords we've already foound, and add their neighbors in the region to the list we're iterating over
      coords.forEach((loc) => {
        const [r, c] = loc.split(',').map(Number);
        if (grid[r - 1]?.[c] === val) coords.add(`${r - 1},${c}`);
        if (grid[r + 1]?.[c] === val) coords.add(`${r + 1},${c}`);
        if (grid[r]?.[c - 1] === val) coords.add(`${r},${c - 1}`);
        if (grid[r]?.[c + 1] === val) coords.add(`${r},${c + 1}`);
      });
      const area = coords.size;
      let perimeter = 0;

      // Iterate over each coordinate and check each of its four sides.
      // if it's neighbor is not a member of this region (another region or an edge, add to the perimeter count
      coords.forEach((loc) => {
        const [r, c] = loc.split(',').map(Number);
        if (grid[r - 1]?.[c] !== val) perimeter++;
        if (grid[r + 1]?.[c] !== val) perimeter++;
        if (grid[r]?.[c - 1] !== val) perimeter++;
        if (grid[r]?.[c + 1] !== val) perimeter++;
      });
      // console.log(`${val}: ${area} * ${perimeter}`);
      price += area * perimeter;
      // Add all the region coords to our list of tracked coords, so we don't double count this region
      counted = counted.union(coords);
    }
  }
  return price;
};

/**
 * Day 12, Puzzle 2
 * Calculates the price of garden fences by computing:
 *   For each contiguous region of the same letter,
 *   Multiply the area (number of cells with the letter)
 *   by number of sides its border has (regardless of side length).
 * Returns the sum of these products
 */
const gardenFenceSides = (input) => {
  let counted = new Set();
  let price = 0;
  const grid = input.split('\n').map((row) => row.split(''));

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (counted.has(`${row},${col}`)) continue;
      const val = grid[row][col];
      const coords = new Set([`${row},${col}`]);
      coords.forEach((loc) => {
        const [r, c] = loc.split(',').map(Number);
        if (grid[r - 1]?.[c] === val) coords.add(`${r - 1},${c}`);
        if (grid[r + 1]?.[c] === val) coords.add(`${r + 1},${c}`);
        if (grid[r]?.[c - 1] === val) coords.add(`${r},${c - 1}`);
        if (grid[r]?.[c + 1] === val) coords.add(`${r},${c + 1}`);
      });
      const area = coords.size;

      // Create an object for each of the four sides of a square, it will have numeric keys, and values of number[]
      // We will add the index each fence segment to the correct array in the correct object
      // We will then iterate through each array in each object and count distinct fence regions, by tracking how many
      // nonconsecutive groups there are. For instance: [1,2,3] = 1. [1,2,3,6,11,12] = 3
      let tops = {};
      let bottoms = {};
      let lefts = {};
      let rights = {};
      coords.forEach((loc) => {
        const [r, c] = loc.split(',').map(Number);
        if (grid[r - 1]?.[c] !== val) {
          tops[r] ??= [];
          tops[r].push(c);
        }
        if (grid[r + 1]?.[c] !== val) {
          bottoms[r + 1] ??= [];
          bottoms[r + 1].push(c);
        }
        if (grid[r]?.[c - 1] !== val) {
          lefts[c] ??= [];
          lefts[c].push(r);
        }
        if (grid[r]?.[c + 1] !== val) {
          rights[c + 1] ??= [];
          rights[c + 1].push(r);
        }
      });

      // Counts the number of groups of consecutive numbers in arr, when sorted
      // Ex: [1,2,3] = 1.
      //      [1,2,3, 6, 11,12] = 3
      const countSides = (total, arr) => {
        let count = 1;
        arr.sort((a, b) => a - b);
        for (let i = 0, j = 1; j < arr.length; i++, j++) {
          if (arr[j] - arr[i] > 1) {
            count++;
          }
        }
        return total + count;
      };

      const sides =
        Object.values(tops).reduce(countSides, 0) +
        Object.values(bottoms).reduce(countSides, 0) +
        Object.values(lefts).reduce(countSides, 0) +
        Object.values(rights).reduce(countSides, 0);
      // console.log(`${val}: ${area} * ${sides}`);
      price += area * sides;
      counted = counted.union(coords);
    }
  }
  return price;
};

/**
 * Day 13, Puzzle 1 & 2
 * Determines how many tokens it will take to solve each solvable crane game.
 * It costs 3 tokens to press A and 1 token to press B.
 * A game is solvable if there are integer values for pressing buttons A and B that will reach the target X,Y coordinate
 *
 * The function opttionally takes an offset value which will be added to the prize values of each provided crane game (for part 2)
 *
 * Each crane game can be converted to a system of equations like so:
 *   Button A: X+94, Y+34
 *   Button B: X+22, Y+67
 *   Prize: X=8400, Y=5400
 *
 *   94a + 22b = 8400 + offset
 *   34a + 67b = 5400 + offset
 *
 * This game, with 0 offset, solves to a = 80 and b = 40.
 * so it would cost 3 * 80 + 1 * 40 = 280 tokens to win this game.
 */
const craneGame = (input, offset = 0) => {
  let tokens = 0;
  const regex =
    /Button A: X\+(?<a1>\d+), Y\+(?<b1>\d+)\nButton B: X\+(?<a2>\d+), Y\+(?<b2>\d+)\nPrize: X=(?<res1>\d+), Y=(?<res2>\d+)/m;
  for (const game of input.split('\n\n')) {
    const matches = game.match(regex);
    const { a1, a2, b1, b2, res1, res2 } = matches.groups;
    const [a, b] = solveLinearSystem([+a1, +a2, +res1 + offset], [+b1, +b2, +res2 + offset]);
    // Verify that a and b are both integers, and if so, add the corresponding token cound
    if (Math.floor(a) === Math.ceil(a) && Math.floor(b) === Math.ceil(b)) {
      tokens += 3 * a + b;
    }
  }
  return tokens;
};

/**
 * Day 14, Part 1
 * Determines where the robots will be when given:
 * @param input - their starting positions and velocity
 * @param width - the width of the map, robots will wrap around when hitting an edge
 * @param height - the height of the map, robots will wrap around when hitting an edge
 * @param seconds - how many seconds elapse (number of moves to make)
 *
 * After making all the moves, groups the robots into four quadrants, TL, BL, TR and BR,
 * counts how many are in each quadrant, and returns the product of these four values.
 * If given odd width/height, the dividing lines could contain robots - ignore them.
 */
const bathroomRobots = (input, width = 101, height = 103, seconds = 100) => {
  const regex = /^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/;
  const robots = input.split('\n').map((row) => {
    const [x, y, vx, vy] = row.match(regex).slice(1).map(Number);
    return { x, y, vx, vy };
  });
  let TL = 0;
  let TR = 0;
  let BL = 0;
  let BR = 0;
  for (const robot of robots) {
    let { x, y, vx, vy } = robot;
    for (let i = 0; i < seconds; i++) {
      x += vx;
      while (x < 0) {
        x += width;
      }
      x %= width;
      y += vy;
      while (y < 0) {
        y += height;
      }
      y %= height;
    }
    const xMid = Math.floor(width / 2);
    const yMid = Math.floor(height / 2);
    if (x < xMid && y < yMid) {
      TL++;
    } else if (x < xMid && y > yMid) {
      BL++;
    } else if (x > xMid && y < yMid) {
      TR++;
    } else if (x > xMid && y > yMid) {
      BR++;
    }
  }
  return TL * BL * TR * BR;
};

let xmasRobots = [];
let xmasRobotMoves = 0;
const xmasRobotMapWidth = 101;
const xmasRobotMapHeight = 103;

/**
 * Day 14, Part 2
 * Determines how many moves it takes for the bathroom robots
 * to end up forming a christmas tree.
 *
 * Since I had no idea what this xmas tree would look like, I originally had to brute force it
 * to draw each iteration to the screen and manually move until I saw it.
 * After seeing what it actually looked like, I came up with a simple way to check for it
 * that wasn't just hard-coding the answer -- my assumption (which proved correct) was that
 * an xmas tree would have a column of at least 20 consecutive robots, and that wouldn't happen otherwise.
 *
 * This proved true, so that's the logic that this method now runs with.
 */
const christmasTreeRobots = (input) => {
  const regex = /^p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)$/;
  xmasRobots = input.split('\n').map((row) => {
    const [x, y, vx, vy] = row.match(regex).slice(1).map(Number);
    return { x, y, vx, vy };
  });

  while (!detectXmasTree()) {
    moveXmasRobots();
  }

  drawXmasRobots();
  return xmasRobotMoves;
};

const moveXmasRobots = () => {
  xmasRobots = xmasRobots.map((robot) => {
    const { x: oldX, y: oldY, vx, vy } = robot;
    let x = oldX + vx;
    while (x < 0) {
      x += xmasRobotMapWidth;
    }
    x %= xmasRobotMapWidth;
    let y = oldY + vy;
    while (y < 0) {
      y += xmasRobotMapHeight;
    }
    y %= xmasRobotMapHeight;
    return { x, y, vx, vy };
  });
  xmasRobotMoves++;
};

const undoMoveXmasRobots = () => {
  xmasRobots = xmasRobots.map((robot) => {
    const { x: oldX, y: oldY, vx, vy } = robot;
    let x = oldX - vx;
    while (x < 0) {
      x += xmasRobotMapWidth;
    }
    x %= xmasRobotMapWidth;
    let y = oldY - vy;
    while (y < 0) {
      y += xmasRobotMapHeight;
    }
    y %= xmasRobotMapHeight;
    return { x, y, vx, vy };
  });
  xmasRobotMoves--;
};

/**
 * Returns true if the current robot config contains a column of at least 20 consecutive robots
 */
const detectXmasTree = () => {
  const longestConsecutiveGroup = (arr) => {
    const sorted = arr.toSorted((a, b) => a - b);
    let maxGroup = 0;
    let curGroup = 1;
    for (let i = 0, j = 1; j < sorted.length; i++, j++) {
      if (sorted[j] - sorted[i] === 1) {
        curGroup++;
      } else {
        if (curGroup > maxGroup) {
          maxGroup = curGroup;
        }
        curGroup = 1;
      }
    }
    return maxGroup;
  };

  let cols = [];
  xmasRobots.forEach(({ x, y }) => {
    cols[x] ??= [];
    cols[x].push(y);
  });

  return cols.some((col) => longestConsecutiveGroup(col) > 20);
};

const drawXmasRobots = () => {
  const imageDiv = document.getElementById('day14visualization');
  imageDiv.innerHTML = '';
  for (let r = 0; r < xmasRobotMapHeight; r++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('day14row');
    for (let c = 0; c < xmasRobotMapWidth; c++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('day14cell');
      if (xmasRobots.some(({ x, y }) => x === c && y === r)) {
        cellDiv.classList.add('green');
      } else {
        cellDiv.classList.add('black');
      }
      rowDiv.appendChild(cellDiv);
    }
    imageDiv.appendChild(rowDiv);
  }

  document.getElementById('day14').style.display = 'block';

  const subtitleDiv = document.getElementById('day14subtitle');
  subtitleDiv.innerHTML = `Moves: ${xmasRobotMoves}`;
};

/**
 * Day 15, Puzzle 1
 */
const lanternBoxes = (input) => {
  let curX = 0; // robot X (column)
  let curY = 0; // robot Y (row)
  let boxes = new Set(); // coordinates of boxes
  let walls = new Set(); // coordinates of walls

  const coord = (x, y) => `${x},${y}`;

  const [map, moves] = input.split('\n\n');
  map.split('\n').forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      switch (cell) {
        case '@':
          curX = x;
          curY = y;
          break;
        case '#':
          walls.add(xyToString(x, y));
          break;
        case 'O':
          boxes.add(xyToString(x, y));
          break;
      }
    });
  });

  moves.split('').forEach((move) => {
    switch (move) {
      case '^':
        if (walls.has(xyToString(curX, curY - 1))) {
          break;
        }
        if (boxes.has(xyToString(curX, curY - 1))) {
          let nextUp = curY - 2;
          while (boxes.has(xyToString(curX, nextUp))) {
            nextUp--;
          }
          if (walls.has(xyToString(curX, nextUp))) {
            break;
          } else {
            boxes.delete(xyToString(curX, curY - 1));
            boxes.add(xyToString(curX, nextUp));
          }
        }
        curY--;
        break;
      case 'v':
        if (walls.has(xyToString(curX, curY + 1))) {
          break;
        }
        if (boxes.has(xyToString(curX, curY + 1))) {
          let nextUp = curY + 2;
          while (boxes.has(xyToString(curX, nextUp))) {
            nextUp++;
          }
          if (walls.has(xyToString(curX, nextUp))) {
            break;
          } else {
            boxes.delete(xyToString(curX, curY + 1));
            boxes.add(xyToString(curX, nextUp));
          }
        }
        curY++;
        break;
      case '<':
        if (walls.has(xyToString(curX - 1, curY))) {
          break;
        }
        if (boxes.has(xyToString(curX - 1, curY))) {
          let nextUp = curX - 2;
          while (boxes.has(xyToString(nextUp, curY))) {
            nextUp--;
          }
          if (walls.has(xyToString(nextUp, curY))) {
            break;
          } else {
            boxes.delete(xyToString(curX - 1, curY));
            boxes.add(xyToString(nextUp, curY));
          }
        }
        curX--;
        break;
      case '>':
        if (walls.has(xyToString(curX + 1, curY))) {
          break;
        }
        if (boxes.has(xyToString(curX + 1, curY))) {
          let nextUp = curX + 2;
          while (boxes.has(xyToString(nextUp, curY))) {
            nextUp++;
          }
          if (walls.has(xyToString(nextUp, curY))) {
            break;
          } else {
            boxes.delete(xyToString(curX + 1, curY));
            boxes.add(xyToString(nextUp, curY));
          }
        }
        curX++;
        break;
    }
  });

  // console.log({ curX, curY, boxes });
  let gps = 0;
  boxes.forEach((box) => {
    const [x, y] = box.split(',').map(Number);
    gps += x + 100 * y;
  });
  return gps;
};

/**
 * Day 15, Puzzle 2
 */
const lanternDoubleBoxes = (input) => {
  let curX = 0; // robot X (column)
  let curY = 0; // robot Y (row)
  let items = {}; // coordinates of boxes: 'left' | 'right' | 'wall'

  const [map, moves] = input.split('\n\n');
  map.split('\n').forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      const x1 = x * 2;
      const x2 = x1 + 1;

      switch (cell) {
        case '@':
          curX = x1;
          curY = y;
          break;
        case '#':
          items[xyToString(x1, y)] = 'wall';
          items[xyToString(x2, y)] = 'wall';
          break;
        case 'O':
          items[xyToString(x1, y)] = 'left';
          items[xyToString(x2, y)] = 'right';
          break;
      }
    });
  });

  const getNextX = (move, x) => {
    switch (move) {
      case '^':
      case 'v':
        return x;
      case '<':
        return x - 1;
      case '>':
        return x + 1;
    }
  };

  const getNextY = (move, y) => {
    switch (move) {
      case '^':
        return y - 1;
      case 'v':
        return y + 1;
      case '<':
      case '>':
        return y;
    }
  };

  moves.split('').forEach((move) => {
    let hitWall = false;
    let boxes = {};
    switch (move) {
      case '^':
      case 'v': {
        let nextY = getNextY(move, curY);
        let currentRow = new Set([curX]);
        let hasBoxes = true;
        while (!hitWall && hasBoxes) {
          const nextRow = new Set();
          hasBoxes = false;
          for (const x of currentRow) {
            const nextCoords = xyToString(x, nextY);
            const nextVal = items[nextCoords];
            if (nextVal === 'wall') {
              hitWall = true;
              break;
            } else if (nextVal === 'left') {
              nextRow.add(x);
              nextRow.add(x + 1);
              boxes[nextCoords] = nextVal;
              boxes[xyToString(x + 1, nextY)] = 'right';
              hasBoxes = true;
            } else if (nextVal === 'right') {
              nextRow.add(x);
              nextRow.add(x - 1);
              boxes[nextCoords] = nextVal;
              boxes[xyToString(x - 1, nextY)] = 'left';
              hasBoxes = true;
            }
          }
          currentRow = new Set(nextRow);
          nextY = getNextY(move, nextY);
        }

        if (hitWall) {
          break;
        }
        // Move
        Object.keys(boxes).forEach((coords) => delete items[coords]);
        Object.entries(boxes).forEach(([coords, val]) => {
          const [x, y] = getXY(coords);
          const nextCoord = xyToString(getNextX(move, x), getNextY(move, y));
          items[nextCoord] = val;
        });
        curX = getNextX(move, curX);
        curY = getNextY(move, curY);
        break;
      }
      case '<':
      case '>': {
        let nextX = getNextX(move, curX);
        let isBox = true;
        while (!hitWall && isBox) {
          isBox = false;
          const nextCoords = xyToString(nextX, curY);
          const nextVal = items[nextCoords];
          if (nextVal === 'wall') {
            hitWall = true;
            break;
          } else if (nextVal) {
            boxes[nextCoords] = nextVal;
            isBox = true;
          }
          nextX = getNextX(move, nextX);
        }

        if (hitWall) {
          break;
        }
        // Move
        Object.keys(boxes).forEach((coords) => delete items[coords]);
        Object.entries(boxes).forEach(([coords, val]) => {
          const [x, y] = getXY(coords);
          const nextCoord = xyToString(getNextX(move, x), getNextY(move, y));
          items[nextCoord] = val;
        });
        curX = getNextX(move, curX);
        curY = getNextY(move, curY);
        break;
      }
    }
  });

  let gps = 0;
  Object.entries(items).forEach(([coords, val]) => {
    if (val !== 'left') return;
    const [x, y] = getXY(coords);
    gps += x + 100 * y;
  });
  return gps;
};

/**
 * Day 16, Puzzle 1
 */
const reindeerMaze = (input) => {
  let start = '';
  let startX = 0;
  let startY = 0;
  let end = '';
  let open = new Set();
  let minScore = Number.MAX_VALUE;
  // let bestPath = new Set();
  input.split('\n').forEach((row, y) => {
    row.split('').forEach((val, x) => {
      if (val === '#') return;
      const coords = xyToString(x, y);
      if (val === 'S') {
        start = coords;
        startX = x;
        startY = y;
      } else if (val === 'E') {
        end = coords;
      } else if (val === '.') {
        open.add(coords);
      }
    });
  });

  let paths = [{ path: [start], curX: startX, curY: startY, dir: '>', score: 0 }];
  function getMove(x, y, dir, score) {
    return { x, y, coords: xyToString(x, y), dir, score };
  }

  while (paths.length) {
    // console.log(paths[0]);
    const { path, curX, curY, dir, score } = paths.shift();
    let moves = [];
    switch (dir) {
      case '>':
        moves.push(getMove(curX + 1, curY, dir, 1));
        moves.push(getMove(curX, curY + 1, 'v', 1001));
        moves.push(getMove(curX, curY - 1, '^', 1001));
        break;
      case '^':
        moves.push(getMove(curX, curY - 1, dir, 1));
        moves.push(getMove(curX + 1, curY, '>', 1001));
        moves.push(getMove(curX - 1, curY, '<', 1001));
        break;
      case '<':
        moves.push(getMove(curX - 1, curY, dir, 1));
        moves.push(getMove(curX, curY - 1, '^', 1001));
        moves.push(getMove(curX, curY + 1, 'v', 1001));
        break;
      case 'v':
        moves.push(getMove(curX, curY + 1, dir, 1));
        moves.push(getMove(curX - 1, curY, '<', 1001));
        moves.push(getMove(curX + 1, curY, '>', 1001));
        break;
    }

    moves.forEach((move) => {
      if (end === move.coords) {
        const finalScore = score + move.score;
        if (minScore > finalScore) {
          console.log('new best');
          console.log(finalScore);
          minScore = finalScore;
          // bestPath = path;
        }
      } else if (
        open.has(move.coords) &&
        !path.includes(move.coords) &&
        score + move.score < minScore
      ) {
        console.log(path.length, move.coords);
        paths.unshift({
          path: path.concat(move.coords),
          curX: move.x,
          curY: move.y,
          dir: move.dir,
          score: score + move.score,
        });
      }
    });
  }
  // console.log(bestPath);
  return minScore;
};
