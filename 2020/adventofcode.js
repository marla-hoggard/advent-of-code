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
const numValidPasswords = (input, parser, validator) => {
  return input.split("\n").map(parser).filter(validator).length;
}

// Day 2 - Puzzle 1
// Format: `min-max letter: password`
const parsePassword1 = row => {
  const [min, max, letter, password] = row.split(/[-\s:]+/);
  return { min: +min, max: +max, letter, password }
}

// Valid if @letter occurs between @min and @max times in @password
const isValidPassword1 = ({ min, max, letter, password}) => {
  const found = numOccurrences(password, letter);
  return found >= min && found <= max;
}

// Day 2 - Puzzle 2
// Format: `index1-index2 letter: password`
// Indices provided are 1-based, so convert to 0-based
const parsePassword2 = row => {
  const [first, second, letter, password] = row.split(/[-\s:]+/);
  return { first: +first - 1, second: +second - 1, letter, password }
}

// Valid if @letter occurs at @index1 OR @index2 of @password but not both
const isValidPassword2 = ({ first, second, letter, password}) => {
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
// Returns the number of valid passports given
// @input -> A list of "passports" separated by blank lines,
//    whose values are space/line separated "key:value" pairs
// @validationMethod: (password: string) => boolean
const numValidPassports = (input, validationMethod) => {
  return input.split("\n\n").filter(validationMethod).length;
}

// Verifies that all required keys are present
const isValidPassport1 = passport => {
  const keys = passport.split(/\s/).map(el => el.split(":")[0]);
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(field => keys.includes(field));
}

// Verifies that all required keys are present and their values are valid
const isValidPassport2 = passport => {
  // First verify all required fields are present
  if (!isValidPassport1(passport)) {
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

// ---------- DAY 5 -------------
// Takes a string like "FBFBFBFRLR" and returns a seat ID
// Convert the first seven letters to binary where F = 0 and B = 1 to get the row
// Convert the last three letters to binary where L = 0 and R = 1 to get the column
// The seat ID is row * 8 + col
const calculateSeatID = seat => {
  const row = parseInt(seat.slice(0,7).split("").map(el => el === 'B' ? "1" : "0").join(""), 2);
  const col = parseInt(seat.slice(7).split("").map(el => el === 'R' ? "1" : "0").join(""), 2);
  return row * 8 + col;
}

// Day 5 - Puzzle 1
// Takes a list of seat strings and returns the seat with the highest ID
const highestSeatID = input => {
  return input.split("\n").reduce((max, seat) => {
    const ID = calculateSeatID(seat);
    return ID > max ? ID : max;
  }, 0);
}

// Day 5 - Puzzle 2
// Finds the missing seat ID out of a list of (unordered) consecutive seats
// The missing seat will be between two existing seats, off by +1 and -1
const missingSeatID = input => {
  const allSeats = input.split("\n")
    .map(calculateSeatID)
    .sort();
  for (let i = 1; i < allSeats.length - 1; i++) {
    if (allSeats[i] - 1 !== allSeats[i - 1]) {
      return allSeats[i] - 1;
    }
  }
  return 0;
}

// ---------- DAY 6 -----------------

// Day 6 - Puzzle 1
// Given a list of "answers" broken up into groups (separated by blank line),
// where each group consists strings of lower case letters (separated by line break),
// find the total number of unique letters in each group,
// and return the sum of the group totals
const numUniqueAnswers = input => {
  return input
    .split("\n\n")
    .map(el => new Set(el.replace(/\s/g, "").split("")).size)
    .reduce((total, cur) => total + cur, 0);
}

// Day 6 - Puzzle 2
// Rather than return how many letters appear anywhere in a given group,
// count how many letters appear in every line of a given group.
// Again, return the sum of the group totals
const numUnanimousAnswers = input => {
  return input
    .split("\n\n")
    .map(group => {
      // Create an array of the unique letters found in @group,
      // then iterate through to find which letters are in all lines of @group
      return Array.from(new Set(group.replace(/\s/g, "".split(""))))
        .filter(letter => group.split("\n").every(answer => answer.includes(letter)))
        .length;
    })
    .reduce((total, cur) => total + cur, 0);
}

// ------------ Day 7 --------------
// Returns the number of bag colors that could contain (directly or indirectly)
// a shiny gold bag
const shinyGoldParents = input => {
  // Create an array where each key is a bag color
  // and its value is an array of the bag colors that could be its direct parent
  const bags = {};
  input.split("\n").forEach(rule => {
    const pieces = rule.split(" bags contain ");
    const parent = pieces[0];
    const children = pieces[1].split(", ").map(el => el.replace(/\sbags?\.?/g, "").replace(/\d+\s/, ""));
    children.forEach(child => {
      if (child === "no other") return;
      if (bags.hasOwnProperty(child)) {
        if (!bags[child].includes(parent)) {
          bags[child].push(parent);
        }
      } else {
        bags[child] = [parent];
      }
    })
  });

  const parents = [...bags["shiny gold"]];
  let i = 0;
  while (i < parents.length) {
    const currentColor = parents[i];
    if (bags[currentColor]) {
      bags[currentColor].forEach(color => {
        if (!parents.includes(color)) {
          parents.push(color);
        }
      });
    }
    i++;
  }
  return parents.length;
}

// Day 7 - Puzzle 2
// Returns how many bags must be inside a shiny gold bag
const shinyGoldChildren = input => {
  const bags = {};
  input.split("\n").forEach(rule => {
    const pieces = rule.split(" bags contain ");
    const parent = pieces[0];
    if (pieces[1].includes("no other bags.")) {
      bags[parent] = null;
      return;
    }
    bags[parent] = pieces[1].split(", ").map(el => {
      const color = el.replace(/\sbags?\.?/g, "").replace(/\d+\s/, "");
      const number = parseInt(el);
      return { color, number };
    });
  });

  const insides = [...bags["shiny gold"]];
  let i = 0;
  while (i < insides.length) {
    const { color, number } = insides[i];
    if (bags[color]) {
      bags[color].forEach(child => {
        insides.push({
          color: child.color,
          number: child.number * number,
        });
      });
    }
    i++;
  }

  return insides.reduce((total, cur) => total + cur.number, 0);
}

// ------------ Day 8 --------------
// Day 8 - Puzzle 1
// Return the accumulator value right when a particular step
// is about to be run for the second time
const handheldInfiniteLoop = input => {
  const parsedInput = input.split("\n").map(data => {
    const [op, amt] = data.split(" ");
    return {
      op,
      amt: Number(amt),
      done: false,
    };
  });

  let accumulator = 0;
  let i = 0;
  while (true) {
    const step = parsedInput[i];
    if (step.done) {
      return accumulator;
    }
    if (step.op === "acc") {
      accumulator += step.amt;
      i++;
    } else if (step.op === "jmp") {
      i += step.amt;
    } else {
      // nop
      i++;
    }
    step.done = true;
  }
}

// Day 8 - Puzzle 2
// Change one instruction from nop to jmp or jmp to nop
// to resolve infinite loop
// Return the accumulator value when the program terminates
// Termination happens when attempting to run the step after the final instruction
handheldFixInfiniteLoop = input => {
  let parsedInput = input.split("\n").map(data => {
    const [op, amt] = data.split(" ");
    return {
      op,
      amt: Number(amt),
      done: false,
      fixAttempted: false,
    };
  });

  let accumulator = 0;
  let i = 0;
  let fixed = false;

  const resetValues = () => {
    parsedInput = parsedInput.map(el => ({ ...el, done: false }));
    accumulator = 0;
    i = 0;
    fixed = false;
  }

  while (i < parsedInput.length) {
    const step = parsedInput[i];
    if (step.done) {
      // Found an infinite loop, start over (but keep step.fixAttempted values)
      resetValues();
      continue;
    } else if (step.op === "acc") {
      accumulator += step.amt;
      i++;
    } else if (!fixed && !step.fixAttempted) {
      // If we've never tried to fix this step
      // and we haven't fixed another step on this run
      // try swapping 'nop' and 'jmp'
      fixed = true;
      step.fixAttempted = true;
      i += step.op === "nop" ? step.amt : 1;
    } else {
      i += step.op === "jmp" ? step.amt : 1;
    }
    step.done = true;
  }

  return accumulator;
}

// ------------- DAY 9 ------------
// Day 9 - Puzzle 1
// Return the value of the first element that is not valid
// Valid = the number is the sum of two unequal elements in the 25 elements preceding it
const firstNotValid = input => {
  const numbers = input.split("\n").map(el => +el);
  for (let i = 25; i < numbers.length; i++) {
    if (!hasPairSumTotal(numbers.slice(i - 25, i), numbers[i])) {
      return numbers[i];
    }
  }
  return "not found";
}

// Almost identical to Day 1 Puzzle 2 except
// 1. Only searches for two numbers
// 2. The two numbers must differ from each other
// 3. Returns true/false based on whether the pair is found
// params:
//  @array: array of numbers
//  @total: the total the numbers must sum to
const hasPairSumTotal = (array, total) => {
  for (let i = 0; i < array.length; i++) {
    const remainingValue = total - array[i];
    if (remainingValue !== array[i] && array.slice(i+1).includes(remainingValue)) {
      return true;
    }
  }
  return false;
}

// Day 9 - Puzzle 2
// Find a set of at least two contiguous elements that sum to firstNotValid(input)
// Return the sum of the smallest and largest elements in that set
const sumToInvalid = input => {
  const value = firstNotValid(input);
  const numbers = input.split("\n").map(el => +el);
  for (let len = 2; len < numbers.length; len++) {
    for (let start = 0; start < numbers.length - len; start++) {
      const set = numbers.slice(start, start + len);
      if (sum(set) === value) {
        console.log(set);
        return Math.min(...set) + Math.max(...set);
      }
    }
  }
  return "not found";
}

// ------- DAY 10 ----------
// Day 10 - Puzzle 1
const joltageDiff = input => {
  const adapters = input.split("\n").map(el => +el).sort((a,b) => a - b);
  const diffs = { 1: 0, 2: 0, 3: 1};
  for (let i = 0; i < adapters.length; i++) {
    if (i === 0) {
      diffs[adapters[i]]++;
    } else {
      diffs[adapters[i] - adapters[i-1]]++;
    }
  }
  return diffs[1] * diffs[3];
}

// Day 10 - Puzzle 2
const joltageChains = input => {
  return input.split("\n")
    .map(el => +el).sort((a,b) => a - b)
    .map((el, i, arr) => i === 0 ? el : el - arr[i-1])
    .concat(3)
    .join("")
    .split("3")
    .map(el => {
      switch(el.length) {
          case 0:
          case 1:
              return 1;
          case 2:
              return 2;
          case 3:
              return 4;
          case 4:
          default:
              return 7;
      }
    })
    .reduce((prod, next) => prod * next, 1);
}

// ------------ DAY 11 -----------
// Day 11 - Puzzle 1
// Calculate how the seat map changes based on the adjacent seats
// Return number of occupied seats (#) after map settles
const seatMap = input => {
  let seats = input.split("\n").map(row => row.split(""));
  let numChanged = 1;
  while (numChanged > 0) {
    numChanged = 0;
    seats = seats.map((row, whichRow) => {
      return row.map((seat, whichCol) => {
        if (seat === ".") {
          return ".";
        } else if (seat === "L") {
          if (whichRow > 0) {
            if (whichCol > 0 && seats[whichRow - 1][whichCol - 1] === "#") {
              return "L";
            }
            if (seats[whichRow - 1][whichCol] === "#") {
              return "L";
            }
            if (whichCol < row.length - 1 && seats[whichRow - 1][whichCol + 1] === "#") {
              return "L";
            }
          }
          if (whichCol > 0 && seats[whichRow][whichCol - 1] === "#") {
            return "L";
          }
          if (whichCol < row.length - 1 && seats[whichRow][whichCol + 1] === "#") {
            return "L";
          }
          if (whichRow < seats.length - 1) {
            if (whichCol > 0 && seats[whichRow + 1][whichCol - 1] === "#") {
              return "L";
            }
            if (seats[whichRow + 1][whichCol] === "#") {
              return "L";
            }
            if (whichCol < row.length - 1 && seats[whichRow + 1][whichCol + 1] === "#") {
              return "L";
            }
          }
          numChanged++;
          return "#";
        } else {
          let numOccuped = 0;
          if (whichRow > 0) {
            if (whichCol > 0 && seats[whichRow - 1][whichCol - 1] === "#") {
              numOccuped++;
            }
            if (seats[whichRow - 1][whichCol] === "#") {
              numOccuped++;
            }
            if (whichCol < row.length - 1 && seats[whichRow - 1][whichCol + 1] === "#") {
              numOccuped++;
            }
          }
          if (whichCol > 0 && seats[whichRow][whichCol - 1] === "#") {
            numOccuped++;
          }
          if (whichCol < row.length - 1 && seats[whichRow][whichCol + 1] === "#") {
            numOccuped++;
          }
          if (whichRow < seats.length - 1) {
            if (whichCol > 0 && seats[whichRow + 1][whichCol - 1] === "#") {
              numOccuped++;
            }
            if (seats[whichRow + 1][whichCol] === "#") {
              numOccuped++;
            }
            if (whichCol < row.length - 1 && seats[whichRow + 1][whichCol + 1] === "#") {
              numOccuped++;
            }
          }
          if (numOccuped >= 4) {
            numChanged++;
            return "L";
          } else {
            return "#";
          }
        }
      })
    })
  }
  return sum(seats.map(row => numOccurrences(row, "#")));
}

// Day 11 - Puzzle 2
// Calculate how the seat map changes based on the nearest visible seats
// Return number of occupied seats (#) after map settles
const seatMap2 = input => {
  let seats = input.split("\n").map(row => row.split(""));
  let numChanged = 1;
  while (numChanged > 0) {
    numChanged = 0;
    seats = seats.map((row, whichRow) => {
      return row.map((seat, whichCol) => {
        if (seat === ".") {
          return ".";
        } else if (seat === "L") {
          // Up Left
          let r = whichRow - 1;
          let c = whichCol - 1;
          while (r >= 0 && c >= 0 && seats[r][c] === ".") {
            r--;
            c--;
          }
          if (r >= 0 && c >= 0 && seats[r][c] === "#") return "L";

          // Straight up
          r = whichRow - 1;
          c = whichCol;
          while (r >= 0 && seats[r][c] === ".") {
            r--;
          }
          if (r >= 0 && seats[r][c] === "#") return "L";

          // Up right
          r = whichRow - 1;
          c = whichCol + 1;
          while (r >= 0 && c < row.length && seats[r][c] === ".") {
            r--;
            c++;
          }
          if (r >= 0 && c < row.length && seats[r][c] === "#") return "L";

          // Left
          r = whichRow;
          c = whichCol - 1;
          while (c >= 0 && seats[r][c] === ".") {
            c--;
          }
          if (c >= 0 && seats[r][c] === "#") return "L";

          // Right
          r = whichRow;
          c = whichCol + 1;
          while (c < row.length && seats[r][c] === ".") {
            c++;
          }
          if (c < row.length && seats[r][c] === "#") return "L";

          // Down Left
          r = whichRow + 1;
          c = whichCol - 1;
          while (r < seats.length && c >= 0 && seats[r][c] === ".") {
            r++;
            c--;
          }
          if (r < seats.length && c >= 0 && seats[r][c] === "#") return "L";

          // Straight down
          r = whichRow + 1;
          c = whichCol;
          while (r < seats.length && seats[r][c] === ".") {
            r++;
          }
          if (r < seats.length && seats[r][c] === "#") return "L";

          // Down right
          r = whichRow + 1;
          c = whichCol + 1;
          while (r < seats.length && c < row.length && seats[r][c] === ".") {
            r++;
            c++;
          }
          if (r < seats.length && c < row.length && seats[r][c] === "#") return "L";

          numChanged++;
          return "#";
        } else {
          let numOccupied = 0;

          // Up Left
          r = whichRow - 1;
          c = whichCol - 1;
          while (r >= 0 && c >= 0 && seats[r][c] === ".") {
            r--;
            c--;
          }
          if (r >= 0 && c >= 0 && seats[r][c] === "#") numOccupied++;

          // Straight up
          r = whichRow - 1;
          c = whichCol;
          while (r >= 0 && seats[r][c] === ".") {
            r--;
          }
          if (r >= 0 && seats[r][c] === "#") numOccupied++;

          // Up right
          r = whichRow - 1;
          c = whichCol + 1;
          while (r >= 0 && c < row.length && seats[r][c] === ".") {
            r--;
            c++;
          }
          if (r >= 0 && c < row.length && seats[r][c] === "#") numOccupied++;

          // Left
          r = whichRow;
          c = whichCol - 1;
          while (c >= 0 && seats[r][c] === ".") {
            c--;
          }
          if (c >= 0 && seats[r][c] === "#") numOccupied++;

          // Right
          r = whichRow;
          c = whichCol + 1;
          while (c < row.length && seats[r][c] === ".") {
            c++;
          }
          if (c < row.length && seats[r][c] === "#") numOccupied++;

          // Down Left
          r = whichRow + 1;
          c = whichCol - 1;
          while (r < seats.length && c >= 0 && seats[r][c] === ".") {
            r++;
            c--;
          }
          if (r < seats.length && c >= 0 && seats[r][c] === "#") numOccupied++;

          // Straight down
          r = whichRow + 1;
          c = whichCol;
          while (r < seats.length && seats[r][c] === ".") {
            r++;
          }
          if (r < seats.length && seats[r][c] === "#") numOccupied++;

          // Down right
          r = whichRow + 1;
          c = whichCol + 1;
          while (r < seats.length && c < row.length && seats[r][c] === ".") {
            r++;
            c++;
          }
          if (r < seats.length && c < row.length && seats[r][c] === "#") numOccupied++;

          if (numOccupied >= 5) {
            numChanged++;
            return "L";
          } else {
            return "#";
          }
        }
      })
    })
  }
  return sum(seats.map(row => numOccurrences(row, "#")));
}

// ---------- DAY 12 -----------
// Day 12 - Puzzle 1
const shipDirections = input => {
  const instructions = input.split("\n").map(el => ({
    dir: el[0],
    amt: Number(el.slice(1)),
  }));

  let facing = 1; // ['N', 'E', 'S', 'W'];
  let horiz = 0;
  let vert = 0;

  instructions.forEach(({ dir, amt }) => {
    if (dir === 'N' || (dir === 'F' && facing === 0)) {
      vert += amt;
    } else if (dir === 'S' || (dir === 'F' && facing === 2)) {
      vert -= amt;
    } else if (dir === 'E' || (dir === 'F' && facing === 1)) {
      horiz += amt;
    } else if (dir === 'W' || (dir === 'F' && facing === 3)) {
      horiz -= amt;
    } else if (dir === 'L') {
      // Add 4 first since negative mod doesn't work the way we want
      facing = (facing + 4 - (amt / 90)) % 4;
    } else if (dir === 'R') {
      facing = (facing + (amt / 90)) % 4;
    }
  });
  console.log({ horiz, vert });
  return Math.abs(horiz) + Math.abs(vert);
}

// Day 12 - Puzzle 2
const waypointDirections = input => {
  let ship = {
    horiz: 0,
    vert: 0,
  }

  let waypoint = {
    horiz: 10,
    vert: 1,
  }

  input.split("\n").forEach(instr => {
    const dir = instr[0];
    const amt = Number(instr.slice(1));
    if (dir === 'N') {
      waypoint.vert += amt;
    } else if (dir === 'S') {
      waypoint.vert -= amt;
    } else if (dir === 'E') {
      waypoint.horiz += amt;
    } else if (dir === 'W') {
      waypoint.horiz -= amt;
    } else if (dir === 'F') {
      ship.horiz += waypoint.horiz * amt;
      ship.vert += waypoint.vert * amt;
    } else if (amt === 180) {
      waypoint = {
        horiz: -waypoint.horiz,
        vert: -waypoint.vert,
      }
    } else if (instr === 'R90' || instr === 'L270') {
      waypoint = {
        horiz: waypoint.vert,
        vert: -waypoint.horiz,
      }
    } else if (instr === 'L90' || instr === 'R270') {
      waypoint = {
        horiz: -waypoint.vert,
        vert: waypoint.horiz,
      }
    } else {
      console.log("unexpected instruction", instr);
    }
  });
  console.log({ ship, waypoint });
  return Math.abs(ship.horiz) + Math.abs(ship.vert);
}

// --------- DAY 13 ------------
const earliestBus = input => {
  const [time, buses] = input.split("\n");
  const waitTimes = buses
    .split(",")
    .filter(el => el !== 'x')
    .map(id => ({
      id: Number(id),
      wait: id - (time % id),
    }));
  const minWait = Math.min(...waitTimes.map(el => el.wait));
  const bestBus = waitTimes.find(bus => bus.wait === minWait);
  return bestBus.id * bestBus.wait;
}

const busesInARow = input => {
  const buses = input.split("\n")[1]
    .split(",")
    .map((el, i) => ({
      offset: i % el,
      id: Number(el),
    }))
    .filter(el => !isNaN(el.id));

  console.log({ buses });

  let i = 1;
  let t = buses[0].id;
  let product = t;
  while (i < buses.length) {
    const { offset, id } = buses[i];
    const offBy = id - (t % id);
    if (offBy === (offset)) {
      console.log({ t, id, offset, product })
      product *= buses[i].id;
      i++;
    } else {
      t += product;
    }
  }
  return t;
}

// --------- DAY 14 ---------
// Day 14 - Puzzle 1
const bitMask = input => {
  let memory = {};
  let mask = "X".repeat(36);
  input.split("\n").forEach(command => {
    const [type, value] = command.split(" = ");
    if (type === "mask") {
      mask = value;
    } else {
      const location = Number(type.slice(4, -1));
      const bitValue = Number(value).toString(2).padStart(36, "0");
      const maskedValue = masked(bitValue, mask);
      memory[location] = parseInt(maskedValue, 2);
    }
  });
  return sum(Object.values(memory));
}

// For each 0 or 1 in @mask, overwrites the corresponding digit in @value with that value
const masked = (value, mask) => {
  return value.split("")
    .map((digit, i) => mask[i] === 'X' ? digit : mask[i])
    .join("");
}

const bitMask2 = input => {
let memory = {};
  let mask = "0".repeat(36);
  input.split("\n").forEach(command => {
    const [type, value] = command.split(" = ");
    if (type === "mask") {
      mask = value;
    } else {
      const location = Number(type.slice(4, -1));
      const bitLocation = location.toString(2).padStart(36, "0");
      const maskedLocations = masked2(bitLocation, mask);
      maskedLocations.forEach(loc => memory[loc] = Number(value));
    }
  });
  return sum(Object.values(memory));
}

// For each char in @mask:
// 0 - @value is unchanged
// 1 - @value is overwritten with 1
// X - Duplicate all values to include that digit as a 0 and as a 1
// Returns an array of all masked values
const masked2 = (value, mask) => {
  let values = [""];
  mask.split("").forEach((char, i) => {
    if (char === "0") {
      values = values.map(el => el + value[i]);
    } else if (char === "1") {
      values = values.map(el => el + "1");
    } else {
      values = values.map(el => el + "0").concat(values.map(el => el + "1"));
    }
  });
  return values.map(val => parseInt(val, 2));
}

// ---------- DAY 15 -----------
const numberGame = (input, numTurns) => {
  const turns = {};
  let last;
  const addValue = (val, index) => {
    if (turns[val]) {
      turns[val].unshift(index);
      turns[val] = turns[val].slice(0,2);
    } else {
      turns[val] = [index];
    }
    last = val;
  }

  input.split(",").forEach((starter, i) => addValue(starter, i));
  for (let i = input.split(",").length; i < numTurns; i++) {
    if (i % 1000000 === 0) {
      console.log(i);
    }
    if (turns[last].length === 1) {
      addValue(0, i);
    } else {
      addValue(turns[last][0] - turns[last][1], i);
    }
  }
  return last;
}

// ---------- DAY 16 ------------
// Day 16 - Puzzle 1
const invalidTicketNumbers = input => {
  const [fields, myTicket, otherTickets] = input.split("\n\n");
  const validNumbers = new Set();
  let invalidNumbers = 0;
  fields.split("\n").forEach(field => {
    const match = field.match(/[a-z\s]+: (\d+-\d+) or (\d+-\d+)/i);
    if (match && match.length === 3) {
      const [full, range1, range2] = match;
      const [start1, end1] = range1.split("-").map(el => +el);
      for (let i = start1; i <= end1; i++) {
        validNumbers.add(i);
      }
      const [start2, end2] = range2.split("-").map(el => +el);
      for (let i = start2; i <= end2; i++) {
        validNumbers.add(i);
      }
    }
  });

  otherTickets.split("\n").slice(1).forEach(ticket => {
    const numbers = ticket.split(",");
    for (let i = 0; i < numbers.length; i++) {
      const number = +numbers[i];
      if (!validNumbers.has(number)) {
        invalidNumbers += number;
        break;
      }
    }
  });

  return invalidNumbers;
}

// Day 16 - Puzzle 2
const decodeTickets = input => {
  const [fields, myTicket, otherTickets] = input.split("\n\n");
  const validNumbers = new Set();
  const rules = {};

  // Parse the fields into rules, each of which has key: field name, value: set of valid numbers
  // Additionally, create the overall set of valid numbers
  fields.split("\n").forEach(row => {
    const match = row.match(/([a-z\s]+): (\d+-\d+) or (\d+-\d+)/i);
    if (match && match.length === 4) {
      const [full, field, range1, range2] = match;
      rules[field] = new Set();
      const [start1, end1] = range1.split("-").map(el => +el);
      for (let i = start1; i <= end1; i++) {
        validNumbers.add(i);
        rules[field].add(i);
      }
      const [start2, end2] = range2.split("-").map(el => +el);
      for (let i = start2; i <= end2; i++) {
        validNumbers.add(i);
        rules[field].add(i);
      }
    }
  });

  // Throw out all the invalid tickets
  let mine = myTicket.split("\n")[1];
  const validTickets = otherTickets.split("\n").slice(1).filter(ticket => {
    const numbers = ticket.split(",");
    return numbers.every(n => validNumbers.has(+n));
  }).concat(mine);

  // Iterate through each index and create a list of all possible fields for each index
  let possibleMapping = [];
  mine.split(",").forEach((number, i) => {
    Object.entries(rules).forEach(([rule, range]) => {
      if (validTickets.map(t => t.split(",")[i]).every(n => range.has(+n))) {
        if (possibleMapping[i]) {
          possibleMapping[i].push(rule);
        } else {
          possibleMapping[i] = [rule];
        }
      }
    })
  });

  // Iterate through the possible mapping, finding the index who only has one possible rule
  // Set that rule in finalMap, then remove that rule from all other indices
  // After each round, another index should be down to one possibility
  const finalMap = {};
  let index = possibleMapping.findIndex(el => el.length === 1);
  while (index !== -1) {
    const rule = possibleMapping[index][0];
    finalMap[rule] = index;
    possibleMapping = [...possibleMapping.map(el => el.filter(r => r !== rule))]
    index = possibleMapping.findIndex(el => el.length === 1);
  }

  // Now that all the fields are determined, find the fields whose name starts with "departure"
  // Return the product of the corresponding numbers in my ticket
  let product = 1;
  Object.entries(finalMap)
    .filter(([rule, i]) => rule.startsWith("departure"))
    .forEach(([rule, i]) => {
      value = +mine.split(",")[i];
      product *= value;
    });
  return product;
}

// ---------- DAY 17 ------------
// Day 17 - Puzzle 1
const conwayCubes = (input, cycles) => {
  let plane = [input.split("\n").map(row => row.split(""))];
  for (let i = 0; i < cycles; i++) {
    let newPlane = [];
    const depth = plane.length;
    const height = plane[0].length;
    const width = plane[0][0].length;
    for (let z = 0; z < depth + 2; z++) {
      for (let y = 0; y < height + 2; y++) {
        for (let x = 0; x < width + 2; x++) {
          safeSetValue(newPlane, x, y, z, cyclePoint(plane, x - 1, y - 1, z - 1));
        }
      }
    }
    plane = newPlane;
  }
  return numOccurrences(plane, '#');
}
// Returns array[z][y][x] if it exists
// Otherwise returns fallback
const safeGetValue = (array, x, y, z, fallback = '.') => {
  if (array[z] != undefined && array[z][y] != undefined && array[z][y][x] != undefined) {
    return array[z][y][x];
  } else {
    return fallback;
  }
}
const safeSetValue = (array, x, y, z, value = '.') => {
  if (!array[z]) {
    array[z] = []
  }
  if (!array[z][y]) {
    array[z][y] = [];
  }
  array[z][y][x] = value;
}

// Checks the 26 points adjacent to (x,y,z)
// and returns whether (x,y,z) should be '.' or '#'
const cyclePoint = (array, x, y, z) => {
  let active = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        const val = safeGetValue(array, i, j, k);
        if (val === '#') {
          active++;
        } else {
          // Set the value to expand the area
          // (may or may not already be '.')
          safeSetValue(array, i, j, k, '.');
        }
      }
    }
  }

  if (safeGetValue(array, x, y, z) === '#') {
    // Rule is 2 or 3 but the count above includes (x,y,z) so check 3 or 4
    return active === 3 || active === 4 ? '#' : '.';
  }
  else if (active === 3) {
    return '#';
  }
  return '.';
}

