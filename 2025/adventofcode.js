// @ts-nocheck
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

/**
 * Count the number of times a beam is split
 * In this puzzle, when two beams end up in the same spot, they merge,
 * so we use Set to dedupe, only counting each once.
 */
const day7puzzle1 = (input) => {
  const grid = input.split('\n');
  const maxX = grid[0].length - 1;
  const maxY = grid.length - 1;
  const startY = grid.findIndex((r) => r.includes('S'));
  const startX = grid[startY].indexOf('S');
  let splitCount = 0;
  let beams = new Set([xyToString(startX, startY)]);
  for (let i = startY; i < maxY; i++) {
    let newBeams = new Set();
    beams.forEach((beam) => {
      let [x, y] = getXY(beam);
      y++;

      if (grid[y][x] === '^') {
        splitCount++;
        if (x > 0) {
          newBeams.add(xyToString(x - 1, y));
        }
        if (x < maxX) {
          newBeams.add(xyToString(x + 1, y));
        }
      } else {
        newBeams.add(xyToString(x, y));
      }
    });
    beams = newBeams;
  }
  return splitCount;
};

/**
 * Find the total number of paths the beams take
 * Unlike the first puzzle, in this one we don't want to merge beams in the same spot.
 * Instead, we keep a count of the number of beams in each spot
 * When we get to the bottom, we count up the total number of tracked beams
 */
const day7puzzle2 = (input) => {
  const grid = input.split('\n');
  const maxX = grid[0].length - 1;
  const maxY = grid.length - 1;
  const startY = grid.findIndex((r) => r.includes('S'));
  const startX = grid[startY].indexOf('S');
  let beams = { [xyToString(startX, startY)]: 1 };
  for (let i = startY; i < maxY; i++) {
    let newBeams = {};

    Object.entries(beams).forEach(([beam, count]) => {
      let [x, y] = getXY(beam);
      y++;

      if (grid[y][x] === '^') {
        if (x > 0) {
          incrementObjVal(newBeams, xyToString(x - 1, y), count);
        }
        if (x < maxX) {
          incrementObjVal(newBeams, xyToString(x + 1, y), count);
        }
      } else {
        incrementObjVal(newBeams, xyToString(x, y), count);
      }
    });
    beams = newBeams;
  }
  console.log(beams);
  return sum(Object.values(beams));
};

const day8puzzle1 = (input, count) => {
  const coords = input.split('\n');
  const distances = [];
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const first = coords[i];
      const second = coords[j];
      const distance = directDistance(getXYZ(first), getXYZ(second));
      distances.push({ distance, coords: [first, second] });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);
  const connections = distances.slice(0, count);

  let circuits = [];
  const connected = new Set();

  for (const conn of connections) {
    const [first, second] = conn.coords;

    if (connected.has(first) && connected.has(second)) {
      const index1 = circuits.findIndex((el) => el.has(first));
      const index2 = circuits.findIndex((el) => el.has(second));

      if (index1 === index2) {
        continue;
      }

      const combo = new Set(circuits[index1].union(circuits[index2]));
      circuits = circuits.filter((_, i) => i !== index1 && i !== index2).concat(combo);
    } else if (connected.has(first)) {
      const index = circuits.findIndex((el) => el.has(first));
      circuits[index].add(second);
    } else if (connected.has(second)) {
      const index = circuits.findIndex((el) => el.has(second));
      circuits[index].add(first);
    } else {
      circuits.push(new Set([first, second]));
    }
    connected.add(first);
    connected.add(second);
  }

  circuits.sort((a, b) => b.size - a.size);
  console.log(circuits);

  return circuits[0].size * circuits[1].size * circuits[2].size;
};

const day8puzzle2 = (input) => {
  const coords = input.split('\n');
  const distances = [];
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const first = coords[i];
      const second = coords[j];
      const distance = directDistance(getXYZ(first), getXYZ(second));
      distances.push({ distance, coords: [first, second] });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  let circuits = [];
  const connected = new Set();
  let i = 0;

  for (const conn of distances) {
    const [first, second] = conn.coords;

    if (connected.has(first) && connected.has(second)) {
      const index1 = circuits.findIndex((el) => el.has(first));
      const index2 = circuits.findIndex((el) => el.has(second));

      if (index1 === index2) {
        continue;
      }

      const combo = new Set(circuits[index1].union(circuits[index2]));
      circuits = circuits.filter((_, i) => i !== index1 && i !== index2).concat(combo);
    } else if (connected.has(first)) {
      const index = circuits.findIndex((el) => el.has(first));
      circuits[index].add(second);
    } else if (connected.has(second)) {
      const index = circuits.findIndex((el) => el.has(second));
      circuits[index].add(first);
    } else {
      circuits.push(new Set([first, second]));
    }
    connected.add(first);
    connected.add(second);

    if (connected.size === coords.length && circuits.length === 1) {
      console.log(conn.coords);
      return getXYZ(first)[0] * getXYZ(second)[0];
    }
  }
};

