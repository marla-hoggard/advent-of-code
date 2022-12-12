/**
 * Provided a list of "elf meals".
 * Each meal's calories on a different line, with an extra line break between elves.
 * Find the total calories of the elf with the highest total.
 */
const day1puzzle1 = (input) => {
  let max = 0;
  input.split('\n\n').forEach((meals) => {
    const elf = sum(meals.split('\n'));

    if (elf > max) {
      max = elf;
    }
  });

  return max;
};

/**
 * Provided a list of "elf meals".
 * Each meal's calories on a different line, with an extra line break between elves.
 * Find the sum of the total calories of the elves with the top three totals.
 */
const day1puzzle2 = (input) => {
  const elves = [];
  input.split('\n\n').forEach((meals) => {
    const elf = sum(meals.split('\n'));
    elves.push(elf);
  });

  elves.sort((a, b) => b - a);
  return sum(elves.slice(0, 3));
};

/**
 * When given a list of Rock, Paper, Scissor plays like "A X",
 * returns the sum of the score of each play.
 * A = rock, B = paper, C = scissors for opponent
 * X = rock, B = paper, C = scissors for me
 *
 * Score 1 for rock, 2 for paper, 3 for scissors
 * Add 3 for a tie and 6 for a win (0 for a loss).
 */
const day2puzzle1 = (input) => {
  // Setting X to 4 instead of 1 allows us to check Me - Opp === 1
  // Applying a scoreClamp will convert the 4 to the proper score of 1
  const valueMap = { A: 1, B: 2, C: 3, X: 4, Y: 2, Z: 3 };

  let score = 0;

  input.split('\n').forEach((round) => {
    const [opp, me] = round.split(' ');
    const oppVal = valueMap[opp];
    const myVal = valueMap[me];

    const myScore = scoreClamp(myVal);
    score += myScore;

    if (oppVal === myScore) {
      score += 3;
    } else if (myVal - oppVal === 1) {
      score += 6;
    }
  });

  return score;
};

/**
 * When given a list of Rock, Paper, Scissor plays like "A X",
 * returns the sum of the score of each play.
 * A = rock, B = paper, C = scissors for opponent
 * X = lose, Y = tie, Z = win
 *
 * Score 1 for rock, 2 for paper, 3 for scissors
 * Add 3 for a tie and 6 for a win (0 for a loss).
 */
const day2puzzle2 = (input) => {
  const outcomeMap = { X: 0, Y: 3, Z: 6 }; // score for win/loss/tie
  const oppMap = { A: 1, B: 2, C: 3 }; // opponent's score
  const diffMap = { X: -1, Y: 0, Z: 1 }; // our score differs from theirs by this much

  let score = 0;

  input.split('\n').forEach((round) => {
    const [opp, me] = round.split(' ');

    const outcomeScore = outcomeMap[me];

    // The raw score could be anywhere from 0-4 so clamp it to [1,2,3]
    const playScore = scoreClamp(oppMap[opp] + diffMap[me]);

    score += outcomeScore + playScore;
  });
  return score;
};

/**
 * Clamps the score to [1,2,3] based on div by 3.
 * Essentially mod 3 except that numbers that are divisible by 3
 * will get a value of 3, instead of 0.
 */
const scoreClamp = (score) => ((score + 2) % 3) + 1;

/**
 * Find the "error" in each "rucksack".
 * 1. Split each string in half by length (i.e. abcdef -> [abc, def]).
 * 2. Find the only character (case sensitive) that appears in both halves
 * 3. Find the "priority score" of the common character (a-z = 1-26, A-Z = 27-52)
 * 4. Return the sum of the priority scores of each rucksack.
 */
const day3puzzle1 = (input) => {
  let total = 0;
  input.split('\n').forEach((rucksack) => {
    const [comp1, comp2] = splitInTwo(rucksack);
    const error = findInBoth(comp1, comp2);
    const score = getPriorityScore(error);
    total += score;
  });
  return total;
};

/**
 * Find the "badge" among each "elf group".
 * 1. Group each set of three consecutive strings in the input into an Elf Group
 * 2. Find the only character (case sensitive) that appears in all three strings
 * 3. Find the "priority score" of the common character (a-z = 1-26, A-Z = 27-52)
 * 4. Return the sum of the priority scores of each rucksack.
 */
const day3puzzle2 = (input) => {
  let total = 0;

  const rucksacks = input.split('\n');
  const groups = splitArrayInChunks(rucksacks, 3);

  groups.forEach(([comp1, comp2, comp3]) => {
    const badge = findInAllThree(comp1, comp2, comp3);
    const score = getPriorityScore(badge);
    total += score;
  });
  return total;
};