// Day 17 - Puzzle 2
const conwayHypercubes = (input, cycles) => {
  let plane = [[input.split("\n").map(row => row.split(""))]];
  for (let i = 0; i < cycles; i++) {
    let newPlane = [];
    const hyperdepth = plane.length;
    const depth = plane[0].length;
    const height = plane[0][0].length;
    const width = plane[0][0][0].length;
    for (let w = 0; w < hyperdepth + 2; w++) {
      for (let z = 0; z < depth + 2; z++) {
        for (let y = 0; y < height + 2; y++) {
          for (let x = 0; x < width + 2; x++) {
            safeSetValue2(newPlane, x, y, z, w, cyclePoint2(plane, x - 1, y - 1, z - 1, w - 1));
          }
        }
      }
    }

    console.log(newPlane)

    // Remove empty cubes from the front
    while (numOccurrences(newPlane[0], '#') === 0) {
      console.log("empty first cube")
      newPlane = newPlane.slice(1);
    }

     // Remove empty cubes from the end
    while (numOccurrences(newPlane[newPlane.length - 1], '#') === 0) {
      console.log("empty last cube")
      newPlane = newPlane.slice(0, -1);
    }

    // Remove top level(s) if empty on every cube
    while (newPlane.every(cube => numOccurrences(cube[0], '#') === 0)) {
      console.log("empty first level")
      newPlane = newPlane.map(cube => cube.slice(1));
    }

    // Remove bottom level(s) if empty on every cube
    while (newPlane.every(cube => numOccurrences(cube[cube.length - 1], '#') === 0)) {
      console.log("empty last level")
      newPlane = newPlane.map(cube => cube.slice(0, -1));
    }

    // Remove first row(s) if empty on every level
    while (newPlane.every(cube => numOccurrences(cube.map(level => level[0]), '#') === 0)) {
      console.log("empty first row")
      newPlane = newPlane.map(level => level.map(row => row.slice(1)));
    }

    // Remove last row(s) if empty on every level
    while (newPlane.every(cube => numOccurrences(cube.map(level => level[level.length - 1]), '#') === 0)) {
      console.log("empty last row")
      newPlane = newPlane.map(cube => cube.map(level => level.slice(0, -1)));
    }

    console.log(newPlane)

    // // Remove first columns(s) if empty on every level
    // while (newPlane.every(level => numOccurrences(level.map(row => row[0]), '#') === 0)) {
    //   console.log("empty first column")
    //   newPlane = newPlane.map(level => level.map(row => row.slice(1)));
    // }

    // // Remove last columns(s) if empty on every level
    // while (newPlane.every(level => numOccurrences(level.map(row => row[row.length - 1]), '#') === 0)) {
    //   console.log("empty last column")
    //   newPlane = newPlane.map(level => level.map(row => row.slice(0, -1)));
    // }


    plane = newPlane;
  }
  return numOccurrences(plane, '#');
}

