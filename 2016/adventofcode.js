// 2016 Advent of Code

// Day 1 - Puzzle 1
// Takes a list of directions R2, L5 ...
// Returns number of blocks from the starting point
function pathDistance(directions) {
  let NS = 0,
    WE = 0,
    facing = 0;
  directions.split(', ').forEach((dir) => {
    facing = dir[0] === 'L' ? facing - 1 : facing + 1;
    if (facing === -1) facing = 3;
    else if (facing === 4) facing = 0;
    amount = Number(dir.slice(1));
    switch (facing) {
      case 0:
        NS += amount;
        break;
      case 1:
        WE += amount;
        break;
      case 2:
        NS -= amount;
        break;
      case 3:
        WE -= amount;
        break;
      default:
        return 'something went wrong';
    }
  });
  return Math.abs(NS) + Math.abs(WE);
}

// Day 1 - Puzzle 2
// Takes a list of directions
// Returns the distance of the first place visited twice
function pathRepeat(directions) {
  const dir = directions.split(', ');
  let NS = 0,
    WE = 0,
    facing = 0;
  let visited = [];
  for (var i = 0; i < dir.length; i++) {
    facing = dir[i][0] === 'L' ? facing - 1 : facing + 1;
    if (facing === -1) facing = 3;
    else if (facing === 4) facing = 0;
    amount = Number(dir[i].slice(1));
    switch (facing) {
      case 0:
        for (var j = 0; j < amount; j++) {
          NS++;
          const next = `${NS},${WE}`;
          if (visited.includes(next)) {
            console.log(visited);
            console.log(next);
            return Math.abs(NS) + Math.abs(WE);
          } else visited.push(next);
        }
        break;
      case 1:
        for (var j = 0; j < amount; j++) {
          WE++;
          const next = `${NS},${WE}`;
          if (visited.includes(next)) {
            console.log(visited);
            console.log(next);
            return Math.abs(NS) + Math.abs(WE);
          } else visited.push(next);
        }
        break;
      case 2:
        for (var j = 0; j < amount; j++) {
          NS--;
          const next = `${NS},${WE}`;
          if (visited.includes(next)) {
            console.log(visited);
            console.log(next);
            return Math.abs(NS) + Math.abs(WE);
          } else visited.push(next);
        }
        break;
      case 3:
        for (var j = 0; j < amount; j++) {
          WE--;
          const next = `${NS},${WE}`;
          if (visited.includes(next)) {
            console.log(visited);
            console.log(next);
            return Math.abs(NS) + Math.abs(WE);
          } else visited.push(next);
        }
        break;
      default:
        return 'something went wrong';
    }
  }
  console.log(visited);
  return 'no repeats';
}

// Day 2 - Puzzle 1
// Takes a list of direction strings
// Returns the door code
function bathroomCode(directions) {
  const keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let x = 1,
    y = 1;
  let code = '';

  directions.split('\n').forEach((line) => {
    line.split('').forEach((dir) => {
      switch (dir) {
        case 'U':
          if (y !== 0) {
            y--;
          }
          break;
        case 'D':
          if (y !== 2) {
            y++;
          }
          break;
        case 'L':
          if (x !== 0) {
            x--;
          }
          break;
        case 'R':
          if (x !== 2) {
            x++;
          }
          break;
        default:
          return 'bad direction';
      }
    });
    code += keypad[y][x];
  });
  return code;
}

// Day 2 - Puzzle 2
// Takes an array of direction strings
// Returns the door code of a weirder keypad
function bathroomCodeWeird(directions) {
  const keypad = [
    [null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, 'A', 'B', 'C', null],
    [null, null, 'D', null, null],
  ];
  let y = 2,
    x = 0;
  let code = '';

  directions.split('\n').forEach((line) => {
    line.split('').forEach((dir) => {
      switch (dir) {
        case 'U':
          if (y !== 0 && keypad[y - 1][x]) {
            y--;
          }
          break;
        case 'D':
          if (y !== 4 && keypad[y + 1][x]) {
            y++;
          }
          break;
        case 'L':
          if (x !== 0 && keypad[y][x - 1]) {
            x--;
          }
          break;
        case 'R':
          if (x !== 4 && keypad[y][x + 1]) {
            x++;
          }
          break;
        default:
          return 'bad direction';
      }
    });
    code += keypad[y][x];
  });
  return code;
}