/**
 * Takes a single string, splits it in two equal-length halves
 * and returns an array of the two halves.
 * For day3Puzzle1, all should be even length, but if odd, the first half would have the extra char
 */
const splitInTwo = (str) => {
  const half = Math.ceil(str.length / 2);
  return [str.slice(0, half), str.slice(half)];
};

/**
 * When provided two strings, returns the character that is present in both.
 * Expectation for day3Puzzle1 is that there should only be one,
 * so it will return the first one found.
 */
const findInBoth = (s1, s2) => {
  for (const char of s1.split('')) {
    if (s2.includes(char)) {
      return char;
    }
  }
  console.log('No overlap found', s1, s2);
  return '';
};

/**
 * When provided three strings, returns the character that is present in all three.
 * Expectation for day3Puzzle2 is that there should only be one,
 * so it will return the first one found.
 */
const findInAllThree = (s1, s2, s3) => {
  for (const char of s1.split('')) {
    if (s2.includes(char) && s3.includes(char)) {
      return char;
    }
  }
  console.log('No overlap found', s1, s2, s3);
  return '';
};

/**
 * Takes a single character. Returns its score for day3Puzzle1.
 * Lowercase a-z mapped to 1-26
 * Uppercase A-Z mapped to 27-52
 */
const getPriorityScore = (char) => {
  const charCode = char.charCodeAt(0);
  // A-Z - Scores from 27-52
  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  }
  // a-z - Scores from 1-26
  else if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  } else {
    console.log('Invalid character', char, charCode);
    return 0;
  }
};

/**
 * Each line of the input represents a pair of inclusive ranges, i.e. "2-6,5-10"
 * Counts the number of pairs in which one range fully overlaps with/is contained by the other.
 * Examples of full overlapa: 2-8,3-7 and 2-8,7-8
 */
const day4puzzle1 = (input) => {
  let count = 0;
  input.split('\n').forEach((pair) => {
    const [range1, range2] = pair.split(',');
    const [min1, max1] = range1.split('-').map((el) => +el);
    const [min2, max2] = range2.split('-').map((el) => +el);

    if ((min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1)) {
      count++;
    }
  });

  return count;
};

/**
 * Each line of the input represents a pair of inclusive ranges, i.e. "2-6,5-10"
 * Counts the number of pairs in which the two ranges overlap at all.
 */
const day4puzzle2 = (input) => {
  let count = 0;
  input.split('\n').forEach((pair) => {
    const [range1, range2] = pair.split(',');
    const [min1, max1] = range1.split('-').map((el) => +el);
    const [min2, max2] = range2.split('-').map((el) => +el);

    if ((min2 <= max1 && max2 >= min1) || (min1 <= max2 && max1 >= min2)) {
      count++;
    }
  });

  return count;
};

/**
 * Executes stack movement one at a time.
 * Returns the top crate from each stack, in order, as a string.
 */
const day5puzzle1 = (input) => {
  const [setup, steps] = input.split('\n\n');
  const stacks = parseStacks(setup);

  steps.split('\n').forEach((step) => {
    const [_move, count, _from, fromStack, _to, toStack] = step.split(' ').map((el) => +el);
    for (let i = 0; i < count && stacks[fromStack].length > 0; i++) {
      const crate = stacks[fromStack].pop();
      stacks[toStack].push(crate);
    }
  });

  return stacks.map((el) => el.at(-1)).join('');
};

/**
 * Executes stack movement as an ordered group for each step.
 * Returns the top crate from each stack, in order, as a string.
 */
const day5puzzle2 = (input) => {
  const [setup, steps] = input.split('\n\n');
  const stacks = parseStacks(setup);

  steps.split('\n').forEach((step) => {
    const [_move, count, _from, fromStack, _to, toStack] = step.split(' ').map((el) => +el);
    const toMove = stacks[fromStack].slice(0 - count);
    stacks[fromStack] = stacks[fromStack].slice(0, 0 - count);
    stacks[toStack] = stacks[toStack].concat(...toMove);
  });

  return stacks.map((el) => el.at(-1)).join('');
};

/**
 * Parses the stack part of the puzzle input into an array of Stacks
 */