// Returns array[z][y][x] if it exists
// Otherwise returns fallback
const safeGetValue2 = (array, x, y, z, w, fallback = '.') => {
  if (array[w] != undefined && array[w][z] != undefined && array[w][z][y] != undefined && array[w][z][y][x] != undefined) {
    return array[w][z][y][x];
  } else {
    return fallback;
  }
}

const safeSetValue2 = (array, x, y, z, w, value = '.') => {
  if (!array[w]) {
    array[w] = []
  }
  if (!array[w][z]) {
    array[w][z] = []
  }
  if (!array[w][z][y]) {
    array[w][z][y] = [];
  }
  array[w][z][y][x] = value;
}

// Checks the 81 points adjacent to (x,y,z,w)
// and returns whether (x,y,z,w) should be '.' or '#'
const cyclePoint2 = (array, x, y, z, w) => {
  let active = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let m = w - 1; m <= w + 1; m++) {
          const val = safeGetValue2(array, i, j, k, m);
          if (val === '#') {
            active++;
          } else {
            // Set the value to expand the area
            // (may or may not already be '.')
            safeSetValue2(array, i, j, k, m, '.');
          }
        }
      }
    }
  }

  if (safeGetValue2(array, x, y, z, w) === '#') {
    // Rule is 2 or 3 but the count above includes (x,y,z,w) so check 3 or 4
    return active === 3 || active === 4 ? '#' : '.';
  }
  else if (active === 3) {
    return '#';
  }
  return '.';
}

