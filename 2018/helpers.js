// Returns how many instances of @val are in @array
// @val must be a primitive type
// @array must be made up of same type size as @val
const countInstances = (arrayOrString, val) => {
  let left = typeof arrayOrString === 'string' ? [...arrayOrString.split('')] : [...arrayOrString];
  let count = 0;
  while (left.includes(val)) {
    count++;
    const i = left.indexOf(val);
    left = left.slice(i + 1);
  }
  return count;
};

// Returns how many instances of @val are in @array
// @array can be 2D array or array of strings, while @val is number/char
const countInstances2D = (array, val) => {
  let count = 0;
  array.forEach((row) => {
    count += countInstances(row, val);
  });
  return count;
};
