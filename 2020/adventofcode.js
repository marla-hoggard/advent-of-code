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