// -------- DAY 18 ----------
const newMath = (input, evaluationMethod) => {
  return input.split("\n").reduce((total, exp) => total + evaluationMethod(exp), 0);
}

// Evaluates the section @toEval and replaces it in the @full expression with its result
// If the section was in parentheses, removes the parens when replacing
const evalAndReplace = (full, toEval, evaluationMethod) => {
  const outcome = toEval.startsWith("(") && toEval.endsWith(")")
    ? evaluationMethod(toEval.slice(1, -1))
    : evaluationMethod(toEval)
  return full.replace(toEval, outcome);
}

// Evaluates the expression @exp according to the "new math part 1" rules
// + and * are equal in order of operations, so evaluation left to right
// Parentheses still function as normal, taking precedence
const evaluate1 = exp => {
  let parens = exp.match(/\([^\(\)]+\)/);
  while (parens) {
    exp = evalAndReplace(exp, parens[0], evaluate1);
    parens = exp.match(/\([^\(\)]+\)/);
  }

  let total = 0;
  let isSum = true;

  exp.split(" ").forEach(char => {
    if (char === "+") {
      isSum = true;
    } else if (char === "*") {
      isSum = false;
    } else if (isSum) {
      total += +char;
    } else {
      total *= +char;
    }
  });

  return total;
}

