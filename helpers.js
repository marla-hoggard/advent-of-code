/**
 * Find the manhattan distance between two x,y coordinates
 */
const manhattanDistance = ([x1, y1], [x2, y2]) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

/**
 * Takes two parameters that represent the numerator and denomenator
 * of a fraction to be reduced.
 * Returns a tuple that represents that reduced fraction.
 * i.e. reduceFraction(15, 10) = [3, 2];
 */
const reduceFraction = (num, denom) => {
  const GCD = gcd(num, denom);
  return [num / GCD, denom / GCD];
};

/**
 * Finds the greatest common denominator of a and b
 */
const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a;
};

/**
 * Finds the lowest common multiple of a and b
 */
const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

/**
 * Finds the lowest common multiple of an array of numbers
 */
const lcmArray = (arr) => {
  return arr.reduce(lcm, 1);
};

/**
 * Return the sum of the values in an array
 * For each element in @param arr, Number(el) must return a number
 */
const sum = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += Number(arr[i]);
  }
  return total;
};

/**
 * Returns the number of occurrences of @val in the iterable @iter
 * @iter can be an array or a string.
 * Note: If @iter is an array, @val must be a full match of an element in the array
 */
const numOccurrencesBaseMethod = (iter, val) => {
  let found = 0;
  let i = iter.indexOf(val);
  while (i !== -1) {
    found++;
    i = iter.indexOf(val, i + 1);
  }
  return found;
};

/**
 * Returns the number of occurences of @val in @set
 * @set can be an array, a string, or a value that can be converted to a string (like a number.toString())
 * @array can be an array of arrays any dimension deep
 */
const numOccurrences = (set, val) => {
  if (Array.isArray(set)) {
    if (Array.isArray(set[0])) {
      return sum(set.map((row) => numOccurrences(row, val)));
    } else {
      return numOccurrencesBaseMethod(set, val);
    }
  } else {
    return numOccurrencesBaseMethod(set.toString(), val);
  }
};

/**
 * Returns the indexes of the occurrences of @val in the iterable @iter
 * @iter can be an array or a string.
 * Note: If @iter is an array, @val must be a full match of an element in the array
 */
const findOccurrences = (iter, val) => {
  let indexes = [];
  let i = iter.indexOf(val);
  while (i !== -1) {
    indexes.push(i);
    i = iter.indexOf(val, i + 1);
  }
  return indexes;
};

/**
 * Checks if @array1 and @array2 have the same content
 * Works for all array depths uses deep equality on object elements
 */
const isSameArray = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((element, i) => {
    if (typeof element !== 'object') {
      return element === array2[i];
    } else if (Array.isArray(element)) {
      return isSameArray(element, array2[i]);
    } else if (element === null) {
      return array2[i] === null;
    } else {
      return isDeepEqual(element, array2[i]);
    }
  });
};

/**
 *  Check deep equality of two objects
 */
const isDeepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }

  return true;
};

/**
 * Returns true if the item passed in is a defined, nonnull Object
 */
function isObject(object) {
  return object != null && typeof object === 'object';
}

/**
 * Splits @arr into a 2D array with rows of length @len
 * ex: arr = [1,2,3,4,5,6], len = 2 -> [[1,2], [3,4], [5,6]]
 * with remainder: arr = [1,2,3,4,5,6,7,8,9,10], len = 3 => [[1,2,3], [4,5,6], [7,8,9], [10]]
 */
const splitArrayInChunks = (arr, len) => {
  let splitArray = [];
  for (let i = 0; i < arr.length; i += len) {
    splitArray.push(arr.slice(i, i + len));
  }
  return splitArray;
};

/**
 * The same as splitArrayInChunks except that if there is a remainder,
 * adds the excess to end of the last line instead of putting it on its own
 * ex: arr = [1,2,3,4,5,6,7,8,9,10], len = 3 => [[1,2,3], [4,5,6], [7,8,9,10]]
 */
const splitArrayInChunksRemainderLast = (arr, len) => {
  let splitArray = [];
  for (let i = 0; i < arr.length; i += len) {
    splitArray.push(arr.slice(i, i + len));
  }
  const numChunks = splitArray.length;
  if (splitArray[numChunks - 1].length < len) {
    splitArray[numChunks - 2] = splitArray[numChunks - 2].concat(splitArray[numChunks - 1]);
    return splitArray.slice(0, -1);
  }
  return splitArray;
};

