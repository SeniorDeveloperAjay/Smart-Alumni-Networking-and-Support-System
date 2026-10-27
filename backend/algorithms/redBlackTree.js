
class Node {
    constructor(key, value = null, color = 'RED') {
        this.key = key;
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.NIL = new Node(null, null, 'BLACK');
        this.NIL.left = this.NIL;
        this.NIL.right = this.NIL;
        this.NIL.parent = this.NIL;

        this.root = this.NIL;
        this.size = 0;
    }

    leftRotate(x) {
        const y = x.right;
        x.right = y.left;

        if (y.left !== this.NIL) {
            y.left.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === this.NIL) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    rightRotate(y) {
        const x = y.left;
        y.left = x.right;

        if (x.right !== this.NIL) {
            x.right.parent = y;
        }

        x.parent = y.parent;

        if (y.parent === this.NIL) {
            this.root = x;
        } else if (y === y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }

        x.right = y;
        y.parent = x;
    }

    insert(key, value = null) {
        if (typeof key !== 'number' || !Number.isFinite(key)) {
            throw new TypeError('Key must be a finite number.');
        }

        let parent = this.NIL;
        let current = this.root;

        while (current !== this.NIL) {
            parent = current;

            if (key === current.key) {
                current.value = value;
                return;
            }

            current = key < current.key
                ? current.left
                : current.right;
        }

        const node = new Node(key, value);
        node.left = this.NIL;
        node.right = this.NIL;
        node.parent = parent;

        if (parent === this.NIL) {
            this.root = node;
        } else if (key < parent.key) {
            parent.left = node;
        } else {
            parent.right = node;
        }

        this.size++;
        this.fixInsert(node);
    }

    fixInsert(node) {
        while (node.parent.color === 'RED') {
            if (node.parent === node.parent.parent.left) {
                const uncle = node.parent.parent.right;

                if (uncle.color === 'RED') {
                    node.parent.color = 'BLACK';
                    uncle.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.leftRotate(node);
                    }

                    node.parent.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    this.rightRotate(node.parent.parent);
                }
            } else {
                const uncle = node.parent.parent.left;

                if (uncle.color === 'RED') {
                    node.parent.color = 'BLACK';
                    uncle.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rightRotate(node);
                    }

                    node.parent.color = 'BLACK';
                    node.parent.parent.color = 'RED';
                    this.leftRotate(node.parent.parent);
                }
            }
        }

        this.root.color = 'BLACK';
        this.root.parent = this.NIL;
    }

    search(key) {
        let current = this.root;

        while (current !== this.NIL) {
            if (key === current.key) {
                return current.value;
            }

            current = key < current.key
                ? current.left
                : current.right;
        }

        return null;
    }

    inOrder() {
        const results = [];

        const traverse = (node) => {
            if (node === this.NIL) return;

            traverse(node.left);
            results.push({
                key: node.key,
                value: node.value,
                color: node.color
            });
            traverse(node.right);
        };

        traverse(this.root);
        return results;
    }

    getSize() {
        return this.size;
    }
}

module.exports = RedBlackTree;