// Evaluates the expression @exp according to the "new math part 2" rules
// + and * are swapped from normal order of operations, so + comes before *
// Parentheses still function as normal, taking precedence
const evaluate2 = exp => {
  let parens = exp.match(/\([^\(\)]+\)/);
  while (parens) {
    exp = evalAndReplace(exp, parens[0], evaluate2);
    parens = exp.match(/\([^\(\)]+\)/);
  }

  let addition = exp.match(/(?:\d+\s\+\s)+\d+/);
  while (addition) {
    // Since matches are all addition, can be evaulated with native eval function
    exp = evalAndReplace(exp, addition[0], eval)
    addition = exp.match(/(?:\d+\s\+\s)+\d+/);
  }

  // At this point, exp should only have * operations left
  // so it can be evaluated normally with the native eval function
  return eval(exp);
}

// ---------- DAY 19 -----------
// Day 19 - Puzzle 1
const numValidMessages1 = input => {
  const [rules, messages] = input.split("\n\n");
  const validOptions = parseRules1(rules);
  return messages
    .split("\n")
    .reduce((numValid, message) => isValidMessage1(validOptions["8"], validOptions["11"], message) ? numValid + 1 : numValid, 0);
}

// Checks if @message is 8 11
// 8 is an array of 8-letter strings
// 11 is an array of 16-letter strings
const isValidMessage1 = (firstOptions, secondOptions, message) => {
  return firstOptions.includes(message.slice(0, 8)) && secondOptions.includes(message.slice(8));
}

