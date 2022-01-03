// FOR DAY 12

class Graph {
  constructor() {
    this.nodes = {};
    this.start = null;
    this.end = null;
  }

  addNode(name) {
    const node = new GraphNode(name);
    this.nodes[name] = node;
    if (node.isStart) {
      this.start = node;
    } else if (node.isEnd) {
      this.end = node;
    }
    return node;
  }

  getNode(name) {
    return this.nodes[name] || null;
  }

  hasNode(name) {
    return !!this.nodes[name];
  }

  addEdge(name1, name2) {
    const node1 = this.hasNode(name1) ? this.getNode(name1) : this.addNode(name1);
    const node2 = this.hasNode(name2) ? this.getNode(name2) : this.addNode(name2);
    node1.addNeighbor(node2);
    node2.addNeighbor(node1);
  }
}

class GraphNode {
  constructor(name) {
    this.name = name;
    this.neighbors = [];
    this.isStart = name === 'start';
    this.isEnd = name === 'end';
    this.isSmall = name[0].toUpperCase() !== name[0];
  }

  isNeighbor(name) {
    return !!this.neighbors.find((n) => n.name === name);
  }

  addNeighbor(neighborNode) {
    if (!this.isNeighbor(neighborNode.name)) {
      this.neighbors.push(neighborNode);
    }
  }
}

// Can only visit small caves once (puzzle 1)
class GraphPath {
  constructor(nodes) {
    this.path = nodes;
    this.last = nodes.at(-1);
  }

  toString() {
    return this.path.map((node) => node.name).join(',');
  }

  includesNode(node) {
    return !!this.path.find((n) => n.name === node.name);
  }

  canAddNode(node) {
    if (this.isComplete()) {
      return false;
    }

    if (!this.last.isNeighbor(node.name)) {
      return false;
    }

    if (!node.isSmall) {
      return true;
    }

    return !this.includesNode(node);
  }

  isComplete() {
    if (this.last.isEnd) {
      return true;
    }
  }

  isDeadEnd() {
    if (this.isComplete()) {
      return false;
    }

    return !this.last.neighbors.some((node) => this.canAddNode(node));
  }
}

// Can visit small caves twice (puzzle 2)
class GraphPath2 {
  constructor(nodes, hasDoubleVisit = false) {
    this.path = nodes;
    this.last = nodes.at(-1);
    this.hasDoubleVisit = hasDoubleVisit;
  }

  toString() {
    return this.path.map((node) => node.name).join(',');
  }

  includesNode(node) {
    return !!this.path.find((n) => n.name === node.name);
  }

  canAddNode(node) {
    if (this.isComplete()) {
      return false;
    }

    if (!this.last.isNeighbor(node.name)) {
      return false;
    }

    if (!node.isSmall) {
      return true;
    }

    if (node.isStart || node.isEnd || this.hasDoubleVisit) {
      return !this.includesNode(node);
    }

    return true;
  }

  isComplete() {
    if (this.last.isEnd) {
      return true;
    }
  }

  isDeadEnd() {
    if (this.isComplete()) {
      return false;
    }

    return !this.last.neighbors.some((node) => this.canAddNode(node));
  }

  // Creates a new path based on this one + the node to add
  newWithAddedNode(node) {
    let hasDoubleVisit = this.hasDoubleVisit;
    if (
      !hasDoubleVisit &&
      node.isSmall &&
      !node.isStart &&
      !node.isEnd &&
      this.includesNode(node)
    ) {
      hasDoubleVisit = true;
    }
    return new GraphPath2([...this.path, node], hasDoubleVisit);
  }
}

// For Day 15
class GridGraph {
  /**
   *
   * @param {string} input a 2D rectangle of digits
   */
  constructor(input) {
    this.queue = []; // nodes with distances
    this.farther = []; // nodes whose distance is still infinity
    const nodes = input.split('\n').map((row, whichRow) => {
      return row.split('').map((cell, whichCol) => {
        return new GridNode(whichRow, whichCol, +cell);
      });
    });
    nodes.forEach((row, r, nodes) => {
      row.forEach((node, c) => {
        this.farther.push(node);
        if (r > 0) {
          node.addNeighbor(nodes[r - 1][c]);
        }
        if (r < nodes.length - 1) {
          node.addNeighbor(nodes[r + 1][c]);
        }
        if (c > 0) {
          node.addNeighbor(nodes[r][c - 1]);
        }
        if (c < row.length - 1) {
          node.addNeighbor(nodes[r][c + 1]);
        }
      });
    });
    this.start = nodes[0][0];
    this.start.setDistance(0);
    this.addToQueue(this.start);
    this.end = nodes.at(-1).at(-1);
  }

  sortQueue() {
    this.queue.sort((a, b) => a.distance - b.distance);
  }

  // Adds an unprocessed node to the queue
  addToQueue(node) {
    if (node.isVisited || node.isInQueue) {
      return;
    }
    this.queue.push(node);
    node.isInQueue = true;
  }

  // "Visit" the node at the front of the queue
  // Remove it from the queue and mark it as visited
  // Update distances of all neighbors
  processNextInQueue() {
    const node = this.queue.shift();
    node.isVisited = true;
    node.isInQueue = false;

    node.neighbors.forEach((neighbor) => {
      if (neighbor.distance > node.distance + neighbor.value) {
        neighbor.setDistance(node.distance + neighbor.value);
      }
      this.addToQueue(neighbor);
    });
    this.sortQueue();
  }

  findShortestPath() {
    while (this.queue.length) {
      this.processNextInQueue();
    }
    return this.end.distance;
  }
}

class GridNode {
  constructor(row, col, value) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.distance = Infinity;
    this.neighbors = [];
    this.isVisited = false;
    this.isInQueue = false;
  }

  getCoords() {
    return `${this.row}, ${this.col}`;
  }

  setDistance(dist) {
    this.distance = dist;
  }

  isNeighbor(coords) {
    return !!this.neighbors.find((n) => n.getCoords() === coords);
  }

  addNeighbor(neighborNode) {
    if (!this.isNeighbor(neighborNode.coords)) {
      this.neighbors.push(neighborNode);
    }
  }
}
