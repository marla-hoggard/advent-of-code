/**
 * Which floor does he end up in?
 *  ( means +1 and ) means -1
 */
const day1Puzzle1 = (input) => {
  return input.split('(').length - input.split(')').length;
};

/**
 * Which 1-indexed step sends him to the basement (-1)
 * ( means +1 and ) means -1
 */
const day1Puzzle2 = (input) => {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      floor++;
    } else {
      floor--;
    }
    if (floor < 0) {
      return i + 1;
    }
  }
  return 'never';
};

/**
 * How much wrapping paper is needed to wrap the list of presents?
 * Need 2lw + 2wh + 2lh + (shortest side area) when given l x h x w
 */
const day2Puzzle1 = (input) => {
  return input.split('\n').reduce((total, present) => {
    const [l, w, h] = present.split('x').map((el) => +el);
    const sides = [l * w, h * w, l * h];
    const smallestSide = Math.min(...sides);
    const paper = 2 * l * w + 2 * w * h + 2 * l * h + smallestSide;
    return paper + total;
  }, 0);
};

/**
 * How much ribbon is needed to wrap the list of presents?
 * Need l*w*h + perimeter of smallest side when given l x h x w
 */
const day2Puzzle2 = (input) => {
  return input.split('\n').reduce((total, present) => {
    const [l, w, h] = present.split('x').map((el) => +el);
    const faces = [2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l];
    const smallestFace = Math.min(...faces);
    const ribbon = l * w * h + smallestFace;
    return ribbon + total;
  }, 0);
};

/**
 * How many houses does Santa visit?
 */
const day3Puzzle1 = (input) => {
  const visited = new Set();
  let x = 0;
  let y = 0;
  visited.add('0,0');
  input.split('').forEach((step) => {
    switch (step) {
      case '^':
        y++;
        break;
      case 'v':
        y--;
        break;
      case '<':
        x--;
        break;
      case '>':
        x++;
        break;
    }
    visited.add(`${x},${y}`);
  });

  return visited.size;
};

/**
 * How many houses to Santa and Robo-Santa visit when following alternating directions?
 */
const day3Puzzle2 = (input) => {
  const visited = new Set();
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;
  visited.add('0,0');
  input.split('').forEach((step, index) => {
    switch (step) {
      case '^':
        if (index % 2) {
          y1++;
        } else {
          y2++;
        }
        break;
      case 'v':
        if (index % 2) {
          y1--;
        } else {
          y2--;
        }
        break;
      case '<':
        if (index % 2) {
          x1--;
        } else {
          x2--;
        }
        break;
      case '>':
        if (index % 2) {
          x1++;
        } else {
          x2++;
        }
        break;
    }
    if (index % 2) {
      visited.add(`${x1},${y1}`);
    } else {
      visited.add(`${x2},${y2}`);
    }
  });

  return visited.size;
};

/**
 * When provided a key, find the lowest number in which
 * the md5 hash of "key#" starts with five leading zeroes
 */
const day4Puzzle1 = (input) => {
  let val = 1;
  while (true) {
    const hash = md5(`${input}${val}`);
    if (hash.startsWith('00000')) {
      return val;
    }
    val++;
  }
};

/**
 * When provided a key, find the lowest number in which
 * the md5 hash of "key#" starts with six leading zeroes
 */
const day4Puzzle2 = (input) => {
  let val = 1;
  while (true) {
    const hash = md5(`${input}${val}`);
    if (hash.startsWith('000000')) {
      return val;
    }
    val++;
  }
};

/**
 * How many strings in the provided input are "nice"?
 * To be nice, a string must:
 * - Contain at least three vowels (aeiou)
 * - Contain a double letter (i.e. "aa")
 * - Not contain the substrings "ab", "cd", "pq" or "xy"
 */
const day5Puzzle1 = (input) => {
  let nice = 0;
  const strings = input.split('\n');
  for (let str of strings) {
    // Check for "naughty" substrings
    if (str.includes('ab') || str.includes('cd') || str.includes('pq') || str.includes('xy')) {
      continue;
    }
    // Check for 3+ vowels
    const vowels = str.match(/[aeiou]/g)?.length ?? 0;
    if (vowels < 3) {
      continue;
    }
    // Check for a double letter
    if (/([a-z])\1/.test(str)) {
      nice++;
    }
  }

  return nice;
};

/**
 * How many strings in the provided input are "nice"?
 * To be nice, a string must:
 * - Contains a non-overlapping repeated bigram somewhere in the string
 *   i.e. 'xyabcdxyefgh' where the repeated bigram is 'xy'
 * - Contains a repeated letter with another character in the middle, like 'aba' or 'aaa'
 */
const day5Puzzle2 = (input) => {
  let nice = 0;
  const strings = input.split('\n');
  for (let str of strings) {
    // Check ABA pattern
    const sandwichRegex = /([a-z])[a-z]\1/;
    if (!sandwichRegex.test(str)) {
      continue;
    }

    // Check for repeated bigram
    const bigramRegex = /([a-z][a-z]).*\1/;
    if (bigramRegex.test(str)) {
      nice++;
    }
  }

  return nice;
};