// Evaluates the provided rules and
// returns an array of valid message options
const parseRules1 = rules => {
  let strings = {};
  let subRules = {};
  rules.split("\n").forEach(rule => {
    const [index, content] = rule.split(": ");
    if (content.match(/"[a-z]+"/)) {
      strings[index] = [content.slice(1, -1)];
    } else {
      subRules[index] = content;
    }
  });
  while (true) {
    const [key, rule] = Object.entries(subRules)
      .find(([key, val]) => val.split(" ").every(el => el === "|" || Object.keys(strings).includes(el)));

    // We run out of memory on this step, so instead of putting it all in one array,
    // We have to return 8 and 11 separately
    if (key === "0") {
      return { 8: strings["8"], 11: strings["11"] };
    }
    // If all sub rules of the rule have already been converted to strings
    // then this rule is ready to be converted to strings
    let substrings = [];
    rule.split(" | ").forEach(branch => {
      let branchStrings = [];
      branch.split(" ").map(num => strings[num]).forEach(chars => {
        if (!branchStrings.length) {
          branchStrings = [...chars];
        } else if (chars.length === 1) {
          branchStrings = branchStrings.map(el => el + chars[0]);
        } else {
          let expandedStrings = [];
          for (let char of chars) {
            expandedStrings = expandedStrings.concat(branchStrings.map(el => el + char));
          }
          branchStrings = expandedStrings;
        }
      });
      substrings = substrings.concat(branchStrings);
    });
    strings[key] = substrings;
    delete subRules[key];
  }
}