// Day 3 - Puzzle 1
// Converts the input into a 2D array of triples
// Returns the number of triples that could be valid triangle sides
function checkTriangleList(input) {
  const list = input.split('\n').map((row) =>
    row
      .trim()
      .split(/\s+/)
      .map((el) => +el),
  );
  return list.filter(([a, b, c]) => isTriangle(a, b, c)).length;
}

// params: integers a, b, c
// return: boolean
// Returns whether a, b and c can be sides of a valid triangle
function isTriangle(a, b, c) {
  return a + b > c && b + c > a && c + a > b;
}

// Day 3 - Puzzle 2
// Takes 2D array of three columns
// Returns a 2D array of triples reading down by threes
// Run checkTriangleList(transposeTriangleList(list)) to find answer
function transposeTriangleList(list) {
  newList = [];
  for (var i = 0; i < list.length; i += 3) {
    newList.push([list[i][0], list[i + 1][0], list[i + 2][0]]);
    newList.push([list[i][1], list[i + 1][1], list[i + 2][1]]);
    newList.push([list[i][2], list[i + 1][2], list[i + 2][2]]);
  }
  return newList;
}

function checkTriangleListColumns(input) {
  const origList = input.split('\n').map((row) =>
    row
      .trim()
      .split(/\s+/)
      .map((el) => +el),
  );
  const newList = [];
  let i = 0;
  col = 0;
  while (col < 3) {
    const tri = [];
    for (let t = 0; t < 3; t++) {
      tri.push(origList[i][col]);
      i++;
      if (i === origList.length) {
        i = 0;
        col++;
      }
    }
    newList.push(tri);
  }
  return newList.filter(([a, b, c]) => isTriangle(a, b, c)).length;
}

// Day 4 - Puzzle 1
// Takes an array of room strings
// Returns the sum of the ids of the real rooms
function sumRealIds(input) {
  let sum = 0;
  input.split('\n').forEach((room) => {
    const { name, id, checksum } = parseRoom(room);
    if (getRoomCheckSum(name) === checksum) {
      sum += id;
    }
  });
  return sum;
}

// Takes a room string and returns an object of the form
// { name: string, id: number, checksum: string }
function parseRoom(string) {
  const [full, name, id, checksum] = string.match(/([\w-]+)-(\d+)\[(\w{5})\]/);
  return {
    name: name.replace(/-/g, ''),
    id: Number(id),
    checksum,
  };
}

// Takes a string, returns a string containing the
// five most common letters, ordered by occurences then alpha
function getRoomCheckSum(string) {
  const letters = string.split('');
  const letterSet = new Set(letters);

  let countsObj = {};
  letterSet.forEach((l) => (countsObj[l] = 0));
  letters.forEach((l) => countsObj[l]++);

  let countsArray = [];
  for (var l in countsObj) {
    countsArray.push([l, countsObj[l]]);
  }

  countsArray.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    } else return a[0] < b[0] ? -1 : 1;
  });

  return countsArray
    .map((arr) => arr[0])
    .slice(0, 5)
    .join('');
}

// Day 4 - Puzzle 2
// Takes an array of room strings
// Logs the name and returns the id of the room whose decrypted name includes northpole
function findNorthPole(input) {
  const data = input.split('\n');
  const northpole = data.find((room) => {
    const { name, id, checksum } = parseRoom(room);
    return getRoomCheckSum(name) === checksum && shift(name, id).includes('northpole');
  });
  if (northpole) console.log(shift(parseRoom(northpole).name, parseRoom(northpole).id));
  return northpole ? parseRoom(northpole).id : 'not found';
}

// Shifts the string by val % 26 using caesar shift
function shift(string, val) {
  return string
    .split('')
    .map((letter) => {
      const shifted = letter.charCodeAt(0) + (val % 26);
      return shifted <= 'z'.charCodeAt(0)
        ? String.fromCharCode(shifted)
        : String.fromCharCode(shifted - 26);
    })
    .join('');
}