/**
 * Toggles lights on and off in a 1000 x 1000 grid based on instructions.
 * Returns the number of lights on at the end.
 */
const day6Puzzle1 = (input) => {
  const instructions = input.split('\n');
  const lights = new Array(1000).fill(null).map(() => new Array(1000).fill(null).map(() => 0));
  instructions.forEach((step) => {
    const matches = step.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);

    const [_, alg, startX, startY, endX, endY] = matches;
    for (let x = +startX; x <= +endX; x++) {
      for (let y = +startY; y <= +endY; y++) {
        switch (alg) {
          case 'turn on':
            lights[x][y] = 1;
            break;
          case 'turn off':
            lights[x][y] = 0;
            break;
          case 'toggle':
            lights[x][y] = lights[x][y] ? 0 : 1;
            break;
        }
      }
    }
  });

  return lights.reduce((total, row) => {
    const rowSum = row.reduce((sum, val) => sum + val, 0);
    return total + rowSum;
  }, 0);
};

/**
 * Updates brightness of lights in a 1000 x 1000 grid based on instructions.
 * Returns the total count of light brightness at the end.
 * "Turn on" - increase light by 1
 * "Turn off" - decrease light by 1 (miniumum is 0)
 * "Toggle" - increase light by 2
 */
const day6Puzzle2 = (input) => {
  const instructions = input.split('\n');
  const lights = new Array(1000).fill(null).map(() => new Array(1000).fill(null).map(() => 0));
  instructions.forEach((step) => {
    const matches = step.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);

    const [_, alg, startX, startY, endX, endY] = matches;
    for (let x = +startX; x <= +endX; x++) {
      for (let y = +startY; y <= +endY; y++) {
        switch (alg) {
          case 'turn on':
            lights[x][y] += 1;
            break;
          case 'turn off':
            if (lights[x][y] > 0) {
              lights[x][y] -= 1;
            }
            break;
          case 'toggle':
            lights[x][y] += 2;
            break;
        }
      }
    }
  });

  return lights.reduce((total, row) => {
    const rowSum = row.reduce((sum, val) => sum + val, 0);
    return total + rowSum;
  }, 0);
};

const day7 = (input, overrideWire) => {
  const overrideValue = overrideWire ? day7(input) : undefined;
  const isNumber = (val) => !isNaN(val);
  const isAlpha = (val) => /^[a-z]+$/.test(val);
  const uint16 = (n) => n & 0xffff;

  const parseValue = (value) => {
    if (isNumber(value)) {
      return {
        value: Number(value),
        key: 'number',
        defined: true,
      };
    } else if (isAlpha(value)) {
      if (wires[value] != undefined) {
        return {
          value: wires[value],
          key: value,
          defined: true,
        };
      } else {
        return {
          value: undefined,
          key: value,
          defined: false,
        };
      }
    } else {
      console.log('Invalid value', value);
      return {
        value: undefined,
        key: value,
        defined: false,
      };
    }
  };

  const calculateStep = (step) => {
    const { operator, parsedFirst, parsedSecond, output } = step;
    let value = 0;

    switch (operator) {
      case 'SET':
        value = parsedFirst.value;
        break;
      case 'NOT':
        value = ~parsedFirst.value;
        break;
      case 'AND':
        value = parsedFirst.value & parsedSecond.value;
        break;
      case 'OR':
        value = parsedFirst.value | parsedSecond.value;
        break;
      case 'LSHIFT':
        value = parsedFirst.value << parsedSecond.value;
        break;
      case 'RSHIFT':
        value = parsedFirst.value >> parsedSecond.value;
        break;
    }

    value = uint16(value);
    wires[output] = value;

    if (dependencies[output]) {
      dependencies[output].forEach((stepIndex) => {
        const step = parsedSteps[stepIndex];
        step.needsResolution = step.needsResolution.filter((el) => el !== output);

        if (step.parsedFirst.key === output) {
          step.first = value;
          step.parsedFirst.value = value;
          step.parsedFirst.defined = true;
        } else if (step.parsedSecond?.key === output) {
          step.second = value;
          step.parsedSecond.value = value;
          step.parsedSecond.defined = true;
        }

        if (!step.needsResolution.length) {
          calculateStep(step);
          delete parsedSteps[stepIndex];
        } else {
          parsedSteps[stepIndex] = step;
        }
      });
    }
  };

  let wires = { b: overrideValue };
  let dependencies = {};
  let parsedSteps = {};
  let steps = input.split('\n');

  steps.forEach((step, i) => {
    const parts = step.split(' ').reverse();
    const output = parts[0];
    if (output === overrideWire) {
      return;
    }
    const operator = parts[3] || 'SET';
    let first = parts[2];
    let second;
    let needsResolution = [];
    if (parts.length === 5) {
      first = parts[4];
      second = parts[2];
    }

    const parsedFirst = parseValue(first);
    if (!parsedFirst.defined) {
      dependencies[parsedFirst.key]
        ? dependencies[parsedFirst.key].push(i)
        : (dependencies[parsedFirst.key] = [i]);
      needsResolution.push(parsedFirst.key);
    }

    let parsedSecond;
    if (second != undefined) {
      parsedSecond = parseValue(second);
      if (!parsedSecond.defined) {
        dependencies[parsedSecond.key]
          ? dependencies[parsedSecond.key].push(i)
          : (dependencies[parsedSecond.key] = [i]);
        needsResolution.push(parsedSecond.key);
      }
    }

    if (!needsResolution.length) {
      calculateStep({ output, operator, parsedFirst, parsedSecond });
    }

    parsedSteps[i] = {
      step,
      output,
      operator,
      first,
      second,
      parsedFirst,
      parsedSecond,
      needsResolution,
      index: i,
    };
  });

  return wires.a;
};

