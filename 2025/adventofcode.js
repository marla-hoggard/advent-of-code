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
