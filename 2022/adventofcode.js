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
