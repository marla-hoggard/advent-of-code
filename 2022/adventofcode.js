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
  input.split('\n').forEach(rucksack => {
    const [comp1, comp2] = splitInTwo(rucksack);
    const error = findInBoth(comp1, comp2);
    const score = getPriorityScore(error);
    total += score;

  })
  return total;
}

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

  })
  return total;
}

/**
 * Takes a single string, splits it in two equal-length halves
 * and returns an array of the two halves.
 * For day3Puzzle1, all should be even length, but if odd, the first half would have the extra char
 */
const splitInTwo = (str) => {
  const half = Math.ceil(str.length / 2);
  return [
    str.slice(0, half),
    str.slice(half),
  ];
}

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
  console.log("No overlap found", s1, s2);
  return '';
}

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
  console.log("No overlap found", s1, s2, s3);
  return '';
}

/**
 * Takes a single character. Returns its score for day3Puzzle1.
 * Lowercase a-z mapped to 1-26
 * Uppercase A-Z mapped to 27-52
 */
const getPriorityScore = (char) => {
  const charCode = char.charCodeAt(0);
  // A-Z - Scores from 27-52
  if (charCode >=65 && charCode <= 90) {
    return charCode - 38;
  }
  // a-z - Scores from 1-26
  else if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  }
  else {
    console.log('Invalid character', char, charCode);
    return 0;
  }
}

/**
 * Each line of the input represents a pair of inclusive ranges, i.e. "2-6,5-10"
 * Counts the number of pairs in which one range fully overlaps with/is contained by the other.
 * Examples of full overlapa: 2-8,3-7 and 2-8,7-8
 */
const day4puzzle1 = (input) => {
  let count = 0;
  input.split('\n').forEach(pair => {
    const [range1, range2] = pair.split(',');
    const [min1, max1] = range1.split('-').map(el => +el);
    const [min2, max2] = range2.split('-').map(el => +el);

    if ((min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1)) {
      count++;
    }
  });

  return count;
}

/**
 * Each line of the input represents a pair of inclusive ranges, i.e. "2-6,5-10"
 * Counts the number of pairs in which the two ranges overlap at all.
 */
const day4puzzle2 = (input) => {
  let count = 0;
  input.split('\n').forEach(pair => {
    const [range1, range2] = pair.split(',');
    const [min1, max1] = range1.split('-').map(el => +el);
    const [min2, max2] = range2.split('-').map(el => +el);

    if ((min2 <= max1 && max2 >= min1) || (min1 <= max2 && max1 >= min2)) {
      count++;
    }
  });

  return count;
}