// Day 5 - Puzzle 1
// Incrementally checks the hashes of key0, key1 ... until it finds eight that start with 00000
// Uses the md5 function downloaded from http://www.myersdaily.org/joseph/javascript/md5.js
function chessPassword(string) {
  let password = '';
  let n = 0;
  while (password.length < 8) {
    const hash = md5(string + n);
    if (hash.startsWith('00000')) {
      password += hash[5];
      console.log(string + n);
      console.log(hash);
    }
    n++;
  }
  return password;
}

// Day 5 - Puzzle 2
// Incrementally checks the hashes of key0, key1 ... until it finds hex hashes
// that start with 000000, 000001 ... 000007
// Uses the md5 function downloaded from http://www.myersdaily.org/joseph/javascript/md5.js
function chessPassword2(string) {
  let password = Array(8).fill(null);
  let found = 0;
  let n = 0;
  while (found < 8) {
    const hash = md5(string + n);
    if (hash.startsWith('00000')) {
      const pos = hash[5];
      console.log(string + n);
      console.log(hash);
      if (pos < 8 && password[pos] === null) {
        password[pos] = hash[6];
        console.log(password);
        found++;
      }
    }
    n++;
  }
  return password.join('');
}

// Day 6 - Puzzle 1
// Takes a list of same-length strings
// Returns a string of that length with the MOST-common char at each position
function repetitionCode(input) {
  const array = input.split('\n');
  let freq = Array(array[0].length)
    .fill(null)
    .map((cell) => (cell = {}));
  array.forEach((str) => {
    str.split('').forEach((char, i) => {
      if (freq[i].hasOwnProperty(char)) {
        freq[i][char]++;
      } else freq[i][char] = 1;
    });
  });

  return freq
    .map((obj) => {
      let arr = [];
      for (var key in obj) {
        arr.push([key, obj[key]]);
      }
      return arr.sort((a, b) => b[1] - a[1])[0][0];
    })
    .join('');
}

// Day 6 - Puzzle 2
// Takes a list of same-length strings
// Returns a string of that length with the LEAST-common char at each position
function repititionCode2(input) {
  const array = input.split('\n');
  let freq = Array(array[0].length)
    .fill(null)
    .map((cell) => (cell = {}));
  array.forEach((str) => {
    str.split('').forEach((char, i) => {
      if (freq[i].hasOwnProperty(char)) {
        freq[i][char]++;
      } else freq[i][char] = 1;
    });
  });

  return freq
    .map((obj) => {
      let arr = [];
      for (var key in obj) {
        arr.push([key, obj[key]]);
      }
      return arr.sort((a, b) => a[1] - b[1])[0][0];
    })
    .join('');
}

// Day 7 - Puzzle 1
// Takes a list of strings
// Returns how many strings are "TLS"
function numTLS(input) {
  let count = 0;
  input.split('\n').forEach((ip) => {
    let isTLS = true;
    const segments = ip.split(/[\[\]]/g);
    if (segments.some((seg, i) => i % 2 === 1 && hasABBA(seg))) {
      isTLS = false;
    }
    if (isTLS) {
      if (!segments.some((seg, i) => i % 2 === 0 && hasABBA(seg))) {
        isTLS = false;
      }
    }
    if (isTLS) {
      console.log(ip);
      count++;
    }
  });
  return count;
}

// Returns true if str contains a four-letter ABBA sequence, else false
function hasABBA(str) {
  for (var i = 0; i < str.length - 3; i++) {
    if (str[i] === str[i + 3] && str[i + 1] === str[i + 2] && str[i] !== str[i + 1]) {
      return true;
    }
  }
  return false;
}