const parseStacks = (stackInput) => {
  const rows = stackInput.split('\n');
  const labels = rows.at(-1);
  const numbers = labels.trim().split(/\s+/);
  const stacks = Array(numbers.length)
    .fill(null)
    .map((el) => []);

  const stackSetup = rows.slice(0, -1).reverse();
  stackSetup.forEach((row) => {
    const items = row.match(/.{1,4}/g);
    items.forEach((item, i) => {
      const hasItem = item.match(/[A-Z]/);
      if (hasItem) {
        stacks[i].push(hasItem[0]);
      }
    });
  });

  // The stacks are 1-indexed in the puzzle, so add an empty stack to be index 0
  stacks.unshift([]);

  return stacks;
};

/**
 * Finds the position of the first section of the input string
 * where there are four consecutive non-matching characters.
 *
 * The "position" is the 1-based index of the last character in the substring.
 *
 * This was my first method, but it would be very tedious to do the checks
 * for more than 4. So after reading part two, I created a more programmatic solution.
 */
const day6puzzle1 = (input) => {
  for (let i = 4; i < input.length; i++) {
    const [a, b, c, d] = input.slice(i - 4, i).split('');
    if (a !== b && a !== c && a !== d && b !== c && b !== d && c !== d) {
      console.log([a, b, c, d].join(''));
      return i;
    }
  }

  return 'None found;';
};

/**
 * Finds the position of the first section of the input string
 * where there are @len consecutive non-matching characters.
 *
 * The "position" is the 1-based index of the last character in the substring.
 */
const day6solution = (input, len = 4) => {
  const regex = day6regex(len);
  const match = input.match(regex);
  if (match) {
    return match.index + len;
  }

  return 'None found;';
};

/**
 * Constructs a regular expression for finding a set of @num
 * unmatching consecutive characters using negative lookaheads.
 *
 * Ex: day6regex(3) = /(.)(?!\1)(.)(?!\1)(?!\2)(.)/
 */
const day6regex = (num) => {
  let regex = '';
  for (let i = 0; i < num; i++) {
    for (let j = 1; j <= i; j++) {
      regex += `(?!\\${j})`;
    }
    regex += '(.)';
  }
  return new RegExp(regex);
};

/**
 * Finds the sum of the sizes of the directories
 * whose size is less than 100,000
 */
const day7puzzle1 = (input) => {
  const dirSizes = buildFileSystem(input);

  return Object.values(dirSizes).reduce((sum, dir) => (dir <= 100000 ? sum + dir : sum), 0);
};

/**
 * Finds the size of the smallest directory that can be deleted
 * to free up sufficient space, where the goal is to have 30,000,000
 * out of 70,000,000 available, and used space is the size of '/'.
 */
const day7puzzle2 = (input) => {
  const dirSizes = buildFileSystem(input);
  const total = 70000000;
  const spaceNeeded = 30000000;
  const used = dirSizes['/'];

  // The amount of space that needs to be freed
  const target = spaceNeeded - (total - used);

  // Sort ascending then return the first that is at least `target`
  return Object.values(dirSizes)
    .sort((a, b) => a - b)
    .find((el) => el >= target);
};

/**
 * Creates a files object representing the file system
 * and a dirSizes object that contains the total size of each folder, by path.
 * Returns dirSizes (as files isn't ultimately needed).
 */
const buildFileSystem = (input) => {
  let files = { '/': {} };
  let path = [files['/']];
  let currentDir = ['/'];
  let dirSizes = { '/': 0 };
  let isListing = false;

  for (const line of input.split('\n')) {
    const current = path.at(-1);
    const commands = line.split(' ');
    if (commands[0] === '$') {
      if (commands[1] === 'ls') {
        isListing = true;
      } else {
        if (isListing) {
          isListing = false;
        }

        if (commands[2] === '/') {
          path = [files['/']];
          currentDir = ['/'];
        } else if (commands[2] === '..') {
          path = path.slice(0, -1);
          currentDir = currentDir.slice(0, -1);
        } else {
          if (!current[commands[2]]) {
            current[commands[2]] = {};
          }
          path.push(current[commands[2]]);
          currentDir.push(`${currentDir.at(-1)},${commands[2]}`);
        }
      }
    } else if (isListing && !current[commands[1]]) {
      if (commands[0] === 'dir') {
        current[commands[1]] = {};
        dirSizes[`${currentDir.at(-1)},${commands[1]}`] = 0;
      } else {
        const size = +commands[0];
        current[commands[1]] = size;
        currentDir.forEach((dirInPath) => {
          dirSizes[dirInPath] += size;
        });
      }
    } else {
      console.log('unexpected command', line);
    }
  }

  console.log(files);
  console.log(dirSizes);

  return dirSizes;
};
