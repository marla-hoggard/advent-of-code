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

/**
 * Returns the number of "trees" that are visible from
 * at least on edge of the grid. A tree is visible from a given
 * edge if it is taller than all the trees between it and that edge.
 */
const day8puzzle1 = (input) => {
  let count = 0;
  input.split('\n').forEach((row, r, grid) => {
    row.split('').forEach((val, c) => {
      // Check top
      let visible = true;
      for (let i = 0; i < r; i++) {
        if (grid[i][c] >= val) {
          visible = false;
          break;
        }
      }
      if (visible) {
        count++;
        return;
      }

      // Check bottom
      visible = true;
      for (let i = row.length - 1; i > r; i--) {
        if (grid[i][c] >= val) {
          visible = false;
          break;
        }
      }
      if (visible) {
        count++;
        return;
      }

      // Check left
      visible = true;
      for (let i = 0; i < c; i++) {
        if (grid[r][i] >= val) {
          visible = false;
          break;
        }
      }
      if (visible) {
        count++;
        return;
      }

      // Check right
      visible = true;
      for (let i = grid[0].length - 1; i > c; i--) {
        if (grid[r][i] >= val) {
          visible = false;
          break;
        }
      }
      if (visible) {
        count++;
      }
    });
  });

  return count;
};

/**
 * Finds the tree with the highest "treehouse score".
 * A tree's score is the product of the visible trees
 * in each direction. A tree is visible from the treehouse
 * if it is less than or equal to the value of the treehouse.
 */
const day8puzzle2 = (input) => {
  let highScore = 0;
  input.split('\n').forEach((row, r, grid) => {
    row.split('').forEach((val, c) => {
      // If we're on an edge, skip it because at least one direction will be 0
      if (r === 0 || c === 0 || r === row.length - 1 || c === grid[0].length - 1) {
        return;
      }
      let top = 0;
      let bottom = 0;
      let left = 0;
      let right = 0;

      let i = r - 1;
      while (i >= 0) {
        top++;
        if (grid[i][c] >= val) break;
        i--;
      }
      if (top === 0) return;

      i = r + 1;
      while (i < row.length) {
        bottom++;
        if (grid[i][c] >= val) break;
        i++;
      }
      if (bottom === 0) return;

      i = c - 1;
      while (i >= 0) {
        left++;
        if (grid[r][i] >= val) break;
        i--;
      }
      if (left === 0) return;

      i = c + 1;
      while (i < grid[0].length) {
        right++;
        if (grid[r][i] >= val) break;
        i++;
      }

      score = top * bottom * right * left;
      if (score > highScore) {
        console.log(
          'New high score',
          score,
          val,
          `[${r},${c}]`,
          `[${top},${bottom},${left},${right}]`,
        );
        highScore = score;
      }
    });
  });

  return highScore;
};

/**
 * The head of a rope with @param num knots follows a sequence of movements.
 * Each consecutive knot pair can be at most one coordinate (incl diagonally) apart.
 * How many unique locations does the tail (the 10th knot) visit?
 */
const day9solution = (input, num = 2) => {
  let knots = Array(num)
    .fill(null)
    .map(() => [0, 0]);
  let visited = new Set();
  visited.add('0,0');

  // After moving one knot, see if the next knot must move
  const reconcile = (k1, k2) => {
    const xDiff = knots[k1][0] - knots[k2][0];
    const yDiff = knots[k1][1] - knots[k2][1];

    if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) {
      return;
    }

    if (yDiff < 0) {
      knots[k2][1]--;
    } else if (yDiff > 0) {
      knots[k2][1]++;
    }

    if (xDiff < 0) {
      knots[k2][0]--;
    } else if (xDiff > 0) {
      knots[k2][0]++;
    }
  };

  const moveLeft = () => {
    knots[0][0]--;
  };

  const moveRight = () => {
    knots[0][0]++;
  };

  const moveUp = () => {
    knots[0][1]++;
  };

  const moveDown = () => {
    knots[0][1]--;
  };

  for (const instr of input.split('\n')) {
    const [dir, amt] = instr.split(' ');
    let moveHead = () => console.log('Unexpected direction');
    switch (dir) {
      case 'L':
        moveHead = moveLeft;
        break;
      case 'R':
        moveHead = moveRight;
        break;
      case 'U':
        moveHead = moveUp;
        break;
      case 'D':
        moveHead = moveDown;
        break;
    }

    for (let i = 0; i < +amt; i++) {
      moveHead();
      for (let k = 0; k < knots.length - 1; k++) {
        reconcile(k, k + 1);
      }
      visited.add(knots.at(-1).join(','));
    }
  }

  return visited.size;
};

