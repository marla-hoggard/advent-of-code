const day1puzzle1 = (input) => {
  let dial = 50;
  let zeros = 0;
  input.split('\n').forEach((rot) => {
    const [op, amt] = [rot[0], +rot.slice(1)];
    if (op === 'L') {
      dial -= amt;
      while (dial < 0) {
        dial += 100;
      }
    } else if (op === 'R') {
      dial += amt;
      while (dial > 99) {
        dial -= 100;
      }
    }
    if (dial === 0) {
      zeros++;
    }
  });

  return zeros;
};

const day1puzzle2 = (input) => {
  let dial = 50;
  let zeros = 0;
  input.split('\n').forEach((rot) => {
    let [op, amt] = [rot[0], +rot.slice(1)];

    // If the amount to rotate is over 100, count how many hundreds as 0s
    zeros += Math.floor(amt / 100);
    // Then cut the amount to its equivalent under 100
    amt %= 100;

    if (op === 'L') {
      // If we're going to the left further than the current spot,
      // we're going to hit zero unless we started from zero
      if (amt >= dial && dial !== 0) {
        zeros++;
      }

      // Turn the dial + recallibrate to 0-99
      dial -= amt;
      if (dial < 0) {
        dial += 100;
      }
    } else {
      // Turn the dial + recallibrate to 0-99
      // We don't have to account for the extra 0 here like above,
      // because hitting zero in a right turn is always hitting 100.
      dial += amt;
      if (dial > 99) {
        zeros++;
        dial -= 100;
      }
    }
  });

  return zeros;
};

const day2puzzle1 = (input) => {
  let invalidIds = 0;
  input.split(',').forEach((range) => {
    const [start, end] = range.split('-');
    if (start.length === end.length && start.length % 2 === 1) {
      return;
    }
    for (let i = +start; i <= +end; i++) {
      if (isInvalid1(i.toString())) {
        invalidIds += i;
      }
    }
  });

  return invalidIds;
};

const isInvalid1 = (str) => {
  const len = str.length;
  if (len % 2 !== 0) {
    return false;
  }

  const firstHalf = str.slice(0, len / 2);
  const secondHalf = str.slice(len / 2);
  return firstHalf === secondHalf;
};

const day2puzzle2 = (input) => {
  let invalidIds = 0;
  input.split(',').forEach((range) => {
    const [start, end] = range.split('-');
    for (let i = +start; i <= +end; i++) {
      if (isInvalid2(i.toString())) {
        invalidIds += i;
      }
    }
  });

  return invalidIds;
};

const isInvalid2 = (str) => {
  const len = str.length;

  for (let i = 1; i <= len / 2; i++) {
    if (len % i !== 0) {
      continue;
    }

    const matcher = str.slice(0, i);
    let valid = true;
    for (let j = i; j < len; j += i) {
      const substr = str.slice(j, j + i);
      if (substr !== matcher) {
        valid = false;
        break;
      }
    }
    if (valid) {
      return true;
    }
  }
  return false;
};

const isInvalid2a = (str) => {
  const len = str.length;

  for (let i = 1; i <= len / 2; i++) {
    if (len % i !== 0) {
      continue;
    }

    const matcher = str.slice(0, i);
    const times = len / i;
    if (str === matcher.repeat(times)) {
      return true;
    }
  }
  return false;
};

const day3 = (input, len) => {
  let joltage = 0;
  input.split('\n').forEach((bank) => {
    let i = len;
    let str = bank;
    let jolt = '';
    while (i > 0) {
      const substring = i > 1 ? str.slice(0, 1 - i) : str;
      const { max, index } = findMaxDigit(substring);
      jolt += max;
      str = str.slice(index + 1);
      i--;
    }

    joltage += +jolt;
  });
  return joltage;
};

// Initial puzzle 1 solution, before being generalized for both parts - unused now
const day3puzzle1 = (input) => {
  let joltage = 0;
  input.split('\n').forEach((bank) => {
    const firstDigit = findMaxDigit(bank.slice(0, -1));
    const secondDigit = findMaxDigit(bank.slice(firstDigit.index + 1));
    const jolt = Number(`${firstDigit.max}${secondDigit.max}`);
    joltage += jolt;
  });
  return joltage;
};

const findMaxDigit = (str) => {
  let max = 0;
  let index = 0;
  const digits = str.split('');
  for (let i = 0; i < digits.length; i++) {
    const char = +digits[i];

    if (char === 9) {
      return { max: 9, index: i };
    } else if (char > max) {
      max = char;
      index = i;
    }
  }
  return { max, index };
};

const day4puzzle1 = (input) => {
  let spaces = 0;
  input.split('\n').forEach((row, y, grid) => {
    row.split('').forEach((cell, x, row) => {
      if (cell !== '@') {
        return;
      }

      let adj = 0;
      for (let c = x - 1; c <= x + 1; c++) {
        for (let r = y - 1; r <= y + 1; r++) {
          if (grid[r]?.[c] === '@') {
            adj++;
            if (adj > 4) {
              return;
            }
          }
        }
      }

      // Checking for 5 not 4 because the loop
      // includes (x,y) itself which is always @
      // but should not count towards the < 4
      if (adj < 5) {
        spaces++;
      }
    });
  });
  return spaces;
};

