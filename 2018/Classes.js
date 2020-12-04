// --- Standard LinkedList ----------

class LinkedListNode {
	constructor(el) {
		this.element = el;
		this.next = null;
	}
}

// For Day 14 - Recipes
class LinkedList {
	constructor(seq = 0) {
		this.head = null;
		this.firstElf = null;
		this.secondElf = null;
		this.size = 0;
		this.seqLength = seq;
		this.seq = '';
	}

	// Adds an element at the end of the list
	add(el) {
		const node = new LinkedListNode(el);
		let current;
		// If the list is empty
		if (this.head == null) {
			this.head = node;
			this.firstElf = node;
		} 
		else {
			current = this.head;
			// Iterate to the end of the list
			while (current.next) {
				current = current.next;
			}
			// Add the node at the end of the list
			current.next = node;
			if (this.size === 1) {
				this.secondElf = node;
			}
		}
		if (this.size < this.seqLength) {
			this.seq += el;
		} 
		else {
			this.seq = this.seq.slice(1) + el;
		}
		this.size++;
	}

	moveElves() {
		const firstMoves = this.firstElf.element + 1;
		const secondMoves = this.secondElf.element + 1;
		for (var f = 0; f < firstMoves; f++) {
			this.firstElf = this.firstElf.next ?
				this.firstElf.next : this.head;
		}
		for (var s = 0; s < secondMoves; s++) {
			this.secondElf = this.secondElf.next ?
				this.secondElf.next : this.head;
		}
	}

	getElfValue(elf) {
		if (elf === 1) {
			return this.firstElf.element;
		} else {
			return this.secondElf.element;
		}
	}

	getElfSum() {
		return this.firstElf.element + this.secondElf.element;
	}

	getNextTenAfterIndex(index) {
		let current = this.head;
		for (let i = 0; i < index; i++) {
			current = current.next;
		}
		let str = '';
		for (let i = 0; i < 10; i++) {
			str += current.element;
			current = current.next;
		}
		return str;
	}

	getSequence() {
		return this.seq;
	}

	// Inserts an element at the given index
	insert(el, index) {
		if (index > 0 && index > this.size) {
			return false;
		}
		const node = new Node(el);
		let cur, prev;
		cur = this.head;
		if (index === 0) {
			node.next = head;
			this.head = node;
		}
		else {
			cur = this.head;
			for (let i = 1; i < index; i++) {
				prev = cur;
				cur = cur.next;
			}
			node.next = cur;
			prev.next = node;
		}
		this.size++;
	}

	// Removes an element from the specified location
	removeFrom(index) {
		if (index > 0 && index > this.size) {
			return -1;
		}
		let cur, prev;
		cur = this.head;
		prev = cur;
		if (index === 0) {
			this.head = cur.next;
		} else {
			for (let i = 1; i < index; i++) {
				prev = cur;
				cur = cur.next;
			}
			// Remove the element
			prev.next = cur.next;
		}
		this.size--;
		return curr.el;
	}

	removeElement(el) {
		let cur = this.head;
		let prev = null;
		while (cur != null) {
			if (current.element === el) {
				if (prev == null) {
					this.head = cur.next;
				}
				else {
					prev.next = cur.next;
				}
				this.size--;
				return cur.element;
			}
			prev = cur;
			cur = cur.next;
		}
		return -1;
	}

	indexOf(el) {
        let count = 0;
        let cur = this.head;
        while (cur != null) {
            if (cur.element === el) {
                return count;
            }
            count++;
            cur = cur.next;
        }
        return -1;
    }
    
    isEmpty() {
        return this.size === 0;
    }

    sizeOfList() {
        return this.size;
    }

    printList() {
        let cur = this.head;
        let str = '';
        while (cur) {
			if (this.firstElf === cur) {
				str += `(${cur.element}) `
			} 
			else if (this.secondElf === cur) {
				str += `[${cur.element}] `
			}
			else {
				str += cur.element + ' ';
			}
            cur = cur.next;
        }
        return str;
    }
}

// --- Circular LinkedList ----------

// For Day 9 - Marble Game
class CircularListNode {
    constructor(el) {
        this.element = el;
        this.prev = null;
		this.next = null;
	}
}

class CircularLinkedList {
	constructor() {
		this.current = null;
		this.size = 0;
	}

    // Adds an element @loc nodes away from current
    // @el becomes the new this.current
	add(el, loc) {
		const node = new CircularListNode(el);
		// If the list is empty
		if (this.size === 0) {
            this.current = node;
            node.prev = node;
            node.next = node;
		} 
		else {
            if (loc < 0) {
                for (let up = 0; up > loc; up--) {
                    this.current = this.current.prev;
                }
            }
            if (loc > 0) {
                for (let down = 0; down < loc; down++) {
                    this.current = this.current.next;
                }
            }
            node.prev = this.current.prev;
			node.next = this.current;
			this.current.prev.next = node;
			this.current.prev = node;
            this.current = node;
		}
		this.size++;
	}

	// Removes an element from the specified location
	removeFromLoc(loc) {
		if (this.size === 0) {
			return -1;
        }
        if (loc < 0) {
            for (let up = 0; up > loc; up--) {
                this.current = this.current.prev;
            }
        }
        if (loc > 0) {
            for (let down = 0; down < loc; down++) {
                this.current = this.current.next;
            }
        }
        const removed = this.current.element;
        this.current.prev.next = this.current.next;
        this.current.next.prev = this.current.prev;
        this.current = this.current.next;
        return removed;
	}
	
	getCurrentEl() {
		return this.current.element;
	}
	
    isEmpty() {
        return this.size === 0;
    }

    sizeOfList() {
        return this.size;
    }

    printList() {
        let cur = this.current;
        let str = '';
        for (let i = 0; i < this.size; i++) {
            str += cur.element + ' ';
            cur = cur.next;
        }
        return str;
    }
}

// ---- Tree -----------

// For Day 8
class TreeNode {
	constructor(numChildren, numMetadata, parent) {
		this.parent = parent;
		this.numChildren = numChildren;
		this.numMetadata = numMetadata;
		this.children = [];
		this.metadata = [];
	}
	hasAllChildren() {
		return this.children.length === this.numChildren;
	}
	isComplete() {
		return this.hasAllChildren() && 
			this.metadata.length === this.numMetadata;
	}
	getParent() {
		return this.parent;
	}
	getValue() {
		if (this.numChildren === 0) {
			return this.metadata.reduce((prev, cur) => prev + cur, 0);
		}
		return this.metadata.map(index => {
			if (index > 0 && index <= this.children.length) {
				return this.children[index - 1].getValue();
			}
			return 0;
		}).reduce((prev, cur) => prev + cur, 0);
	}
}

class Tree {
	// Creates a tree and its root node
	constructor() {
		this.root = null;
		this.current = null;
		this.sumMetadata = 0;
	}

	addChildNode(numChildren, numMetadata) {
		const child = new TreeNode(numChildren, numMetadata, this.current);
		if (!this.root) {
			this.root = child;
		}
		else {
			this.current.children.push(child);
		}
		this.current = child;
	}

	addMetadata(metadata) {
		this.current.metadata.push(metadata);
		this.sumMetadata += metadata;
	}

	getTotalMetadata() {
		return this.sumMetadata;
	}

	getCurrent() {
		return this.current;
	}

	setCurrent(node) {
		this.current = node;
	}

	getValue() {
		return this.root.getValue();
	}
}
