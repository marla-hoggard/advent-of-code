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
        pathsToAdd.push(path.toSpliced(i, 0, city));
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

const day11Puzzle1 = (input) => {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz';

  const increment = (str) => {
    let updated = str.split('');
    let i = updated.length - 1;
    while (i >= 0) {
      const char = updated[i];
      if (char !== 'z') {
        const charIdx = alphabet.indexOf(char);
        updated[i] = alphabet[charIdx + 1];
        return updated.join('');
      } else {
        updated[i] = 'a';
        i--;
      }
    }
  };

  const pairsRegex = /([a-z])\1/g;
  let series = [];
  for (let i = 0; i < alphabet.length - 2; i++) {
    series.push(alphabet.slice(i, i + 3));
  }
  const seriesRegex = new RegExp(series.join('|'));

  const isValidPassword = (str) => {
    const numPairs = str.match(pairsRegex) || [];
    if (numPairs.length < 2) {
      return false;
    }
    return !!str.match(seriesRegex);
  };

  let password = increment(input);
  let i = 0;

  while (!isValidPassword(password) && i < 10000) {
    password = increment(password);
  }

  return password;
};

const day11Puzzle2 = (input) => {
  const p1 = day11Puzzle1(input);
  return day11Puzzle1(p1);
};

/**
 * This was the way I did it first.
 * Very simple, quick answer.
 * But, it couldn't be extended to part 2,
 * so I figured I'd solve it again a way that could be reused for part 2.
 * This solution is faster as well.
 */
const day12Puzzle1Regex = (input) => {
  return JSON.stringify(input)
    .match(/[\d-]+/g)
    .reduce((prev, cur) => prev + +cur, 0);
};

const day12Puzzle1 = (input) => {
  let total = 0;
  Object.values(input).forEach((val) => {
    if (typeof val === 'string') {
      return;
    } else if (typeof val === 'number') {
      total += val;
    } else if (Array.isArray(val)) {
      total = val.reduce((sum, el) => {
        if (typeof el === 'string') {
          return sum;
        } else if (typeof el === 'number') {
          return sum + el;
        } else return sum + day12Puzzle1(el);
      }, total);
    } else {
      total += day12Puzzle1(val);
    }
  });
  return total;
};

// Why is this so much slower???
const day12Puzzle1ShortButSlow = (input) => {
  if (typeof input === 'string') {
    return 0;
  } else if (typeof input === 'number') {
    return input;
  } else if (Array.isArray(input)) {
    input.reduce((sum, el) => sum + day12Puzzle1(el), 0);
  }
  return Object.values(input).reduce((sum, el) => sum + day12Puzzle1(el), 0);
};

const day12Puzzle2 = (input) => {
  if (!Array.isArray(input) && Object.values(input).includes('red')) {
    return 0;
  }

  let total = 0;
  Object.values(input).forEach((val) => {
    if (typeof val === 'string') {
      return;
    } else if (typeof val === 'number') {
      total += val;
    } else if (Array.isArray(val)) {
      total = val.reduce((sum, el) => {
        if (typeof el === 'string') {
          return sum;
        } else if (typeof el === 'number') {
          return sum + el;
        } else return sum + day12Puzzle2(el);
      }, total);
    } else {
      total += day12Puzzle2(val);
    }
  });
  return total;
};

/**
 * When provided a bunch of pair-wise happiness scores
 * for two people sitting next to each other,
 * Determine the best round table order (highest total score)
 * and return its total happiness score.
 */
const day13Puzzle1 = (input) => {
  const scores = getHappinessScores(input);
  const arrangements = getAllSeatingArrangements(scores);

  let maxScore = 0;
  arrangements.forEach((order) => {
    const score = calculateHappiness(scores, order);
    if (score > maxScore) {
      maxScore = score;
    }
  });
  return maxScore;
};

/**
 * When provided a bunch of pair-wise happiness scores
 * for two people sitting next to each other,
 * Determine the best round table order (highest total score).
 *
 * But this time, add yourself in. Your happiness score next to anyone else,
 * and vice versa, is simply 0.
 *
 * Find the best order without yourself fit in, and return its score.
 *
 * How to do it? First find the best order from Part 1,
 * then find the best spot in that best order to fit yourself into.
 */