// Day 19 - Puzzle 2
// For this puzzle, 8 and 11 have been changed to:
// 8: 42 | 42 8
// 11: 42 31 | 42 11 31
//
// 0: 8 11
// So with the changes, rule 0 is now: 42+ (42 31)+ meaning, any number of 42s then any number of 31s
// as long as there is at least one 31 and more 42s than 31s
// 42 and 31 each turn out to be an array of 128 8-char strings
const numValidMessages2 = input => {
  const [rules, messages] = input.split("\n\n");
  const validOptions = parseRules2(rules);
  console.log(messages.split("\n").length);
  return messages
    .split("\n")
    .reduce((numValid, message) => isValidMessage2(validOptions["42"], validOptions["31"], message) ? numValid + 1 : numValid, 0);
}

const isValidMessage2 = (firstOptions, secondOptions, message) => {
  if (message.length % 8 !== 0) {
    return false;
  }
  const substrings = message.match(/[a-z]{8}/g);
  let isFirst = true;
  let first = 0;
  let second = 0;
  let i = 0;
  while (i < substrings.length) {
    if (isFirst) {
      if (firstOptions.includes(substrings[i])) {
        i++;
        first++;
      } else if (secondOptions.includes(substrings[i])) {
        isFirst = false;
        i++;
        second++;
      } else {
        return false;
      }
    } else if (secondOptions.includes(substrings[i])) {
      i++;
      second++;
    } else {
      return false;
    }
  }
  if (second > 0 && first > second) {
    return true;
  }
  return false;
}