/**
 * Returns the difference in characters
 * between the raw strings from the input
 * and the escaped strings from the input.
 *
 * Encodings:
 * \" encodes to "
 * \\ encodes to \
 * \x12 where 12 are hex chars, encodes to a single ascii character
 *
 * Unlike usual, I did have to add a bit of code to the input in order to actaully
 * get the raw string from the input. Without doing that, the input would come in already
 * encoded which made it impossible to accomplish the task.
 */
const day8Puzzle1 = (input) => {
  const strings = input.split('\n');
  const ascii = /\\x[a-z0-9][a-z0-9]/g;
  const escapedQuote = /\\"/g;
  const escapedSlash = /\\\\/g;
  const rawLength = strings.reduce((total, cur) => total + cur.length, 0);
  const escapedLength = strings.reduce((total, cur) => {
    const len = cur
      .replaceAll(escapedSlash, 'S')
      .replaceAll(ascii, 'X')
      .replaceAll(escapedQuote, 'E')
      .replaceAll('"', '').length;
    return total + len;
  }, 0);
  return rawLength - escapedLength;
};

/**
 * Takes the raw version of each string, then re-encodes it
 * to escape all the quotes and backslashes, and nests the new string
 * in its own quotations. The ascii characters
 * remain as is besides the backslash.
 *
 * "" -> "\"\""
 * "\x12" -> "\"\\x12\""
 *
 * Returns the difference in length between the raw and newly encoded strings.
 * This can simply be calculated by counting the number of quotes and slashes in the raw string,
 * plus two per string for the added quotes around it.
 */
const day8Puzzle2 = (input) => {
  const strings = input.split('\n');
  return strings.reduce((total, cur) => {
    const quotes = numOccurrences(cur, '"') + 2;
    const slashes = numOccurrences(cur, '\\');
    return total + quotes + slashes;
  }, 0);
};

const day9Puzzle1 = (input) => {
  const distances = createDistanceMap(input);
  const paths = getAllPaths(distances);

  let shortestDistance = Infinity;
  paths.forEach((path) => {
    const distance = getPathLength(path, distances);
    if (distance < shortestDistance) {
      shortestDistance = distance;
    }
  });

  return shortestDistance;
};

const day9Puzzle2 = (input) => {
  const distances = createDistanceMap(input);
  const paths = getAllPaths(distances);

  let longestDistance = 0;
  paths.forEach((path) => {
    const distance = getPathLength(path, distances);
    if (distance > longestDistance) {
      longestDistance = distance;
    }
  });

  return longestDistance;
};

// For Day 9, map the input to an object of distances
const createDistanceMap = (input) => {
  let distances = {};
  input.split('\n').forEach((line) => {
    const [node1, _, node2, __, dist] = line.split(' ');
    if (!distances[node1]) {
      distances[node1] = {};
    }
    if (!distances[node2]) {
      distances[node2] = {};
    }

    distances[node1][node2] = +dist;
    distances[node2][node1] = +dist;
  });
  return distances;
};

// Day 9 helper
// Creates an array of "paths" for every possible order of the cities provided
// We don't actually need the distances, just the list of keys to pull the city names
const getAllPaths = (distances) => {
  const cities = Object.keys(distances);
  let paths = [[]];
  cities.forEach((city) => {
    let newPaths = [];
    paths.forEach((path) => {
      let pathsToAdd = [];
      for (let i = 0; i <= path.length; i++) {
        pathsToAdd.push(insertIntoArray(path, i, city));
      }
      newPaths = newPaths.concat(pathsToAdd);
    });
    paths = newPaths;
  });

  return paths;
};

// Day 9 helper
// Takes an array of city names representing an ordered path
// Returns the length of that path in that order
const getPathLength = (path, distances) => {
  let dist = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const city = distances[path[i]];
    dist += city[path[i + 1]];
  }
  return dist;
};

const day10 = (input, iterations) => {
  let seq = input;

  for (let i = 0; i < iterations; i++) {
    let newSeq = '';
    let count = 1;
    let value = seq[0];
    for (let c = 1; c < seq.length; c++) {
      const char = seq[c];
      if (char === value) {
        count++;
      } else {
        newSeq += `${count}${value}`;
        count = 1;
        value = char;
      }
    }
    newSeq += `${count}${value}`;
    seq = newSeq;
  }

  return seq.length;
};
