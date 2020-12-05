// --------- DAY 1 -------- //
// Given a list of numbers, find the pair (p1) or trio (p2) that sums to 2020
// Below are two different solutions, brute force and slightly smarter

// The brute force solution:
// Loop through the input and check all pairs until we found a pair that sums to 2020
const findPairSum2020BruteForce = input => {
  const array = input.split("\n").map(el => Number(el));

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const first = array[i];
      const second = array[j];
      if (first + second === 2020) {
        console.log(`${first} + ${second} = 2020`);
        return first * second;
      }
    }
  }
  console.log("No pairs found");
  return 0;
}

// The brute force solution:
// Loop through the input and check all trios until we found a trio that sums to 2020
const findTrioSum2020BruteForce = input => {
  const array = input.split("\n").map(el => Number(el));

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      for (let k = j + 1; k < array.length; k++) {
        const first = array[i];
        const second = array[j];
        const third = array[k];
        if (first + second + third === 2020) {
          console.log(`${first} + ${second} + ${third}= 2020`);
          return first * second * third;
        }
      }
    }
  }
  console.log("No trio found");
  return 0;
}

// Day 1 solution 2 loops through the elements then checks the remaining elements
// for the value (or set of values that sum to) the difference between 2020 and the element
// params:
//  @array: array of numbers (must transform input in advance)
//  @total: the total the numbers must sum to
//  @n: how many numbers to find that together sum to @total
// returns: the product of the n numbers or false if no set exists
const findNSumTotal = (array, total, n) => {
  if (n === 1) {
    if (array.includes(total)) {
      return total;
    } else {
      return false;
    }
  }

  for (let i = 0; i < array.length; i++) {
    const remainingValue = total - array[i];
    const foundProduct = findNSumTotal(array.slice(i + 1), remainingValue, n - 1);
    if (foundProduct) {
      return array[i] * foundProduct;
    }
  }

  console.log("No trio found");
  return 0;
}

// Puzzle 1: n = 2, Puzzle 2: n = 3
const day1Solution2 = (input, n) => {
  const array = input.split("\n").map(el => Number(el));

  return findNSumTotal(array, 2020, n);
}

// ---------- DAY 2 ----------- //
// Given a list of passwords and their rules, return the number of passwords that are valid
// Each row in the input is in the format "#-# x: password"
// What the two numbers represent differs in each puzzle

// Day 2 - Puzzle 1
// Format: `min-max letter: password`
// Valid if @letter occurs between @min and @max times in @password
const numValidPasswords1 = input => {
  return input.split("\n").map(row => {
    const [min, max, letter, password] = row.split(/[-\s:]+/).map(el => isNaN(el) ? el : +el);
    return { min, max, letter, password }
  }).reduce((numValid, el) => isValid1(el) ? numValid + 1 : numValid, 0);
}

const isValid1 = ({ min, max, letter, password}) => {
  const found = numOccurrences(password, letter);
  return found >= min && found <= max;
}

// Day 2 - Puzzle 2
// Format: `index1-index2 letter: password`
// Valid if @letter occurs at @index1 OR @index2 of @password but not both, where indices are 1-based
const numValidPasswords2 = input => {
  return input.split("\n").map(row => {
    const [first, second, letter, password] = row.split(/[-\s:]+/).map(el => isNaN(el) ? el : +el);
    return { first: first - 1, second: second - 1, letter, password }
  }).reduce((numValid, el) => isValid2(el) ? numValid + 1 : numValid, 0);
}

const isValid2 = ({ first, second, letter, password}) => {
  return (password[first] === letter || password[second] === letter)
    && password[first] !== password[second];
}

// --------- DAY 3 ---------------
// Day 3 - Puzzle 1
const numTreesDiagonal = input => {
  const rows = input.split("\n");
  let numTrees = 0;
  rows.forEach((row, i) => {
    const spot = row[(3*i) % row.length];
    if (spot === '#') {
      numTrees++;
    }
  });
  return numTrees;
}

// Day 3 - Puzzle 2
const day3Puzzle2 = input => {
  const rows = input.split("\n");
  return numTreesAnyDiagonal(rows, 1, 1) *
    numTreesAnyDiagonal(rows, 3, 1) *
    numTreesAnyDiagonal(rows, 5, 1) *
    numTreesAnyDiagonal(rows, 7, 1) *
    numTreesAnyDiagonal(rows, 1, 2);
};

const numTreesAnyDiagonal = (rows, right, down) => {
  let numTrees = 0;
    for (let i = 0; i < rows.length; i += down) {
      const row = i;
      const col = i*(right/down) % rows[0].length;
      if(rows[row][col] === "#") {
        numTrees++;
      }
    }
  return numTrees;
}

// --------- DAY 4 -------------
const validatePassports = (input, validationMethod) => {
  return input.split("\n\n").filter(validationMethod).length;
}

const isValidDay1 = passport => {
  const keys = passport.split(/\s/).map(el => el.split(":")[0]);
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(field => keys.includes(field));
}

const isValidDay2 = passport => {
  // First verify all required fields are present
  if (!isValidDay1(passport)) {
    return false;
  }

  const {
    byr,
    iyr,
    eyr,
    hgt,
    hcl,
    ecl,
    pid
  } = passport.split(/\s/).reduce((obj, el) => {
    const [key, val] = el.split(":");
    obj[key] = val;
    return obj;
  }, {});

  // Birth year (byr) -> 4 digit number from 1920-2002
  if (byr.length !== 4 || isNaN(byr) || +byr < 1920 || +byr > 2002) {
    return false;
  }

  // Issue year (iyr) -> 4 digit number from 2010-2020
  if (iyr.length !== 4 || isNaN(iyr) || +iyr < 2010 || +iyr > 2020) {
    return false;
  }

  // Expiration year (eyr) -> 4 digit number from 2020-2030
  if (eyr.length !== 4 || isNaN(eyr) || +eyr < 2020 || +eyr > 2030) {
    return false;
  }

  // Height (hgt) -> 150-193cm or 59-76in
  const [fullMatch, num, unit] = hgt.match(/(\d{2,3})(cm|in)/) || []
  if (fullMatch !== hgt) {
    return false
  }
  if (unit === 'cm') {
    if (+num < 150 || +num > 193) {
      return false;
    }
  } else if (unit === 'in') {
    if (+num < 59 || +num > 76) {
      return false;
    }
  } else {
    return false;
  }

  // Hair Color (hcl) -> valid hex code i.e. #abc123
  if (hcl.length !== 7 || !(/#[a-f0-9]{6}/.test(hcl))) {
    return false;
  }

  // Eye Color (ecl) -> one of: amb blu brn gry grn hzl oth
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) {
    return false;
  }
  // Passport ID (pid) -> 9 digit number, including leading zeros
  if (pid.length !== 9 || /[^0-9]/.test(pid)) {
    return false;
  }

  return true;
}