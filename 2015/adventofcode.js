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

const day7Puzzle1 = (input) => {
  const isNumber = (val) => !isNaN(val);
  const isAlpha = (val) => /^[a-z]+$/.test(val);
  const uint16 = (n) => n & 0xffff;

  let wires = {};
  let steps = input.split('\n');

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

  for (let i = 0; i < steps.length; i++) {
    const parts = steps[i].split(' ');

    if (parts.length === 3) {
      const parsed = parseValue(parts[0]);
      const wireName = parts[2];
      if (parsed.defined) {
        wires[wireName] = uint16(parsed.value);
        console.log(`Setting ${wireName} to ${parsed.value} which comes from ${parsed.key}.`);
      } else {
        console.log('Length 3 not defined');
        steps.push(steps[i]);
      }
    } else if (parts.length === 4) {
      const parsed = parseValue(parts[1]);
      const wireName = parts[3];
      if (parsed.defined) {
        console.log(`Setting ${wireName} to NOT ${parsed.value} which comes from ${parsed.key}.`);
        wires[wireName] = uint16(~Number(parsed.value));
      } else {
        console.log('Length 4 not defined');
        steps.push(steps[i]);
      }
    } else {
      const op = parts[1];
      const wireName = parts[4];

      const parsedFirst = parseValue(parts[0]);
      const parsedSecond = parseValue(parts[2]);

      if (!parsedFirst.defined) {
        console.log('Length 5, first value not defined');
        steps.push(steps[i]);
        continue;
      }

      if (!parsedSecond.defined) {
        console.log('Length 5, second value not defined');
        steps.push(steps[i]);
        continue;
      }

      switch (op) {
        case 'AND':
          console.log(`Setting ${wireName} to ${parsedFirst.value} AND ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value & parsedSecond.value);
          break;
        case 'OR':
          console.log(`Setting ${wireName} to ${parsedFirst.value} OR ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value | parsedSecond.value);
          break;
        case 'LSHIFT':
          console.log(`Setting ${wireName} to ${parsedFirst.value} LSHIFT ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value << parsedSecond.value);
          break;
        case 'RSHIFT':
          console.log(`Setting ${wireName} to ${parsedFirst.value} RSHIFT ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value >> parsedSecond.value);
          break;
      }
    }
  }

  console.log(wires);
  return wires.a;
};

const day7Puzzle2 = (input) => {
  const isNumber = (val) => !isNaN(val);
  const isAlpha = (val) => /^[a-z]+$/.test(val);
  const uint16 = (n) => n & 0xffff;

  let wires = { b: day7Puzzle1(input) };
  let steps = input.split('\n');

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

  for (let i = 0; i < steps.length; i++) {
    const parts = steps[i].split(' ');

    if (parts.length === 3) {
      const parsed = parseValue(parts[0]);
      const wireName = parts[2];
      if (wireName === 'b') continue;
      if (parsed.defined) {
        wires[wireName] = uint16(parsed.value);
        console.log(`Setting ${wireName} to ${parsed.value} which comes from ${parsed.key}.`);
      } else {
        console.log('Length 3 not defined');
        steps.push(steps[i]);
      }
    } else if (parts.length === 4) {
      const parsed = parseValue(parts[1]);
      const wireName = parts[3];
      if (wireName === 'b') continue;
      if (parsed.defined) {
        console.log(`Setting ${wireName} to NOT ${parsed.value} which comes from ${parsed.key}.`);
        wires[wireName] = uint16(~Number(parsed.value));
      } else {
        console.log('Length 4 not defined');
        steps.push(steps[i]);
      }
    } else {
      const op = parts[1];
      const wireName = parts[4];
      if (wireName === 'b') continue;

      const parsedFirst = parseValue(parts[0]);
      const parsedSecond = parseValue(parts[2]);

      if (!parsedFirst.defined) {
        console.log('Length 5, first value not defined');
        steps.push(steps[i]);
        continue;
      }

      if (!parsedSecond.defined) {
        console.log('Length 5, second value not defined');
        steps.push(steps[i]);
        continue;
      }

      switch (op) {
        case 'AND':
          console.log(`Setting ${wireName} to ${parsedFirst.value} AND ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value & parsedSecond.value);
          break;
        case 'OR':
          console.log(`Setting ${wireName} to ${parsedFirst.value} OR ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value | parsedSecond.value);
          break;
        case 'LSHIFT':
          console.log(`Setting ${wireName} to ${parsedFirst.value} LSHIFT ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value << parsedSecond.value);
          break;
        case 'RSHIFT':
          console.log(`Setting ${wireName} to ${parsedFirst.value} RSHIFT ${parsedSecond.value}.`);
          wires[wireName] = uint16(parsedFirst.value >> parsedSecond.value);
          break;
      }
    }
  }

  console.log(wires);
  return wires.a;
};
