// Which floor does he end up in?
// ( means +1 and ) means -1
const day1Puzzle1 = (input) => {
  return input.split("(").length - input.split(")").length;
}

// Which 1-indexed step sends him to the basement (-1)
// ( means +1 and ) means -1
const day1Puzzle2 = (input) => {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else {
      floor--;
    }
    if (floor < 0) {
      return i + 1;
    }
  }
return "never";
}