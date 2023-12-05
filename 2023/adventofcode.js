// ---------- DAY 1 ----------- //

const callibration = (input) => {
  let sum = 0;
  input.split('\n').forEach((line) => {
    const digits = line.match(/\d/g);
    const num = digits[0] + digits.at(-1);
    sum += +num;
  });

  return sum;
};

const toNum = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
};

// This was my first successful solution
const callibration2orig = (input) => {
  let sum = 0;

  const regex = /\d|one|two|three|four|five|six|seven|eight|nine/;

  input.split('\n').forEach((line) => {
    let match = line.match(regex);
    const first = match[0];
    let last = first;
    let i = match.index + 1;

    // Find the last match
    // Need a loop to account for overlapping matches, like "twone"
    // that would otherwise be skipped
    while (match && i < line.length) {
      match = line.slice(i).match(regex);
      if (match) {
        last = match[0];
        i = match.index + i + 1;
      }
    }

    const pair = `${toNum[first]}${toNum[last]}`;
    sum += Number(pair);
  });

  return sum;
};

// This was my second solution
// Cleaner code, but more complicated regex
const callibration2 = (input) => {
  let sum = 0;

  const pattern = '\\d|one|two|three|four|five|six|seven|eight|nine';
  const firstRegex = new RegExp(pattern);
  // Finds the last occurrence of the pattern by searching for the pattern (optionally)
  // then anything then the pattern again. It's greedy so it will return the longest-such pattern,
  // aka the pattern that spans the first to the last occurrences. And captures the last in groups.last.
  // Note: If the whole sting is overlapping, like "twone" this will successfully capture "one" as last
  // but NOT "two" as the first match, so we should always do a regular first match separately
  const lastRegex = new RegExp(`(?:${pattern})?.*(?<last>${pattern})`);

  input.split('\n').forEach((line) => {
    const firstMatch = line.match(firstRegex);
    const lastMatch = line.match(lastRegex);

    const first = toNum[firstMatch[0]];
    const last = lastMatch ? toNum[lastMatch.groups.last] : first;

    const pair = `${first}${last}`;

    sum += Number(pair);
  });

  return sum;
};

// ---------- DAY 2 ----------- //
const possibleGames = (input) => {
  let sum = 0;
  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };

  input.split('\n').forEach((game) => {
    const [title, pulls] = game.split(': ');
    const gameId = +title.split(' ')[1];

    let isPossible = true;

    for (const draw of pulls.split(/[,;]\s/)) {
      const [count, color] = draw.split(' ');
      if (count > max[color]) {
        isPossible = false;
        break;
      }
    }

    if (isPossible) {
      sum += gameId;
    }
  });

  return sum;
};

const cubePowers = (input) => {
  let sum = 0;

  input.split('\n').forEach((game) => {
    pulls = game.split(': ')[1];

    const colorMax = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const draw of pulls.split(/[,;]\s/)) {
      const [count, color] = draw.split(' ');
      if (count > colorMax[color]) {
        colorMax[color] = +count;
      }
    }

    const power = colorMax.red * colorMax.green * colorMax.blue;
    sum += power;
  });

  return sum;
};

// ----------- DAY 3 ---------- //
const partNumbers = (input) => {
  const partNumRegex = /\d+/g;
  const symbolRegex = /[^.1-9]/;

  let sum = 0;

  input.split('\n').forEach((row, whichRow, rows) => {
    const matches = [...row.matchAll(partNumRegex)];
    for (const match of matches) {
      const value = +match[0];
      const startLoc = match.index - 1;
      const endLoc = match.index + match[0].length;

      if (whichRow !== 0) {
        const adjBefore = rows[whichRow - 1].substring(startLoc, endLoc + 1);
        if (symbolRegex.test(adjBefore)) {
          sum += value;
          continue;
        }
      }

      if (whichRow !== rows.length - 1) {
        const adjAfter = rows[whichRow + 1].substring(startLoc, endLoc + 1);
        if (symbolRegex.test(adjAfter)) {
          sum += value;
          continue;
        }
      }

      if (startLoc !== -1) {
        if (symbolRegex.test(row[startLoc])) {
          sum += value;
          continue;
        }
      }

      if (endLoc !== row.length) {
        if (symbolRegex.test(row[endLoc])) {
          sum += value;
          continue;
        }
      }
    }
  });

  return sum;
};

const gearRatios = (input) => {
  const isNumber = (char) => /\d/.test(char);

  const processNumLeft = (rowToProcess, index) => {
    if (index >= 0 && isNumber(rowToProcess[index - 1])) {
      let loc = index - 1;
      let cur = rowToProcess[loc];
      let val = '';
      while (loc >= 0 && isNumber(cur)) {
        val = `${cur}${val}`;
        loc--;
        cur = rowToProcess[loc];
      }

      return val;
    } else {
      return '';
    }
  };

  const processNumRight = (rowToProcess, index) => {
    if (index < rowToProcess.length && isNumber(rowToProcess[index + 1])) {
      let loc = index + 1;
      let cur = rowToProcess[loc];
      let val = '';
      while (loc < rowToProcess.length && isNumber(cur)) {
        val = `${val}${cur}`;
        loc++;
        cur = rowToProcess[loc];
      }
      return val;
    } else {
      return '';
    }
  };

  const processRow = (rowToProcess, index) => {
    const adjNumbers = [];

    const leftVal = processNumLeft(rowToProcess, index);
    const rightVal = processNumRight(rowToProcess, index);

    // The middle char is a '.' so process left and right separately
    if (rowToProcess[index] === '.') {
      if (leftVal) {
        adjNumbers.push(leftVal);
      }

      if (rightVal) {
        adjNumbers.push(rightVal);
      }
    } else {
      // There is at most one number. Process both directions then smoosh it together
      const val = `${leftVal}${rowToProcess[index]}${rightVal}`;
      if (val) {
        adjNumbers.push(val);
      }
    }
    return adjNumbers;
  };

  let sum = 0;

  input.split('\n').forEach((row, whichRow, rows) => {
    const stars = [...row.matchAll(/\*/g)];

    for (const star of stars) {
      const index = star.index;
      let adjNumbers = [];

      // Check the row before
      if (whichRow !== 0) {
        adjNumbers = adjNumbers.concat(processRow(rows[whichRow - 1], index));
      }

      // Check the row after
      if (whichRow !== rows.length - 1) {
        adjNumbers = adjNumbers.concat(processRow(rows[whichRow + 1], index));
      }

      // Check directly to the left
      if (index !== 0) {
        if (isNumber(row[index - 1])) {
          adjNumbers.push(processNumLeft(row, index));
        }
      }

      // Check directly to the right
      if (index !== row.length - 1) {
        if (isNumber(row[index + 1])) {
          adjNumbers.push(processNumRight(row, index));
        }
      }

      if (adjNumbers.length == 2) {
        sum += adjNumbers[0] * adjNumbers[1];
      }
    }
  });

  return sum;
};