const day10puzzle1 = (input) => {
  let x = 1;
  let cycle = 0;
  let strength = 0;
  const milestones = [20, 60, 100, 140, 180, 220];

  for (const instr of input.split('\n')) {
    cycle++;

    if (milestones.includes(cycle)) {
      strength += x * cycle;
      console.log('second', cycle, x * cycle, strength, instr);
      if (cycle === 220) break;
    }

    if (instr === 'noop') {
      continue;
    }

    cycle++;

    if (milestones.includes(cycle)) {
      strength += x * cycle;
      console.log('third', cycle, x * cycle, strength, instr);
      if (cycle === 220) break;
    }

    const value = +instr.split(' ')[1];
    x += value;
  }

  return strength;
};

const day10puzzle2 = (input) => {
  let x = 1;
  let cycle = 0;
  let row = 0;
  let pixels = [[]];
  let done = false;

  const populateDisplay = () => {
    if (x >= cycle - 1 && x <= cycle + 1) {
      pixels[row].push(true);
    } else {
      pixels[row].push(false);
    }
  };

  const incrementCycle = () => {
    cycle++;
    if (cycle > 39) {
      cycle = 0;
      if (row < 5) {
        row++;
        pixels.push([]);
      } else {
        done = true;
      }
    }
  };

  for (const instr of input.split('\n')) {
    populateDisplay();
    incrementCycle();
    if (done) break;

    if (instr === 'noop') {
      continue;
    }

    populateDisplay();
    incrementCycle();
    if (done) break;

    const value = +instr.split(' ')[1];
    x += value;
  }

  drawPixels10(pixels);
  return 'See visualization';
};

const drawPixels10 = (displayGrid) => {
  const imageDiv = document.getElementById('day10visualization');
  imageDiv.innerHTML = '';
  displayGrid.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('day10row');
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('day10cell');
      if (cell) {
        cellDiv.classList.add('black');
      }
      rowDiv.appendChild(cellDiv);
    });
    imageDiv.appendChild(rowDiv);
  });
  imageDiv.style.visibility = 'visible';
};

const day11puzzle1 = (input, rounds = 20) => {
  const monkeys = parseMonkeys(input);

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      // For each item in the monkey's list
      // run the operation, divide by 3 and round down,
      // then pass the updated item to the appropriate monkey based on the divisility test
      // and finally, increment the number of inspected items for this monkey
      while (monkey.items.length) {
        let val = monkey.items.shift();
        val = monkey.op(val);
        val = Math.floor(val / 3);
        if (val % monkey.divTest === 0) {
          monkeys[monkey.truePass].items.push(val);
        } else {
          monkeys[monkey.falsePass].items.push(val);
        }
        monkey.inspected++;
      }
    }
  }

  console.log(monkeys);

  const inspections = monkeys.map((m) => m.inspected).sort((a, b) => b - a);
  return inspections[0] * inspections[1];
};

