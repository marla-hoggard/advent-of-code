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