const day4puzzle2 = (input) => {
  let removed = 0;
  let grid = input.split('\n').map((row) => row.split(''));
  while (true) {
    const result = forkliftRound(grid);
    if (result.count > 0) {
      grid = result.grid;
      removed += result.count;
    } else {
      return removed;
    }
  }
};

const forkliftRound = (grid) => {
  let count = 0;
  const updatedGrid = grid.map((row, y, grid) => {
    return row.map((cell, x, row) => {
      if (cell !== '@') {
        return cell;
      }

      let adj = 0;
      for (let c = x - 1; c <= x + 1; c++) {
        for (let r = y - 1; r <= y + 1; r++) {
          if (grid[r]?.[c] === '@') {
            adj++;
            if (adj > 4) {
              return cell;
            }
          }
        }
      }

      // Checking for 5 not 4 because the loop
      // includes (x,y) itself which is always @
      // but should not count towards the < 4
      if (adj < 5) {
        count++;
        return 'x';
      }
    });
  });
  return {
    count,
    grid: updatedGrid,
  };
};

const day5puzzle1 = (input) => {
  const [rawRanges, ings] = input.split('\n\n');
  const ranges = rawRanges.split('\n').map((str) => {
    return str.split('-').map((el) => +el);
  });

  let fresh = 0;

  ings.split('\n').forEach((ing) => {
    if (ranges.some((range) => isInRange(ing, range))) {
      fresh++;
    }
  });

  return fresh;
};

const isInRange = (val, range) => {
  const [start, end] = range;
  const value = Number(val);
  return value >= start && value <= end;
};

const day5puzzle2 = (input) => {
  let ranges = input
    .split('\n\n')[0]
    .split('\n')
    .map((str) => {
      return str.split('-').map((el) => +el);
    })
    .sort(sortRanges);

  // Keep going through the loop if at least one range was flattened in this while iteration
  let keepGoing = true;
  while (keepGoing) {
    keepGoing = false;
    let nextRanges = [];
    let targetRange = ranges[0];

    // Iterate through each range in ranges, starting with the second range,
    // comparing with the target range, where the target range is the range right before it
    // in the latest sorted list - which may me a combination of ranges that originally came before it
    for (let i = 1; i < ranges.length; i++) {
      const combined = combineRanges(targetRange, ranges[i]);
      if (combined.length === 2) {
        nextRanges.push(combined[0]);
        targetRange = combined[1];
      } else {
        targetRange = combined[0];
        keepGoing = true;
      }
    }
    nextRanges.push(targetRange);
    ranges = nextRanges;
  }

  console.log(ranges);

  let fresh = 0;
  for (const range of ranges) {
    fresh += range[1] - range[0] + 1;
  }
  return fresh;
};

/**
 * Sort method for sorting an array of ranges
 * @param {[number, number]} range1
 * @param {[number, number]} range2
 * @returns { number }
 */
const sortRanges = (range1, range2) => {
  if (range1[0] < range2[0]) {
    return -1;
  } else if (range1[0] > range2[0]) {
    return 1;
  } else if (range1[1] < range2[1]) {
    return -1;
  } else if (range1[1] > range2[1]) {
    return 1;
  }
  return 0;
};

/**
 * Sort method for sorting an array of ranges
 * @param {[number, number]} range1
 * @param {[number, number]} range2
 * @returns { [number, number][] }
 */
const combineRanges = (range1, range2) => {
  const [first, second] = [range1, range2].sort(sortRanges);

  const [start1, end1] = first;
  const [start2, end2] = second;

  if (end1 < start2) {
    return [first, second];
  }
  if (end1 < end2) {
    return [[start1, end2]];
  }

  return [[start1, end1]];
};

const day6puzzle1 = (input) => {
  const rows = input.split('\n').map((row) => row.trim().split(/\s+/));
  const ops = rows.at(-1);
  return ops.reduce((total, op, i) => {
    switch (op) {
      case '+':
        return (total += rows.slice(0, -1).reduce((sum, row) => sum + Number(row[i]), 0));
      case '*':
        return (total += rows.slice(0, -1).reduce((prod, row) => prod * Number(row[i]), 1));
      default:
        return 'Invalid operand';
    }
  }, 0);
};

const day6puzzle2 = (input) => {
  const rows = input.split('\n');
  const numericRows = rows.slice(0, -1);
  const opsRow = rows.at(-1);
  let total = 0;
  let values = [];

  for (let i = rows[0].length - 1; i >= 0; i--) {
    // Construct the value by concatenating a string of each digit
    const val = numericRows.reduce((str, row) => str + row[i].trim(), '');

    if (!val) continue;

    values.push(+val);

    if (opsRow[i] === '+') {
      total += values.reduce((sum, cur) => sum + cur, 0);
      values = [];
    } else if (opsRow[i] === '*') {
      total += values.reduce((sum, cur) => sum * cur, 1);
      values = [];
    }
  }
  return total;
};