// Day 7 - Puzzle 2
// Takes a list of strings
// Returns how many strings are "SSL"
function numSSL(input) {
  let count = 0;
  input.split('\n').forEach((ip) => {
    const segments = ip.split(/[\[\]]/g);
    let ABAarray = [],
      BABarray = [];
    segments.forEach((seg, i) => {
      // inside segments
      if (i % 2 === 0) {
        ABAarray = ABAarray.concat(listABA(seg));
      }
      // outside segments
      else {
        BABarray = BABarray.concat(listABA(seg));
      }
    });

    // Eliminate duplicates
    ABAarray = Array.from(new Set(ABAarray));
    BABarray = Array.from(new Set(BABarray));

    //Check for pair of inverses between inside and outside segments
    if (ABAarray.some((aba) => BABarray.findIndex((bab) => areInverse(aba, bab)) > -1)) {
      count++;
    }
  });
  return count;
}

// Returns an array of all strings within str of form 'aba'
function listABA(str) {
  let segments = [];
  for (var i = 0; i < str.length - 2; i++) {
    if (str[i] === str[i + 2] && str[i] !== str[i + 1]) {
      segments.push(str.slice(i, i + 3));
    }
  }
  return segments;
}

// Takes two ABA strings
// Returns true if they are each other's inverse
function areInverse(first, second) {
  return first[0] === second[1] && first[1] === second[0];
}

// Day 8 - Puzzle 1 & 2
// Takes a list of strings of directions
// Returns the number of pixels lit after all directions
function tinyScreen(input, seeViz = false) {
  let screen = Array(6)
    .fill(null)
    .map((row) => Array(50).fill(0));
  input.split('\n').forEach((dir) => {
    if (dir.includes('rect')) {
      const [x, y] = dir
        .split(/[\sx]/g)
        .slice(1)
        .map((el) => +el);
      for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
          screen[j][i] = 1;
        }
      }
    } else if (dir.includes('row')) {
      const [row, amt] = dir
        .split(/=|\sby\s/g)
        .slice(1)
        .map((el) => +el);
      screen[row] = screen[row].map((el, i, r) => r[(i + 50 - amt) % 50]);
    } else {
      // column
      const [col, amount] = dir
        .split(/=|\sby\s/g)
        .slice(1)
        .map((el) => +el);
      screen = screen.map((row, r, screen) => {
        return screen[r]
          .slice(0, col)
          .concat(screen[(r + 6 - amount) % 6][col], screen[r].slice(col + 1));
      });
    }
  });
  if (seeViz) {
    drawScreen(screen);
    return 'See visualization';
  }
  return screen
    .map((row) => row.reduce((prev, cur) => prev + cur))
    .reduce((prev, cur) => prev + cur);
}

const drawScreen = (displayGrid) => {
  const imageDiv = document.getElementById('day8visualization');
  imageDiv.innerHTML = '';
  displayGrid.forEach((row) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('day8row');
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('day8cell');
      if (cell) {
        cellDiv.classList.add('black');
      }
      rowDiv.appendChild(cellDiv);
    });
    imageDiv.appendChild(rowDiv);
  });
  imageDiv.style.visibility = 'visible';
};

// Day 9 - Puzzle 1
// Takes a string
// Returns the length of that string decompressed
function decompress(string) {
  let decompressed = '';
  let left = string;
  let match = left.match(/\((\d+)x(\d+)\)/);
  while (match) {
    decompressed += left.slice(0, match.index);
    left = left.slice(match.index + match[0].length);
    decompressed += left.slice(0, +match[1]).repeat(+match[2]);
    left = left.slice(+match[1]);
    match = left.match(/\((\d+)x(\d+)\)/);
  }
  decompressed += left;
  return decompressed.length;
}

// Day 9 - Puzzle 2
function fullDecompress(input) {
  let string = input;
  let decomLength = 0;
  const regex = /\((\d+)x(\d+)\)/;
  let match = string.match(regex);

  while (match) {
    const { 0: whole, 1: len, 2: repeat, index } = match;

    // 1. Add the length before first (AxB), remove that section
    string = string.slice(index + whole.length);
    decomLength += index;

    // 2. Capture subsection to repeat
    const subsection = string.slice(0, len);

    // 3. Check if subsection contains any (AxB)
    if (subsection.match(regex)) {
      // TRY - Do the actual repeat
      string = subsection.repeat(repeat) + string.slice(len);
    } else {
      // Just add A * B to length, remove subsection
      decomLength += len * repeat;
      string = string.slice(len);
    }
    match = string.match(regex);
  }
  return decomLength + string.length;
}