const day9puzzle1 = (input) => {
  const coords = input.split('\n');
  let max = 0;
  let pair = [];
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1] = getXY(coords[i]);
      const [x2, y2] = getXY(coords[j]);
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);

      if (area > max) {
        max = area;
        pair = [coords[i], coords[j]];
      }
    }
  }
  console.log(pair);
  return max;
};

// NOT A WORKING SOLUTION

const day9puzzle2 = (input) => {
  return 'not working yet';
  const coords = input.split('\n').map(getXY);
  const vertWalls = {};
  const horizWalls = {};
  let [prevX, prevY] = coords.at(-1);
  for (const [curX, curY] of coords) {
    if (prevX === curX) {
      const minY = curY < prevY ? curY : prevY;
      const maxY = curY > prevY ? curY : prevY;
      vertWalls[minY] ??= new Map();
      vertWalls[minY].set(curX, 'C');
      vertWalls[maxY] ??= new Map();
      vertWalls[maxY].set(curX, 'C');
      for (let y = minY + 1; y < maxY; y++) {
        vertWalls[y] ??= new Map();
        vertWalls[y].set(curX, 'W');
      }
    } else if (prevY === curY) {
      const minX = curX < prevX ? curX : prevX;
      const maxX = curX > prevX ? curX : prevX;
      horizWalls[minX] ??= new Map();
      horizWalls[minX].set(curY, 'C');
      horizWalls[maxX] ??= new Map();
      horizWalls[maxX].set(curY, 'C');
      for (let x = minX + 1; x < maxX; x++) {
        horizWalls[x] ??= new Map();
        horizWalls[x].set(curY, 'W');
      }
    } else {
      throw new Error("Back-to-back coords don't share any values");
    }
    prevX = curX;
    prevY = curY;
  }

  console.log({ vertWalls, horizWalls });

  let maxArea = 0;
  let pair = [];

  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      // console.log(i, j, coords.length);
      // console.log(coords[i], coords[j]);
      const [minX, maxX] =
        coords[i][0] < coords[j][0] ? [coords[i][0], coords[j][0]] : [coords[j][0], coords[i][0]];
      const [minY, maxY] =
        coords[i][1] < coords[j][1] ? [coords[i][1], coords[j][1]] : [coords[j][1], coords[i][1]];

      const area = (maxX - minX + 1) * (maxY - minY + 1);
      if (area <= maxArea) {
        // console.log('Smaller, skipping', area, maxArea);
        continue;
      }
      let isValid = true;
      for (let x = minX; x <= maxX && isValid; x++) {
        if (!isColoredLine(minY, maxY, horizWalls[x])) {
          // console.log('Column not valid', minY, maxY, x);
          isValid = false;
        }
      }
      for (let y = minY; y <= maxY && isValid; y++) {
        // if (minX === 2 && maxX === 9 && y === 3) {
        //   debugger;
        // }
        if (!isColoredLine(minX, maxX, vertWalls[y])) {
          // console.log('Row not valid', minX, maxX, y);
          isValid = false;
        }
      }

      if (isValid) {
        // console.log('VALID');
        maxArea = area;
        pair = [coords[i], coords[j]];
      }
    }
  }
  console.log(pair);
  return maxArea;
};

