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
