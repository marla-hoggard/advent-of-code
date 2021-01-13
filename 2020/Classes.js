
// ---- DAY 23 ----
// A doubly-linked circular list

class CupNode {
  constructor(value, oneLess = null, next = null) {
    this.value = value;
    this.next = next;
    this.oneLess = oneLess;
    this.pickedUp = false;
  }
}

class CupList {
  constructor() {
    this.currentCup = null;
    this.addSpot = null;
    this.isCircular = false; // Change to true after initialized
    this.maxValue = null; // The cup with the highest value
    this.cupOne = null; // The cup with value = 1
    this.size = 0;
  }

  addOne(val) {
    const node = new CupNode(val);
    if (this.size === 0) {
      this.currentCup = node;
      this.addSpot = node;
    } else {
      this.addSpot.next = node;
      if (this.addSpot.value === val - 1) {
        node.oneLess = this.addSpot;
      }
      this.addSpot = node;
    }
    this.size++;
    return node;
  }

  // Adds the elements in array of values @arr, in array order
  addManyFromArray(arr) {
    const maxValue = Math.max(...arr);
    arr.forEach(value => {
      const node = this.addOne(value)
      if (value === maxValue && (!this.maxValue || value > this.maxValue.value)) {
        this.maxValue = node;
      }
      if (value === 1) {
        this.cupOne = node;
      }
    });
  }

  // Add elements, in order, with values from min...max inclusive
  addManyConsecutive(min, max) {
    const minNode = this.addOne(min);
    if (this.maxValue && this.maxValue.value === min - 1) {
      minNode.oneLess = this.maxValue;
    }
    for (let i = min + 1; i < max; i++) {
      this.addOne(i);
    }
    const maxNode = this.addOne(max);
    if (!this.maxValue || max > this.maxValue.value) {
      this.maxValue = maxNode;
    }
  }

  // Iterates through entire list and sets this.oneLess for each
  // The list consist of consecutive values (in any order) with no holes
  setOneLess() {
    let currentNode = this.currentCup;
    let searchNode = this.currentCup;
    while (currentNode) {
      while (searchNode && searchNode.value !== currentNode.value - 1) {
        searchNode = searchNode.next;
      }
      if (searchNode) {
        currentNode.oneLess = searchNode;
      }
      searchNode = this.currentCup;
      currentNode = currentNode.next;
    }
  }

  // Call this once to close the loop after initializing all values
  closeLoop() {
    if (!this.isCircular) {
      this.addSpot.next = this.currentCup;
      this.isCircular = true;
      if (this.cupOne){
        this.cupOne.oneLess = this.maxValue;
      }
    }
  }

  makeMove() {
    const first = this.currentCup.next;
    const second = first.next;
    const third = second.next;
    const pickedup = [first, second, third];
    pickedup.forEach(node => node.pickedUp = true);

    let destination = this.currentCup.oneLess;
    while (destination.pickedUp) {
      destination = destination.oneLess;
    }

    this.currentCup.next = third.next;
    third.next = destination.next;
    destination.next = first;

    pickedup.forEach(node => node.pickedUp = false)

    this.currentCup = this.currentCup.next;
  }

  setCurrentCup(node) {
    this.currentCup = node;
  }

  printList() {
    let nodes = [];
    let current = this.currentCup;
    do {
      nodes.push(current.value);
      current = current.next;
    }
    while (current && current !== this.currentCup)
    return nodes;
  }
}