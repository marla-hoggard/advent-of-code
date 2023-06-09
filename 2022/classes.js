class ElevationMap {
  constructor(input) {
    this.nodes = {};
    this.start = null;
    this.otherStartNodes = [];
    this.end = null;

    input.split('\n').forEach((row, r) => {
      return row.split('').forEach((value, c) => {
        this.addNode(value, r, c);
      });
    });

    Object.values(this.nodes).forEach((node) => {
      const top = this.getNodeByCoords(node.row - 1, node.col);
      const bottom = this.getNodeByCoords(node.row + 1, node.col);
      const left = this.getNodeByCoords(node.row, node.col - 1);
      const right = this.getNodeByCoords(node.row, node.col + 1);
      node.addNeighbor(top);
      node.addNeighbor(bottom);
      node.addNeighbor(left);
      node.addNeighbor(right);
    });
  }

  addNode(value, row, col) {
    const node = new ElevationNode(value, row, col);
    this.nodes[node.loc] = node;
    if (node.isStart) {
      this.start = node;
    } else if (node.isEnd) {
      this.end = node;
    } else if (node.height === 1) {
      this.otherStartNodes.push(node);
    }
    return node;
  }

  getNodeByLocation(loc) {
    return this.nodes[loc] || null;
  }

  getNodeByCoords(row, col) {
    const loc = ElevationNode.getLocation(row, col);
    return this.getNodeByLocation(loc);
  }

  getAdditionalStartNodes() {
    return this.otherStartNodes;
  }

  resetNodes() {
    for (const node of Object.values(this.nodes)) {
      node.visited = false;
    }
  }
}

class ElevationNode {
  static getLocation(row, col) {
    return `${row}-${col}`;
  }

  constructor(value, row, col) {
    this.isStart = false;
    this.isEnd = false;
    if (value === 'S') {
      this.isStart = true;
      this.height = 1;
    } else if (value === 'E') {
      this.isEnd = true;
      this.height = 26;
    } else {
      this.height = value.charCodeAt(0) - 96;
    }
    this.row = row;
    this.col = col;
    this.loc = ElevationNode.getLocation(row, col);

    this.visited = false;

    // The nodes that you can visit from here
    this.neighbors = [];
    this.neighborCoords = new Set();
  }

  addNeighbor(node) {
    if (!node) {
      return;
    }

    if (this.neighborCoords.has(node.loc)) {
      return;
    }

    if (node.height <= this.height + 1) {
      this.neighbors.push(node);
      this.neighborCoords.add(node.loc);
    }
  }

  setVisited() {
    this.visited = true;
  }
}

class ElevationPath {
  constructor(nodes) {
    this.path = nodes;
    this.last = nodes.at(-1);
  }

  toString() {
    return this.path.map((node) => node.loc).join(',');
  }

  getLength() {
    return this.path.length;
  }

  newWithAddedNode(node) {
    node.setVisited();
    return new ElevationPath([...this.path, node]);
  }
}