const isColoredLine = (min, max, data) => {
  // console.log('isColoredLine', min, max, data);
  if (!data) {
    return false;
  }

  let start = min;
  let end = max;
  while (data.has(start) && start < end) {
    start++;
  }
  while (data.has(end) && start < end) {
    end--;
  }
  // console.log('Updated isColoredLine', start, end);

  // The whole row is a wall, which is always colored
  if (start === end) {
    // console.log("it's all a wall");
    return true;
  }

  const indices = [...data.keys()].sort((a, b) => +a - +b);
  const minIndex = indices.findIndex((el) => start < el);
  const maxIndex = indices.findIndex((el) => end < el);
  if (minIndex === -1 || maxIndex === -1) {
    return false;
  }

  const types = indices.map((key) => data.get(key));
  types.splice(minIndex, 0, 'X');
  types.splice(maxIndex + 1, 0, 'Y');

  let typesString = types.join('');
  while (typesString.includes('CC')) {
    typesString = typesString.replace('CC', 'W');
  }
  typesString = typesString.replace('CXC', 'WX');
  typesString = typesString.replace('CYC', 'YW');

  if (typesString.includes('XY')) {
    return typesString.indexOf('X') % 2 === 1;
  }

  // Note: This doesn't take into account only consecutive walls between X and Y
  return false;

  // The row is not between the same two walls
  // The only way it can still be contained,
  // is if all the walls inbetween are consecutive
  // meaning there are no white spots in between them
  const firstVal = indices[minIndex];
  if (indices.slice(minIndex, maxIndex + 1).some((val, i) => val !== firstVal + i)) {
    // console.log('Diff walls non consecutive');
    return false;
  }
};

// verts = vertWalls[y]
const isColoredRow = (minX, maxX, verts) => {
  console.log('isColoredRow', minX, maxX, verts);
  if (!verts) {
    return false;
  }

  const indices = Object.keys(verts).sort((a, b) => +a - +b);
  while (minX in indices && minX < maxX) {
    minX++;
  }
  while (maxX in indices && minX < maxX) {
    maxX--;
  }
  console.log('Updated isColoredRow', minX, maxX);

  // The whole row is a wall, which is always colored
  if (minX === maxX) {
    console.log("it's all a wall");
    return true;
  }

  const minIndex = indices.findIndex((el) => minX < el);
  const maxIndex = indices.findIndex((el) => maxX < el);
  if (minIndex === -1 || maxIndex === -1) {
    console.log('-1');
    return false;
  }

  const isIndexValid = (idx) => {
    const types = Object.values(verts);
    types.splice(idx, 0, 'X');
    let typesString = types.join('');
    while (typesString.includes('CC')) {
      typesString = typesString.replace('CC', 'W');
    }
    const realIndex = typesString.indexOf('X');
    return realIndex % 2 === 1;
  };

  // The whole row is between the same two walls
  if (minIndex === maxIndex) {
    console.log('same walls');
    return isIndexValid(minIndex);
  }

  // The row is not between the same two walls
  // The only way it can still be contained,
  // is if all the walls inbetween are consecutive
  // meaning there are no white spots in between them
  const firstVal = indices[minIndex];
  if (indices.slice(minIndex, maxIndex + 1).some((val, i) => val !== firstVal + i)) {
    console.log('Diff walls non consecutive');
    return false;
  }

  console.log('Diff walls but consecutive');

  // All the walls in between are consecutive,
  // so if both start and end are good,
  // the whole wall is good
  return isIndexValid(minIndex) && isIndexValid(maxIndex);
};

// horiz = horizWalls[x]
const isColoredColumn = (minY, maxY, horiz) => {
  if (!horiz) {
    return false;
  }

  // Move the edges inwards off the walls
  const indices = Object.keys(horiz).sort((a, b) => +a - +b);
  while (minY in indices && minY < maxY) {
    minY++;
  }
  while (maxY in indices && minY < maxY) {
    maxY--;
  }

  // The whole row is a wall, which is always colored
  if (minY === maxY) {
    return true;
  }

  const minIndex = indices.findIndex((el) => minY < el);
  const maxIndex = indices.findIndex((el) => maxY < el);
  if (minIndex === -1 || maxIndex === -1) {
    return false;
  }

  const isIndexValid = (idx) => {
    const types = Object.values(horiz);
    types.splice(idx, 0, 'X');
    let typesString = types.join('');
    while (typesString.includes('CC')) {
      typesString = typesString.replace('CC', 'W');
    }
    const realIndex = typesString.indexOf('X');
    return realIndex % 2 === 1;
  };

  // The whole row is between the same two walls
  if (minIndex === maxIndex) {
    return isIndexValid(minIndex);
  }

  // The row is not between the same two walls
  // The only way it can still be contained,
  // is if all the walls inbetween are consecutive
  // meaning there are no white spots in between them
  const firstVal = indices[minIndex];
  if (indices.slice(minIndex, maxIndex + 1).some((val, i) => val !== firstVal + i)) {
    return false;
  }

  // All the walls in between are consecutive,
  // so if both start and end are good,
  // the whole wall is good
  return isIndexValid(minIndex) && isIndexValid(maxIndex);
};