// Day 10 - Puzzle 1
// Follows all instructions for microchip passing between bots
// Returns which bot has the val1 and val2 microchip at some point
const botMicrochips = (input, val1 = 17, val2 = 61) => {
  const initialSteps = input.split('\n').filter((el) => el.startsWith('value'));
  const divvySteps = input.split('\n').filter((el) => !el.startsWith('value'));
  const bots = {};
  const output = [];

  initialSteps.forEach((step) => {
    const match = step.match(/value (?<value>\d+) goes to bot (?<bot>\d+)/);
    if (match) {
      const bot = +match.groups.bot;
      const value = +match.groups.value;
      if (bots[bot]) {
        bots[bot].push(value);
      } else {
        bots[bot] = [value];
      }
    }
  });

  let found = Object.keys(bots).find((key) => bots[key].includes(val1) && bots[key].includes(val2));
  if (found) return found;

  for (let i = 0; i < divvySteps.length; i++) {
    const match = divvySteps[i].match(
      /bot (?<bot>\d+) gives low to (?<low>(bot|output) \d+) and high to (?<high>(bot|output) \d+)/,
    );
    if (!match) {
      console.log('bad instruction?', divvySteps[i]);
      return;
    }

    // If the giver doesn't have two yet,
    // put the instruction at the end of the list to retry later
    const giver = bots[match.groups.bot];
    if (!giver || giver.length !== 2) {
      divvySteps.push(divvySteps[i]);
      continue;
    }

    const lowValue = giver[0] < giver[1] ? giver[0] : giver[1];

    const [lowLocation, lowIndex] = match.groups.low.split(' ');
    if (lowLocation === 'output') {
      output[+lowIndex] = lowValue;
    } else {
      bots[+lowIndex] ? bots[+lowIndex].push(lowValue) : (bots[+lowIndex] = [lowValue]);
      if (bots[+lowIndex].includes(val1) && bots[+lowIndex].includes(val2)) {
        return lowIndex;
      }
    }

    const highValue = giver[0] > giver[1] ? giver[0] : giver[1];
    const [highLocation, highIndex] = match.groups.high.split(' ');
    if (highLocation === 'output') {
      output[+highIndex] = highValue;
    } else {
      bots[+highIndex] ? bots[+highIndex].push(highValue) : (bots[+highIndex] = [highValue]);
      if (bots[+highIndex].includes(val1) && bots[+highIndex].includes(val2)) {
        return highIndex;
      }
    }
  }
  console.log('Completed all steps without finding it');
};

// Day 10 - Puzzle 2
// Follows all instructions for microchip passing between bots
// Returns the product of the values at output 0, 1 and 2
const botMicrochipsOutput = (input) => {
  const initialSteps = input.split('\n').filter((el) => el.startsWith('value'));
  const divvySteps = input.split('\n').filter((el) => !el.startsWith('value'));
  const bots = {};
  const output = [];

  initialSteps.forEach((step) => {
    const match = step.match(/value (?<value>\d+) goes to bot (?<bot>\d+)/);
    if (match) {
      const bot = +match.groups.bot;
      const value = +match.groups.value;
      if (bots[bot]) {
        bots[bot].push(value);
      } else {
        bots[bot] = [value];
      }
    }
  });

  for (let i = 0; i < divvySteps.length; i++) {
    const match = divvySteps[i].match(
      /bot (?<bot>\d+) gives low to (?<low>(bot|output) \d+) and high to (?<high>(bot|output) \d+)/,
    );
    if (!match) {
      console.log('bad instruction?', divvySteps[i]);
      return;
    }

    // If the giver doesn't have two yet,
    // put the instruction at the end of the list to retry later
    // TODO: Use logic to process in the correct order instead - Is that actually faster though?
    const giver = bots[match.groups.bot];
    if (!giver || giver.length !== 2) {
      divvySteps.push(divvySteps[i]);
      continue;
    }

    const lowValue = giver[0] < giver[1] ? giver[0] : giver[1];

    const [lowLocation, lowIndex] = match.groups.low.split(' ');
    if (lowLocation === 'output') {
      output[+lowIndex] = lowValue;
    } else {
      bots[+lowIndex] ? bots[+lowIndex].push(lowValue) : (bots[+lowIndex] = [lowValue]);
    }

    const highValue = giver[0] > giver[1] ? giver[0] : giver[1];
    const [highLocation, highIndex] = match.groups.high.split(' ');
    if (highLocation === 'output') {
      output[+highIndex] = highValue;
    } else {
      bots[+highIndex] ? bots[+highIndex].push(highValue) : (bots[+highIndex] = [highValue]);
    }
  }
  return output[0] * output[1] * output[2];
};

