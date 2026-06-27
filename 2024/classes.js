/**
 * Day 16
 */
class ReindeerNode {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.label = xyToString(x, y);
    this.isStart = false;
    this.isEnd = false;
    this.edges = [];
    this.dist = Infinity;
    this.visited = false;
  }
  setIsStart() {
    this.isStart = true;
    this.dist = 0;
    this.visited = true;
  }
  setIsEnd() {
    this.isEnd = true;
  }

  isValidDirection(dir) {
    switch (this.dir) {
      case 'up':
        return dir !== 'down';
      case 'down':
        return dir !== 'up';
      case 'left':
        return dir !== 'left';
      case 'right':
        return dir !== 'right';
      default:
        throw new Error(`invalid direction: ${this.dir}`);
    }
  }

  setEdges(blocked) {
    const up = { x: this.x, y: this.y - 1, dir: 'up' };
    const down = { x: this.x, y: this.y + 1, dir: 'down' };
    const left = { x: this.x - 1, y: this.y, dir: 'left' };
    const right = { x: this.x + 1, y: this.y, dir: 'right' };

    [up, down, left, right].forEach(({ x, y, dir }) => {
      const label = xyToString(x, y);
      if (!blocked.has(label)) {
        if (dir === this.dir) {
          this.edges.push({ label, dir, dist: 1 });
        } else if (this.isValidDirection(dir)) {
          this.edges.push({ label, dir, dist: 1001 });
        }
      }
    });
  }
  visit() {
    this.visited = true;
  }
  setDist(newDist) {
    if (newDist < this.dist) {
      this.dist = newDist;
    }
    this.visit();
  }
}

/**
 * Day 18
 * A Node class for using Dijkstra's algorithm for a graph in which
 * all edges are bi-directional and of length 1
 */
class SimpleGridNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.label = xyToString(x, y);
    this.isStart = false;
    this.isEnd = false;
    this.neighbors = [];
    this.dist = Infinity;
    this.visited = false;
  }
  setIsStart() {
    this.isStart = true;
    this.dist = 0;
    this.visited = true;
  }
  setIsEnd() {
    this.isEnd = true;
  }
  setNeighbors(blocked, maxX, maxY) {
    [
      [this.x, this.y - 1],
      [this.x, this.y + 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
    ].forEach(([x, y]) => {
      const label = xyToString(x, y);
      if (x >= 0 && x <= maxX && y >= 0 && y <= maxY && !blocked.has(label)) {
        this.neighbors.push(label);
      }
    });
  }
  visit() {
    this.visited = true;
  }
  setDist(newDist) {
    if (newDist < this.dist) {
      this.dist = newDist;
    }
  }
}