/**
 * Creates a 2D array where all cells are equal to @param val
 * @param {number} width Width of the array (how long is each subarray)
 * @param {number} height Height of the array (how many rows in the array)
 * @param {*} val The value to fill each cell in the 2D array
 */
const create2DArray = (width, height, val) => {
  if (typeof val !== 'object' || val == null) {
    return create2DArrayPrimitive(width, height, val);
  } else if (Array.isArray(val)) {
    return create2DArrayofArrays(width, height, val);
  } else {
    return create2DArrayObject(width, height, object);
  }
};

const create2DArrayPrimitive = (width, height, val) => {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(val));
};

const create2DArrayofArrays = (width, height, val) => {
  return Array(height)
    .fill(null)
    .map(() =>
      Array(width)
        .fill(null)
        .map(() => [...val]),
    );
};

const create2DArrayObject = (width, height, val) => {
  return Array(height)
    .fill(null)
    .map(() =>
      Array(width)
        .fill(null)
        .map(() => ({ ...val })),
    );
};

/**
 * Creates an array of numbers, in series, from min to max, inclusive.
 * Ex: createSeriesArray(3,6) = [3, 4, 5, 6];
 */
const createSeriesArray = (min, max) => {
  return Array(max - min + 1)
    .fill(null)
    .map((_el, i) => i + min);
};

/**
 * Reverses the keys and values of an object.
 * All values must be unique or else data will be lost.
 */
const reverseObject = (obj) => {
  return Object.entries(obj).reduce((reversed, [key, val]) => {
    reversed[val] = key;
    return reversed;
  }, {});
};

/**
 * Takes array of same-length strings and swaps the rows for columns:
 * Ex: reverseGrid(['AAA', 'BBB', 'CCC', 'DDD']) = ['ABCD', 'ABCD', ABCD']
 *
 * AAA      ABCD
 * BBB  =>  ABCD
 * CCC      ABCD
 * DDD
 */
const reverseGrid = (array) => {
  let grid = new Array(array[0].length).fill('');
  for (const row of array) {
    row.split('').forEach((letter, i) => {
      grid[i] += letter;
    });
  }

  return grid;
};

// @indices = a number or an array of numbers
// Removes the index/indices of @indices from array and returns array
/**
 * Removes the value(s) at @indices from @array and returns the resulting array.
 * Does not mutate the original array.
 * @param {any[]} array The array to edit
 * @param {number | number[]} indices The index or array of indices to remove
 *
 * Note: This could probably be refactored to be more performant
 */
const removeIndex = (array, indices) => {
  if (typeof indices === 'number') {
    return array.slice(0, indices).concat(array.slice(indices + 1));
  }
  indices.sort((a, b) => a - b);
  while (indices.length) {
    const remove = indices.shift();
    array = removeIndex(array, remove);
    indices = indices.map((el) => el - 1);
  }
  return array;
};

/**
 * Returns @array without the first instance of @val
 */
const removeVal = (array, val) => {
  const index = array.indexOf(val);
  if (index >= 0) {
    return array.slice(0, index).concat(array.slice(index + 1));
  }
  return array;
};

/**
 * Solves the quadratic equation in the form of ax^2 + bx + c
 * Pass in a, b, c
 * Returns [x1, x2] - the two solutions
 */
const quadratic = (a, b, c) => {
  const x1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  return [x1, x2];
};

/**
 * @param {*} obj An object with numeric values
 * @param {*} key The key whose value should be incremented
 * @param {*} amt The amount to increment that key's value by
 *
 * Increments obj[key] by amt, in place.
 * If obj[key] wasn't present, sets obj[key] to amt
 *
 * This will directly mutate obj.
 */
const incrementObjVal = (obj, key, amt = 1) => {
  obj[key] ??= 0;
  obj[key] += amt;
};

/**
 * Solves a system of linear equations of the form:
 * ax + by = res1;
 * cx + dy = res2;
 *
 * @param eq1 = [a, b, res1]
 * @param es2 = [c, d, res2]
 * @returns the values of x and y as [x, y];
 */
const solveLinearSystem = (eq1, eq2) => {
  const [a, b, res1] = eq1.map((el) => el * eq2[1]);
  const [c, d, res2] = eq2.map((el) => el * eq1[1]);
  if (b !== d) {
    throw new Error('I messed up');
  }
  const x = (res2 - res1) / (c - a);
  const y = (res1 - a * x) / b;

  return [x, y];
};