// ----- DAY 11 -------

/**
 * Day 12, Puzzle 1 & 2
 * Executes the instructions as provided.
 * @param data - the initial state of the register data, ie { a: 0, b: 0, c: 0, d: 0 }
 */
const monorailProgram = (input, data) => {
  const steps = input.split('\n');
  let curStep = 0;

  while (curStep < steps.length) {
    const [type, x, y] = steps[curStep].split(' ');
    let incrementStep = true;
    switch (type) {
      case 'cpy':
        data[y] = x in data ? data[x] : Number(x);
        break;
      case 'inc':
        data[x]++;
        break;
      case 'dec':
        data[x]--;
        break;
      case 'jnz':
        if (x === '0') break;
        if (x in data && data[x] === 0) break;
        curStep += Number(y);
        incrementStep = false;
        break;
      default:
        throw new Error(`Unexpected instruction type: ${steps[curStep]}`);
    }
    if (incrementStep) {
      curStep++;
    }
  }

  return data.a;
};

/**
 * Day 13, Puzzle 1
 * Returns how many moves it takes to get from [1,1] to [31.39]
 */
const cubicleMaze = () => {
  let minPath = Number.MAX_VALUE;
  const queue = [new CubiclePath(1, 1)];
  while (queue.length) {
    const currentPath = queue.shift();
    if (currentPath.pathLength >= minPath) continue;
    const neighbors = currentPath.currentNode.neighbors;
    const neighborsToVisit = neighbors.filter((n) => !currentPath.isNodeInPath(n));
    neighborsToVisit.forEach((node) => {
      if (node.is(31, 39)) {
        const len = currentPath.pathLength;
        if (len < minPath) {
          minPath = len;
        }
      } else {
        const newPath = currentPath.visitNode(node);
        queue.push(newPath);
      }
    });
  }

  return minPath;
};

/**
 * Day 13, Puzzle 2
 * Returns how many locations can be reached
 * in less than 50 moves from [1,1].
 *
 * Takes about 20 seconds - probably not the best algo
 */
const nearbyCubicles = () => {
  let count = 0;
  for (let x = 0; x <= 51; x++) {
    for (let y = 0; y <= 51; y++) {
      if (manhattanDistance([1, 1], [x, y]) <= 50) {
        const isNearby = isNearbyCubicle(x, y);
        if (isNearby) {
          count++;
        }
      }
    }
  }
  return count;
};

/**
 * Returns whether [endX, endY] can be reached in 50 steps or less from [1,1]
 */
const isNearbyCubicle = (endX, endY) => {
  if (endX === 1 && endY === 1) return true;
  const MAX_LENGTH = 50;
  const queue = [new CubiclePath(1, 1)];
  while (queue.length) {
    const currentPath = queue.shift();
    const neighbors = currentPath.currentNode.neighbors;
    const neighborsToVisit = neighbors.filter((n) => !currentPath.isNodeInPath(n));
    for (const node of neighborsToVisit) {
      if (node.is(endX, endY)) {
        return true;
      } else if (currentPath.pathLength < MAX_LENGTH) {
        const newPath = currentPath.visitNode(node);
        queue.push(newPath);
      }
    }
  }

  return false;
};

/**
 * Day 14, Puzzle 1 & 2
 * Takes too long...
 */