const isColoredTile = (x, y, horizWalls, vertWalls) => {
  const horiz = horizWalls[x];
  const verts = vertWalls[y];

  if (!verts || !horiz) {
    return false;
  }

  if (!(y in horiz)) {
    const indices = Object.keys(horiz).sort((a, b) => +a - +b);
    const idx = indices.findIndex((el) => y < el);
    if (idx < 1) {
      return false;
    }

    const types = Object.values(horiz);
    types.splice(idx, 0, 'Y');
    let typesString = types.join('');
    while (typesString.includes('CC')) {
      typesString = typesString.replace('CC', 'W');
    }
    const realIndex = typesString.indexOf('Y');
    if (realIndex % 2 === 0) {
      return false;
    }
  }

  if (!(x in verts)) {
    const indices = Object.keys(verts).sort((a, b) => +a - +b);
    const idx = indices.findIndex((el) => x < el);
    if (idx < 1) {
      return false;
    }

    const types = Object.values(verts);
    types.splice(idx, 0, 'X');
    let typesString = types.join('');
    while (typesString.includes('CC')) {
      typesString = typesString.replace('CC', 'W');
    }
    const realIndex = typesString.indexOf('X');
    if (realIndex % 2 === 0) {
      return false;
    }
  }

  return true;
};

const day10puzzle1 = (input) => {
  const machines = input.split('\n').map((row) => {
    const [diagram, ...buttons] = row.split(' ').slice(0, -1);

    return {
      diagram: diagram.slice(1, -1),
      buttons: buttons.map((b) => b.slice(1, -1).split(',').map(Number)),
    };
  });

  let totalPresses = 0;
  machines.forEach(({ diagram, buttons }) => {
    let presses = 1;
    let match = false;
    let queue = ['.'.repeat(diagram.length)];
    let next = new Set();
    while (queue.length && !match) {
      const cur = queue.shift();
      for (const schema of buttons) {
        const updated = toggleMachine(cur, schema);
        if (updated === diagram) {
          match = true;
          break;
        } else {
          next.add(updated);
        }
      }
      if (match) break;

      if (!queue.length) {
        queue = Array.from(next);
        presses++;
      }
    }

    if (match) {
      totalPresses += presses;
    } else {
      throw new Error(`No match, ${presses} presses, ${diagram}`);
    }
  });
  return totalPresses;
};

const toggleMachine = (diagram, schema) => {
  const updated = diagram.split('');
  schema.forEach((i) => {
    updated[i] = updated[i] === '.' ? '#' : '.';
  });
  return updated.join('');
};

const day10puzzle2 = (input) => {
  const machines = input.split('\n').map((row) => {
    const buttons = row.split(' ').slice(1);
    const goal = buttons.pop();

    return {
      buttons: buttons.map((b) => b.slice(1, -1).split(',').map(Number)),
      goal: goal.slice(1, -1).split(',').map(Number),
    };
  });

  let totalPresses = 0;
  machines.forEach(({ buttons, goal }) => {
    // Figure out how to implement as solving a system of equations, where
    // - Each button is a variable
    // - We're trying to figure out the value of each variable (or really the sum of all the variables).
    // - Each index of the goal represents an equation, with the sum of that equation = that goal value
    // - Each button represents a variable (a/b/c)
    // - The numbers in each button represent which of the equations (summing to goal[i]) feature that variable
    // For instance:
    // Buttons: [0, 1, 3, 4, 5], [0, 4, 5], [1, 2, 3, 4], [0, 1, 2]
    // Goal:  [132, 30, 23, 13, 121, 115]
    // Equations: a + b + d = 132, a + c + d = 30, b + c = 23;, a + c = 13, a + b + c = 121, a + b = 115
    // Solution: a = 7, b = 108, c = 6, d = 7
    // Total presses = 7 + 108 + 6 + 7 = 128
  });
  return totalPresses;
};

