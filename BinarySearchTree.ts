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

  constructor() {
    this.root = null;
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
    if(node === null || node.data === data) {
      return node;
    }

    if(data < node.data) {
      return this.searchNode(node.left, data);
    }
    else {
      return this.searchNode(node.right, data);
    }
  }

  remove(data: number) : void {
    this.removeNode(this.root, data);
    // let findNode = this.search(data);
    
    // if(findNode) {
    //   if(findNode?.left === null && findNode.right === null) { 
    //     findNode = null;
    //     return findNode;
    //   } else {
  
    //     if(findNode?.right !== null) {
    //       let aux = findNode.left
    //       findNode = findNode?.right;
    //       findNode.left = aux;
    //       //console.log('aaaaa', findNode);

    //       return findNode;
          
    //     } else if (findNode?.left !== null && findNode.right === null) {
    //       findNode = findNode.left;
    //       //console.log('bbbb', findNode);

    //       return findNode;
    //     } 
    //   }
    // }
    // return null; 
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


const searchNumber = tree.search(9);
const removeNumber = tree.remove(10);
// console.log(searchNumber);
//console.log(removeNumber);

const a = tree.traverseTree(tree.root);