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