const day13Puzzle2 = (input) => {
  const scores = getHappinessScores(input);
  const arrangements = getAllSeatingArrangements(scores);

  let maxScore = 0;
  let bestOrder;

  arrangements.forEach((order) => {
    const score = calculateHappiness(scores, order);
    if (score > maxScore) {
      maxScore = score;
      bestOrder = order;
    }
  });

  scores.you = {};
  Object.keys(scores).forEach((name) => {
    scores[name].you = 0;
    scores.you[name] = 0;
  });

  let fitMeIn = [];
  for (let i = 0; i <= bestOrder.length; i++) {
    fitMeIn.push(bestOrder.toSpliced(i, 0, 'you'));
  }

  maxScore = 0;
  fitMeIn.forEach((order) => {
    const score = calculateHappiness(scores, order);
    if (score > maxScore) {
      maxScore = score;
    }
  });

  return maxScore;
};

/**
 * Parse the input into a set of objects to map the pair-wise scores.
 */
const getHappinessScores = (input) => {
  const regex =
    /(?<name>\w+) would (?<dir>lose|gain) (?<amt>\d+) happiness units by sitting next to (?<name2>\w+)/;

  const scores = {};

  input.split('\n').forEach((fact) => {
    const { name, name2, dir, amt } = fact.match(regex).groups;
    const value = dir === 'gain' ? +amt : 0 - amt;

    if (scores[name] === undefined) {
      scores[name] = { [name2]: value };
    } else if (scores[name][name2] !== undefined) {
      scores[name][name2] += value;
    } else {
      scores[name][name2] = value;
    }

    if (scores[name2] === undefined) {
      scores[name2] = { [name]: value };
    } else if (scores[name2][name] !== undefined) {
      scores[name2][name] += value;
    } else {
      scores[name2][name] = value;
    }
  });

  return scores;
};

// Day 13 helper
// Creates an array of "seating arrangements" for every possible order of the names provided
// This is identical to day9 getAllPaths
const getAllSeatingArrangements = (scores) => {
  const names = Object.keys(scores);
  let arrangements = [[]];
  names.forEach((name) => {
    let newArrangements = [];
    arrangements.forEach((arrangement) => {
      let arrangementsToAdd = [];
      for (let i = 0; i <= arrangement.length; i++) {
        arrangementsToAdd.push(arrangement.toSpliced(i, 0, name));
      }
      newArrangements = newArrangements.concat(arrangementsToAdd);
    });
    arrangements = newArrangements;
  });

  return arrangements;
};

/**
 * Calculate the total happiness score for a given order
 */
const calculateHappiness = (scores, order) => {
  let score = 0;
  let i = 0;
  while (i < order.length - 1) {
    const name1 = order[i];
    const name2 = order[i + 1];
    score += scores[name1][name2];
    i++;
  }

  // It's a circle, so wrap around
  score += scores[order[i]][order[0]];
  return score;
};

const day14Puzzle1 = (input) => {
  const regex =
    /(?<name>\w+) can fly (?<speed>\d+) km\/s for (?<flyTime>\d+) seconds, but then must rest for (?<restTime>\d+) seconds\./;
  const reindeer = input.split('\n').map((deer) => {
    const matches = deer.match(regex);
    const { name, speed, flyTime, restTime } = matches.groups;
    return { name, speed: +speed, flyTime: +flyTime, restTime: +restTime };
  });
  let maxDistance = 0;
  const distances = {};
  for (const deer of reindeer) {
    const distance = getDeerLocation(deer, 2503);
    if (distance > maxDistance) {
      maxDistance = distance;
    }
    distances[deer.name] = distance;
  }
  console.log(distances);
  return maxDistance;
};

const getDeerLocation = ({ speed, flyTime, restTime }, seconds) => {
  const period = flyTime + restTime;
  const distancePerPeriod = speed * flyTime;
  const fullPeriods = Math.floor(seconds / period);
  const finalPeriodLength = seconds % period;
  const finalPeriodDistance =
    finalPeriodLength > flyTime ? distancePerPeriod : finalPeriodLength * speed;
  return distancePerPeriod * fullPeriods + finalPeriodDistance;
};

