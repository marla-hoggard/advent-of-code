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

const day2puzzle1 = (input) => {
  let invalidIds = 0;
  input.split(',').forEach((range) => {
    const [start, end] = range.split('-');
    if (start.length === end.length && start.length % 2 === 1) {
      return;
    }
    for (let i = +start; i <= +end; i++) {
      if (isInvalid1(i.toString())) {
        invalidIds += i;
      }
    }
  });

  return invalidIds;
};

const isInvalid1 = (str) => {
  const len = str.length;
  if (len % 2 !== 0) {
    return false;
  }

  const firstHalf = str.slice(0, len / 2);
  const secondHalf = str.slice(len / 2);
  return firstHalf === secondHalf;
};

const day2puzzle2 = (input) => {
  let invalidIds = 0;
  input.split(',').forEach((range) => {
    const [start, end] = range.split('-');
    for (let i = +start; i <= +end; i++) {
      if (isInvalid2(i.toString())) {
        invalidIds += i;
      }
    }
  });

  return invalidIds;
};

const isInvalid2 = (str) => {
  const len = str.length;
  // debugger;

  for (let i = 1; i <= len / 2; i++) {
    if (len % i !== 0) {
      continue;
    }

    const matcher = str.slice(0, i);
    let valid = true;
    for (let j = i; j < len; j += i) {
      const substr = str.slice(j, j + i);
      if (substr !== matcher) {
        valid = false;
        break;
      }
    }
    if (valid) {
      // console.log(str);
      return true;
    }
  }
  return false;
};

const isInvalid2a = (str) => {
  const len = str.length;
  // debugger;

  for (let i = 1; i <= len / 2; i++) {
    if (len % i !== 0) {
      continue;
    }

    const matcher = str.slice(0, i);
    const times = len / i;
    if (str === matcher.repeat(times)) {
      // console.log(str, matcher);
      return true;
    }
  }
  return false;
};
