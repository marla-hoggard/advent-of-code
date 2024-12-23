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