const day14Puzzle2 = (input) => {
  const regex =
    /(?<name>\w+) can fly (?<speed>\d+) km\/s for (?<flyTime>\d+) seconds, but then must rest for (?<restTime>\d+) seconds\./;

  const points = {};
  const reindeer = input.split('\n').map((deer) => {
    const matches = deer.match(regex);
    const { name, speed, flyTime, restTime } = matches.groups;
    points[name] = 0;
    return { name, speed: +speed, flyTime: +flyTime, restTime: +restTime };
  });

  for (let i = 1; i <= 2503; i++) {
    const distances = reindeer.map((deer) => ({
      name: deer.name,
      distance: getDeerLocation(deer, i),
    }));
    const maxDistance = Math.max(...distances.map((d) => d.distance));
    distances.forEach(({ name, distance }) => {
      if (maxDistance === distance) {
        points[name]++;
      }
    });
  }

  console.log(points);
  return Math.max(...Object.values(points));
};

const day15Puzzles = (input, calReq) => {
  const ingredients = input.split('\n').map((text) => {
    const regex =
      /^(?<ingredient>[A-Za-z]+): capacity (?<capacity>[0-9-]+), durability (?<durability>[0-9-]+), flavor (?<flavor>[0-9-]+), texture (?<texture>[0-9-]+), calories (?<calories>[0-9-]+)$/;
    const matches = text.match(regex);
    const { ingredient, capacity, durability, flavor, texture, calories } = matches.groups;
    return {
      ingredient,
      capacity: +capacity,
      durability: +durability,
      flavor: +flavor,
      texture: +texture,
      calories: +calories,
    };
  });

  let maxScore = 0;
  const permutations = getSumPermutations(100, ingredients.length);
  permutations.forEach((perm) => {
    const score = recipeScore(
      ingredients.map((ing, i) => ({
        ...ing,
        count: perm[i],
      })),
      calReq,
    );
    if (score > maxScore) {
      maxScore = score;
    }
  });
  return maxScore;
};

const recipeScore = (ingredients, calReq) => {
  const propScore = (prop, ingredients) => {
    let sum = 0;
    for (const ing of ingredients) {
      sum += ing[prop] * ing.count;
    }
    return sum;
  };

  if (calReq !== undefined) {
    const calories = propScore('calories', ingredients);
    if (calories !== calReq) {
      return 0;
    }
  }

  let score = 1;

  for (const prop of ['capacity', 'durability', 'flavor', 'texture']) {
    const sum = propScore(prop, ingredients);
    if (sum <= 0) {
      return 0;
    }
    score *= sum;
  }
  return score;
};

const getSumPermutations = (sum, numValues) => {
  if (numValues === 1) {
    return [[sum]];
  }

  const permutations = [];
  for (let i = 0; i <= sum; i++) {
    const tails = getSumPermutations(sum - i, numValues - 1);
    permutations.push(...tails.map((tail) => [i, ...tail]));
  }
  return permutations;
};

const day16Puzzle1 = (input) => {
  const targetSue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  for (const str of input.split('\n')) {
    const [_, id, ...properties] = str.split(/\:?,?\s/g);
    let match = true;
    for (let i = 0; i < properties.length - 1; i += 2) {
      const key = properties[i];
      const count = parseInt(properties[i + 1]);
      if (targetSue[key] !== count) {
        match = false;
        break;
      }
    }

    if (match) {
      return id;
    }
  }

  return 'none found';
};

const day16Puzzle2 = (input) => {
  const isMatch = (key, count) => {
    switch (key) {
      case 'children':
        return count === 3;
      case 'cats':
        return count > 7;
      case 'samoyeds':
        return count === 2;
      case 'pomeranians':
        return count < 3;
      case 'akitas':
        return count === 0;
      case 'vizslas':
        return count === 0;
      case 'goldfish':
        return count < 5;
      case 'trees':
        return count > 3;
      case 'cars':
        return count === 2;
      case 'perfumes':
        return count === 1;
    }
  };

  for (const str of input.split('\n')) {
    const [_, id, ...properties] = str.split(/\:?,?\s/g);
    let match = true;
    for (let i = 0; i < properties.length - 1; i += 2) {
      const key = properties[i];
      const count = parseInt(properties[i + 1]);
      if (!isMatch(key, count)) {
        match = false;
        continue;
      }
    }

    if (match) {
      return id;
    }
  }

  return 'none found';
};