const day10puzzle2bad = (input) => {
  const machines = input.split('\n').map((row) => {
    const buttons = row.split(' ').slice(1);
    const goal = buttons.pop();

    return {
      buttons: buttons.map((b) => b.slice(1, -1).split(',').map(Number)),
      goal: goal.slice(1, -1).split(',').map(Number),
    };
  });

  let totalPresses = 0;
  machines.forEach(({ buttons, goal }) => {
    const goalString = goal.join(',');
    let presses = 1;
    let match = false;
    let queue = [Array(goal.length).fill(0).join(',')];
    let next = new Set();
    while (queue.length && !match && presses < 50) {
      const cur = queue.shift();
      for (const schema of buttons) {
        const updated = increaseJoltage(cur, schema);
        const updatedString = updated.join(',');
        if (updatedString === goalString) {
          match = true;
          break;
        } else if (isValidJoltage(updated, goal)) {
          next.add(updatedString);
        }
      }
      if (match) break;

      if (!queue.length) {
        queue = Array.from(next);
        presses++;
      }
    }

    if (match) {
      totalPresses += presses;
      console.log(`Reached ${goal} in ${presses} presses`);
    } else {
      throw new Error(`No match, ${presses} presses, ${goal}`);
    }
  });
  return totalPresses;
};

const increaseJoltage = (machineStr, schema) => {
  const updated = machineStr.split(',').map(Number);
  schema.forEach((button) => {
    updated[button]++;
  });
  return updated;
};

const isValidJoltage = (machine, goal) => {
  return machine.every((val, i) => goal[i] >= val);
};

const day11puzzle1 = (input) => {
  const cableMap = input.split('\n').reduce((acc, cable) => {
    const [name, outputList] = cable.split(': ');
    const outputs = outputList.split(' ');
    acc[name] = outputs;
    return acc;
  }, {});

  let pathCount = 0;
  let queue = ['you'];
  while (queue.length) {
    const currentCable = queue.shift();
    cableMap[currentCable].forEach((output) => {
      if (output === 'out') {
        pathCount++;
      } else {
        queue.push(output);
      }
    });
  }
  return pathCount;
};

const day11puzzle2 = (input) => {
  const cableMap = input.split('\n').reduce((acc, cable) => {
    const [name, outputList] = cable.split(': ');
    const outputs = outputList.split(' ');
    acc[name] = outputs;
    return acc;
  }, {});

  // For caching paths we've already calculated
  // Map of { [from:to] => pathCount }
  const savedPaths = new Map();

  /**
   * Finds the number of paths from `from` to `to` that don't pass through any of the `avoid` outputs
   * @param {string} from Starting point
   * @param {string} to Destination
   * @param {Set<string>} avoid A Set of node names to avoid - if we hit one, stop traversing that path
   *
   * Does this recursively by:
   * - If from = to -> We made it to the end! There's one way to do this.
   * - The ways from A -> B is the sum of each of A's connections -> B
   * - Each time we calculate a path, we cache it savedPaths
   * - If from != to, first check if we already know the pathCount, otherwise calculate it recursively
   */
  const findCablePaths = (from, to, avoid) => {
    if (from === to) {
      return 1;
    }

    const pathHash = `${from}:${to}`;

    if (savedPaths.has(pathHash)) {
      return savedPaths.get(pathHash);
    }

    let pathCount = 0;
    for (const output of cableMap[from]) {
      if (!avoid.has(output)) {
        pathCount += findCablePaths(output, to, avoid);
      }
    }

    savedPaths.set(pathHash, pathCount);
    return pathCount;
  };

  let pathCount = 0;

  // Find all paths from svr -> dac -> fft -> out by multiplying the counts of each segment
  const dacToOut = findCablePaths('dac', 'out', new Set());

  // If you can get from dac -> out, find fft -> dac
  if (dacToOut) {
    const fftToDac = findCablePaths('fft', 'dac', new Set(['out']));

    // If you can get from fft -> dac, find svr -> fft
    if (fftToDac) {
      const svrToFft = findCablePaths('svr', 'fft', new Set(['dac', 'out']));

      pathCount += svrToFft * fftToDac * dacToOut;
    }
  }

  // Find all paths from svr -> fft -> dac -> out by multiplying the counts of each segment
  const fftToOut = findCablePaths('fft', 'out', new Set());

  // If you can get from fft -> out, find dac -> fft
  if (fftToOut) {
    const dacToFft = findCablePaths('dac', 'fft', new Set(['out']));

    // If you can get from dac -> fft, find svr -> dac
    if (dacToFft) {
      const svrToDac = findCablePaths('svr', 'dac', new Set(['fft', 'out']));

      pathCount += svrToDac * dacToFft * fftToOut;
    }
  }

  return pathCount;
};