const hashKeys = (input, hashAlg) => {
  let keys = 0;
  let i = -1;
  let cache = {};
  while (keys < 64) {
    if (i % 1000 === 2) console.log(i, keys);
    i++;
    const hash = cache[i] || hashAlg(`${input}${i}`);
    cache[i] = hash;
    const [_, repeatChar] = hash.match(/(\w)\1\1/) || [];
    if (repeatChar) {
      const str = repeatChar.repeat(5);
      for (let j = i + 1; j <= i + 1000; j++) {
        const h = cache[j] || hashAlg(`${input}${j}`);
        cache[j] = h;
        delete cache[j - 1002];
        if (h.includes(str)) {
          keys++;
          break;
        }
      }
    }
  }
  return i;
};

const stretchedHash = (value) => {
  let hashed = md5(value);
  for (let i = 0; i < 2016; i++) {
    hashed = md5(hashed);
  }
  return hashed;
};

/**
 * Day 15, Puzzle 1 & 2
 * Brute force method
 * There's probably a mathematical algorithm, but this returned very quickly
 */
const slotMachine = (input, extraDisc) => {
  const discs = input.split('\n').map((str) => {
    const [_, loc, slots, start] = str
      .match(/^Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+).$/)
      .map((el) => +el);
    return { loc, slots, start };
  });

  if (extraDisc) {
    discs.push({ loc: discs.length + 1, ...extraDisc });
  }

  let i = 0;
  while (true) {
    if (discs.every((d) => isSlot(d, i))) {
      return i;
    }
    i++;
  }
};

const isSlot = ({ loc, slots, start }, time) => {
  return (start + time + loc) % slots === 0;
};

/**
 * Day 16, Puzzle 1 & 2
 */
const dragonCheck = (input, len) => {
  const curve = dragonCurve(input, len);
  return dragonCheckSum(curve, len);
};

const dragonCurve = (value, len) => {
  let val = value;
  do {
    val =
      val +
      '0' +
      val
        .split('')
        .reverse()
        .map((el) => (el === '1' ? 0 : 1))
        .join('');
  } while (val.length < len);
  return val;
};

const dragonCheckSum = (value, len) => {
  let val = value.slice(0, len);
  do {
    val = splitArrayInChunks(val.split(''), 2)
      .map((pair) => (pair[0] === pair[1] ? 1 : 0))
      .join('');
  } while (val.length % 2 === 0);
  return val;
};

/**
 * Day 17, Puzzle 1 & 2
 * @param pathType - 'shortest' for pt1,  'longest' for pt2
 */
const vaultPath = (input, pathType) => {
  const queue = [{ x: 0, y: 0, path: '' }];
  let minLength = Number.MAX_VALUE;
  let maxLength = 0;
  let bestPath = '';
  let worstPath = '';
  while (queue.length) {
    const { path, x, y } = queue.shift();
    if (x === 3 && y === 3) {
      if (path.length < minLength) {
        minLength = path.length;
        bestPath = path;
      }
      if (path.length > maxLength) {
        maxLength = path.length;
        worstPath = path;
      }
      continue;
    }
    const dirs = getOpenDoors(input, path, x, y);
    dirs.forEach((dir) => {
      switch (dir) {
        case 'U':
          queue.push({ x, y: y - 1, path: path + dir });
          break;
        case 'D':
          queue.push({ x, y: y + 1, path: path + dir });
          break;
        case 'L':
          queue.push({ x: x - 1, y, path: path + dir });
          break;
        case 'R':
          queue.push({ x: x + 1, y, path: path + dir });
          break;
      }
    });
  }
  if (pathType === 'shortest') {
    return bestPath;
  } else {
    return worstPath.length;
  }
};

const getOpenDoors = (input, path, x, y) => {
  const hash = md5(`${input}${path}`);
  const directions = 'UDLR';
  return hash
    .slice(0, 4)
    .split('')
    .flatMap((el, i) => {
      if (!'bcdef'.includes(el)) return [];
      const dir = directions[i];
      if (dir == 'U' && y === 0) return [];
      if (dir === 'D' && y === 3) return [];
      if (dir === 'L' && x === 0) return [];
      if (dir === 'R' && x === 3) return [];
      return [dir];
    });
};
