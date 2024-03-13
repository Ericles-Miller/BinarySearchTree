class NodeTree {
  data: number;
  left: NodeTree | null;
  right: NodeTree | null;

  constructor(data: number) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  root: NodeTree | null;
  listPath : number[];
  constructor() {
    this.root = null;
    this.listPath = [];
  }

  insert(data: number): void {
    const newNode = new NodeTree(data);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: NodeTree, newNode: NodeTree): void {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  traverseTree(node: NodeTree | null ): void {
    if (node !== null) {
      console.log(node.left);
      console.log(node.right);
    }
  }

  search(data: number) : NodeTree | null {
    return this.searchNode(this.root, data);
  }
  
  private searchNode(node: NodeTree | null, data: number) : NodeTree | null {
    if(node === null || node.data === data ) {  
      return node;
    }

    if(data < node.data) {
      return this.searchNode(node.left, data);;
    }
    else  
      return this.searchNode(node.right, data);
    }

  remove(data: number) : void {
    this.removeNode(this.root, data); 
  }

  private removeNode(node: NodeTree | null, data: number): NodeTree | null {
    if (node === null) {
      return null;
    }
  
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } 
    else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    }
    else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
  
      const minRightNode = this.findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this.removeNode(node.right, minRightNode.data);
      return node;
    }
  }
  
  private findMinNode(node: NodeTree): NodeTree {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  inOrderTraversal(callback: (data: number) => void): void {
    this.inOrderTraversalNode(this.root, callback);
  }

  private inOrderTraversalNode(node: NodeTree | null, callback: (data: number) => void): void {
    if (node !== null) {
      this.inOrderTraversalNode(node.left, callback);
      callback(node.data);
      this.inOrderTraversalNode(node.right, callback);
    }
  }

  treeHeight(node : NodeTree | null) : number {
    if(node === null) {
      return -1;
    }

    const leftHeight = this.treeHeight(node.left);
    const rightHeight = this.treeHeight(node.right);

    return +1 + Math.max(leftHeight, rightHeight);
  }

  pathToNode(node: NodeTree | null , data: number) : NodeTree[] | null {
   if (node === null) {
    console.log(this.listPath);
    return null;
   }

   if(data < node.data) {
    this.listPath.unshift(node.data);

    return this.pathToNode(node.left, data);
   } else {
    this.listPath.unshift(node.data);
    return this.pathToNode(node.right, data);
   }

  }

}


const tree = new BinaryTree();
tree.insert(8);
tree.insert(3);
tree.insert(10);
tree.insert(1);
tree.insert(6);
tree.insert(9);
tree.insert(8);
tree.insert(14);
tree.insert(13);


const searchNumber = tree.search(9);
//const removeNumber = tree.remove(10);
console.log(searchNumber);
console.log("----------------------------------------------------");

const result: number[] = [];
tree.inOrderTraversal((data) => {
  result.push(data);
});
console.log(result);

console.log("--------------------------");
const height = tree.treeHeight(tree.root);
console.log(height);

console.log("--------------------------");
const a = tree.traverseTree(tree.root);

console.log("-------------------------"); 

const pathNode = tree.pathToNode(tree.root, 9)
