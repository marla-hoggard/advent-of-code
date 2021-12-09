const manhattanDistance = ([x1, y1], [x2, y2]) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const reduceFraction = (num, denom) => {
  const GCD = gcd(num, denom);
  return [num / GCD, denom / GCD];
};

// Find the greatest common denominator of a and b
const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a;
};

const lcm2 = (a, b) => {
  return (a * b) / gcd(a, b);
};

const lcm3 = (a, b, c) => {
  return lcm2(lcm2(a, b), c);
};

// Return the sum of the values in an array
// For each element in @arr, Number(el) must return a number
const sum = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += Number(arr[i]);
  }
  return total;
};

// Reverses the keys and values of an object
// i.e. { a: 1, b: 2 } => { 1: 'a', 2: 'b' };
const reverseObject = (obj) =>
  Object.entries(obj).reduce((reversed, [first, second]) => {
    reversed[second] = first;
    return reversed;
  }, {});