const day11puzzle2 = (input, rounds = 10000) => {
  const monkeys = parseMonkeys(input);

  // Find the product of all the divisibility test values
  // Any number should have the same mod for every monkey as its equivalent modulo the masterMod
  // This will ensure that our item values never go above the masterMod, so they won't get too high to track
  const masterMod = monkeys.reduce((prod, { divTest }) => prod * divTest, 1);

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      // For each item in the monkey's list
      // run the operation, clamp to the masterMod,
      // then pass the updated item to the appropriate monkey based on the divisility test
      // and finally, increment the number of inspected items for this monkey
      while (monkey.items.length) {
        let old = monkey.items.shift();
        let val = monkey.op(old);
        val %= masterMod;
        if (val % monkey.divTest === 0) {
          monkeys[monkey.truePass].items.push(val);
        } else {
          monkeys[monkey.falsePass].items.push(val);
        }
        monkey.inspected++;
      }
    }
    if ((i + 1) % 1000 === 0) {
      console.log(monkeys.map((m) => m.inspected));
    }
  }

  console.log(monkeys);

  const inspections = monkeys.map((m) => m.inspected).sort((a, b) => b - a);
  return inspections[0] * inspections[1];
};

// Parses the day 11 puzzle input into an array of monkey objects
const parseMonkeys = (input) => {
  const monkeys = [];
  for (const data of input.split('\n\n')) {
    let monkey = { inspected: 0 };
    const [monkeyNum, starters, operation, test, trueTest, falseTest] = data
      .split('\n')
      .map((line) => line.trim());

    monkey.num = +monkeyNum.match(/^Monkey (?<num>\d+):$/).groups.num;
    monkey.items = starters
      .split(': ')[1]
      .split(', ')
      .map((el) => +el);
    monkey.divTest = +test.split('divisible by ')[1];
    monkey.truePass = +trueTest.split('throw to monkey ')[1];
    monkey.falsePass = +falseTest.split('throw to monkey ')[1];

    const [op, val] = operation.split('new = old ')[1].split(' ');
    if (op === '*') {
      if (val === 'old') {
        monkey.op = (x) => x * x;
      } else {
        monkey.op = (x) => x * Number(val);
      }
    } else {
      if (val === 'old') {
        monkey.op = (x) => x + x;
      } else {
        monkey.op = (x) => x + Number(val);
      }
    }

    monkeys.push(monkey);
  }
  return monkeys;
};

const day12puzzle1 = (input) => {
  const map = new ElevationMap(input);
  return calculateBestPath(map.start);
};

const day12puzzle2 = (input) => {
  const map = new ElevationMap(input);
  let bestPath = calculateBestPath(map.start);
  for (const startNode of map.getAdditionalStartNodes()) {
    map.resetNodes();
    const len = calculateBestPath(startNode, bestPath);
    if (len < bestPath) {
      bestPath = len;
    }
  }
  return bestPath;
};

const calculateBestPath = (startNode, max) => {
  let paths = [new ElevationPath(startNode)];
  let rounds = 0;
  while (paths.length > 0) {
    const newPaths = [];
    for (const path of paths) {
      for (const n of path.currentNode.neighbors) {
        const pathLength = path.getLength();
        if (max && pathLength >= max) {
          return max;
        } else if (n.isEnd) {
          console.log('new best', pathLength);
          return pathLength;
        } else if (!n.visited) {
          newPaths.push(path.visitNode(n));
        }
      }
    }
    paths = [...newPaths];
    rounds++;
  }

  return max;
};

/**
 * For each pair of "packet", determines if they are provided in order.
 * Returns the sum of the 1-indexed indices of the pairs that are in order.
 */
const day13puzzle1 = (input) => {
  const pairs = input.split('\n\n').map((pair) => pair.split('\n').map((val) => JSON.parse(val)));
  const indices = [];
  let sumIndices = 0;

  pairs.forEach((pair, i) => {
    if (isInOrder(pair)) {
      indices.push(i + 1);
      sumIndices += i + 1;
    } else {
    }
  });

  console.log(indices);

  return sumIndices;
};

