class CubicleNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }

  is(x, y) {
    return this.x === x && this.y === y;
  }

  isOpenSpace() {
    if (this.x < 0 || this.y < 0) return false;
    const value =
      this.x * this.x + 3 * this.x + 2 * this.x * this.y + this.y + this.y * this.y + DAY13;
    const binary = value.toString(2);
    const numOnes = numOccurrences(binary, '1');
    return numOnes % 2 === 0;
  }

  get neighbors() {
    const top = new CubicleNode(this.x, this.y - 1);
    const bottom = new CubicleNode(this.x, this.y + 1);
    const left = new CubicleNode(this.x - 1, this.y);
    const right = new CubicleNode(this.x + 1, this.y);

    return [top, bottom, left, right].filter((n) => n.isOpenSpace());
  }
}

class CubiclePath {
  constructor(x, y, prevPath = new Set()) {
    this.currentNode = new CubicleNode(x, y);
    this.path = new Set([...prevPath, this.currentNode.toString()]);
  }

  get pathLength() {
    return this.path.size;
  }

  isNodeInPath(node) {
    return this.path.has(node.toString());
  }

  visitNode(node) {
    return new CubiclePath(node.x, node.y, this.path);
  }

  toString() {
    return Array.from(this.path).join(' - ');
  }
}