// Evaluates the provided rules and
// returns an array of valid message options
const parseRules2 = rules => {
  let strings = {};
  let subRules = {};
  rules.split("\n").forEach(rule => {
    const [index, content] = rule.split(": ");
    if (content.match(/"[a-z]+"/)) {
      strings[index] = [content.slice(1, -1)];
    } else {
      subRules[index] = content;
    }
  });
  while (true) {
    const [key, rule] = Object.entries(subRules)
      .find(([key, val]) => val.split(" ").every(el => el === "|" || Object.keys(strings).includes(el)));

    // When we get to the end, now we just need to return 31 and 42
    if (key === "0") {
      return { 31: strings["31"], 42: strings["42"] };
    }
    // If all sub rules of the rule have already been converted to strings
    // then this rule is ready to be converted to strings
    let substrings = [];
    rule.split(" | ").forEach(branch => {
      let branchStrings = [];
      branch.split(" ").map(num => strings[num]).forEach(chars => {
        if (!branchStrings.length) {
          branchStrings = [...chars];
        } else if (chars.length === 1) {
          branchStrings = branchStrings.map(el => el + chars[0]);
        } else {
          let expandedStrings = []
          chars.forEach(char => {
            expandedStrings = expandedStrings.concat(branchStrings.map(el => el + char));
          });
          branchStrings = [...expandedStrings];
        }
      });
      substrings = substrings.concat(branchStrings);
    });
    strings[key] = substrings;
    delete subRules[key];
  }
}