/**
 * Sorts the total list of packets, ignoring original pairings,
 * plus [[2]] and [[6]].
 * Returns the product of the 1-indexed indices of where [[2]] and [[6]] ended up.
 */
const day13puzzle2 = (input) => {
  const packets = input
    .split('\n\n')
    .flatMap((pair) => pair.split('\n').map((val) => JSON.parse(val)));
  packets.push([[2]]);
  packets.push([[6]]);

  const sortedPackets = packets.sort((a, b) => (isInOrder([a, b]) ? -1 : 1));

  const sortedStrings = sortedPackets.map((packet) => JSON.stringify(packet));
  const two = sortedStrings.indexOf('[[2]]') + 1;
  const six = sortedStrings.indexOf('[[6]]') + 1;
  console.log(two, six);
  return two * six;
};

/**
 * Takes an array of two "packets".
 * Returns true if the packets are "in order" meaning the first packet is "less than" the second.
 * Packets should be numbers or arrays of (arrays of) numbers.
 */
const isInOrder = (pair) => {
  const [left, right] = pair;
  for (let i = 0; i < left.length; i++) {
    if (right[i] === undefined) {
      return false;
    }

    if (typeof left[i] === 'number' && typeof right[i] === 'number') {
      if (left[i] < right[i]) {
        return true;
      } else if (left[i] > right[i]) {
        return false;
      } else {
        continue;
      }
    }

    const leftValue = typeof left[i] === 'number' ? [left[i]] : left[i];
    const rightValue = typeof right[i] === 'number' ? [right[i]] : right[i];

    if (JSON.stringify(leftValue) === JSON.stringify(rightValue)) {
      continue;
    } else {
      return isInOrder([leftValue, rightValue]);
    }
  }

  return true;
};

const day14puzzle1 = (input) => {
  const { grid, maxX, maxY } = parseInput14(input);
  drawInitialGrid14(grid, maxX, maxY, 1);

  let sand = 0;
  const startX = 500;
  const startY = 0;
  let x = startX;
  let y = startY;

  while (y <= maxY) {
    // Move down
    if (!grid[x]?.[y + 1]) {
      y++;
    }
    // Move down left
    else if (!grid[x - 1]?.[y + 1]) {
      x--;
      y++;
    }
    // Move down right
    else if (!grid[x + 1]?.[y + 1]) {
      x++;
      y++;
    }
    // Settled
    else {
      sand++;
      if (!grid[x]) {
        grid[x] = {};
      }
      grid[x][y] = 'S';
      updateGrid14(x, y, 'red', 1);
      x = startX;
      y = startY;
    }
  }

  return sand;
};

const day14puzzle2 = (input) => {
  const { grid, maxX, maxY } = parseInput14(input);
  drawInitialGrid14(grid, maxX, maxY, 2);
  let sand = 0;
  const startX = 500;
  const startY = 0;
  let x = startX;
  let y = startY;

  while (true) {
    let moved = false;
    // Move down
    if (!grid[x]?.[y + 1]) {
      y++;
      moved = true;
    }
    // Move down left
    else if (!grid[x - 1]?.[y + 1]) {
      x--;
      y++;
      moved = true;
    }
    // Move down right
    else if (!grid[x + 1]?.[y + 1]) {
      x++;
      y++;
      moved = true;
    }

    // Settled by movement or on bottom
    if (!moved || y > maxY) {
      sand++;
      if (!grid[x]) {
        grid[x] = {};
      }
      grid[x][y] = 'S';
      updateGrid14(x, y, 'red', 2);

      // Settled location = start location
      if (x === startX && y === startY) {
        return sand;
      }
      x = startX;
      y = startY;
    }
  }
};

const parseInput14 = (input) => {
  const grid = {};
  let maxX = 0;
  let maxY = 0;
  for (const line of input.split('\n')) {
    const points = line.split(' -> ');
    for (let i = 0; i < points.length - 1; i++) {
      const [startX, startY] = points[i].split(',').map((el) => +el);
      const [endX, endY] = points[i + 1].split(',').map((el) => +el);

      if (startX === endX) {
        const x = startX;
        if (x > maxX) {
          maxX = x;
        }
        if (!grid[x]) {
          grid[x] = {};
        }

        if (startY > endY) {
          if (startY > maxY) {
            maxY = startY;
          }
          for (let y = startY; y >= endY; y--) {
            grid[x][y] = '#';
          }
        } else {
          if (endY > maxY) {
            maxY = endY;
          }
          for (let y = startY; y <= endY; y++) {
            grid[x][y] = '#';
          }
        }
      } else {
        const y = startY;
        if (y > maxY) {
          maxY = y;
        }
        if (startX > endX) {
          if (startX > maxX) {
            maxX = startX;
          }
          for (let x = startX; x >= endX; x--) {
            if (!grid[x]) {
              grid[x] = {};
            }
            grid[x][y] = '#';
          }
        } else {
          if (endX > maxX) {
            maxX = endX;
          }
          for (let x = startX; x <= endX; x++) {
            if (!grid[x]) {
              grid[x] = {};
            }
            grid[x][y] = '#';
          }
        }
      }
    }
  }

  return { grid, maxX, maxY };
};

const drawInitialGrid14 = (grid, maxX, maxY, puzzle) => {
  const imageDiv = document.getElementById('day14visualization1');
  imageDiv.innerHTML = '';
  for (let y = 0; y <= maxY + 2; y++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('day14row');
    rowDiv.id = `day14${puzzle}-row${y}`;

    for (let x = 0; x <= maxX * 2; x++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('day14cell');
      if (grid[x]?.[y]) {
        const value = grid[x][y];
        cellDiv.classList.add(value === '#' ? 'black' : 'red');
      }
      cellDiv.id = `day14${puzzle}-row${y}-cell${x}`;
      rowDiv.appendChild(cellDiv);
    }
    imageDiv.appendChild(rowDiv);
  }
  imageDiv.style.visibility = 'visible';
};

const updateGrid14 = (x, y, color, puzzle) => {
  const cellDiv = document.getElementById(`day14${puzzle}-row${y}-cell${x}`);
  cellDiv.classList.add(color);
};

const day15puzzle1 = (input, rowY = 10) => {
  const inRange = new Set();

  input.split('\n').forEach((line) => {
    const matches = line.match(day15regex);
    if (!matches?.groups) {
      console.log("Regex didn't match.", line);
      return;
    }

    const { sensorX, sensorY, beaconX, beaconY } = Object.entries(matches.groups).reduce(
      (groups, [key, val]) => {
        groups[key] = +val;
        return groups;
      },
      {},
    );

    const maxDist = manhattanDistance([sensorX, sensorY], [beaconX, beaconY]);
    const distToRow = Math.abs(sensorY - rowY);
    const diff = maxDist - distToRow;

    if (diff < 0) {
      return;
    }

    for (let x = sensorX - diff; x < sensorX + diff; x++) {
      inRange.add(x);
    }
  });

  return inRange.size;
};

const day15puzzle2 = (input, max = 20) => {
  const inputs = [];
  input.split('\n').forEach((line) => {
    const matches = line.match(day15regex);

    const { sensorX, sensorY, beaconX, beaconY } = Object.entries(matches.groups).reduce(
      (groups, [key, val]) => {
        groups[key] = +val;
        return groups;
      },
      {},
    );

    const maxDist = manhattanDistance([sensorX, sensorY], [beaconX, beaconY]);
    inputs.push({ sensorX, sensorY, maxDist });
  });

  for (let y = 0; y <= max; y++) {
    let range = { min: 0, max, low: max, high: 0, series: [] };

    for (const { sensorX, sensorY, maxDist } of inputs) {
      const distToRow = Math.abs(sensorY - y);
      const diff = maxDist - distToRow;

      if (diff < 0) {
        continue;
      }

      range = combineRange(range, sensorX - diff, sensorX + diff);

      // Once we have a range that goes from min to max, there's no reason to keep processing
      if (range.series.find((r) => r.low === 0 && r.high === max)) {
        range.series = [{ low: 0, high: max }];
        continue;
      }
    }

    // If we have two series, then we found our missing space.
    // The expectation is the series are [{ low: 0, high: x - 1 }, { low: x + 1, high: max}]
    // where x is the value we're looking for
    if (range.series.length > 1) {
      if (range.series.length !== 2) {
        console.log('uh oh', y, range);
      }

      console.log(range.series);

      const x = range.series.find((r) => r.low === 0).high + 1;

      console.log({ x, y });

      return x * 4000000 + y;
    }
  }
};

/**
 * A range object represents a list of integers as a more compact series of ranges.
 * The range object has the following properties:
 * min - minimum allowed value
 * max - maximum allowed value
 * low - lowest low of any range in the series
 * high - highest high of any range in the series
 * series - an array of ranges with two properties, low & high, to represent a series of integers
 *
 * For example, the following range object (without min/max), represents this list of integers:
 * [1,2,3,7,8,9,23,24,25] -> { low: 1, high: 25, series: [{ low: 1, high: 3 }, { low: 7, high: 9 }, { low: 23, high: 25 }]}
 *
 * This method will take a range object and an new low/high value representing an addition sequence of numbers,
 * and return an updated range object including the newest set of integers.
 *
 * @param {*} prevRange - Existing range object to update
 * @param {*} newRangeLow - The lowest value of the new integers to add (inclusive)
 * @param {*} newRangeHigh - The highest value of the new integers to add (inclusive)
 *
 * For example, if we want to add [3,4,5,6,7] to [4,5,11,12], the new list would be [3,4,5,6,7,11,12].
 * This method would look as follows:
 * prevRange: { low: 4, high: 12, series: [{ low: 4, high: 5 }, { low: 11, high: 12 }]}
 * combineRange(prevRange, 3, 7) = { low: 3, high: 12, series: [{ low: 3, high: 7 }, { low: 11, high: 12 }]}
 */
const combineRange = (prevRange, newRangeLow, newRangeHigh) => {
  let min = prevRange.min;
  let max = prevRange.max;

  const low = Math.max(newRangeLow, min);
  const high = Math.min(newRangeHigh, max);

  const newRange = {
    min,
    max,
    low: Math.min(low, prevRange.low),
    high: Math.max(high, prevRange.high),
    series: prevRange.series,
  };

  // The range is outside all existing ranges. Add it and return
  if (!prevRange.series.length || low > prevRange.high + 1 || high < prevRange.low - 1) {
    newRange.series.push({ low, high });
    return newRange;
  }

  // The range falls within an existing range. Just return the previous data
  if (prevRange.series.find((r) => r.low <= low && r.high >= high)) {
    return newRange;
  }

  let leftOverlap = null;
  let rightOverlap = null;
  const intact = [];

  prevRange.series.forEach((r) => {
    if (low <= r.low && high >= r.high) {
      // This range is swallowed by the new range, remove it
    } else if (low <= r.low && high >= r.low - 1 && high <= r.high) {
      leftOverlap = r;
    } else if (low >= r.low && low <= r.high + 1 && high >= r.high) {
      rightOverlap = r;
    } else {
      intact.push(r);
    }
  });

  if (leftOverlap && rightOverlap) {
    newRange.series = intact.concat({
      low: rightOverlap.low,
      high: leftOverlap.high,
    });
  } else if (leftOverlap) {
    newRange.series = intact.concat({
      low,
      high: leftOverlap.high,
    });
  } else if (rightOverlap) {
    newRange.series = intact.concat({
      low: rightOverlap.low,
      high,
    });
  } else {
    newRange.series = intact.concat({ low, high });
  }

  return newRange;
};

const day15regex =
  /^Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)$/;
