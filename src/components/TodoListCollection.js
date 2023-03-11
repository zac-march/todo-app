class TodoListCollection {
  constructor() {
    this.collection = [];
  }

  addList(item) {
    this.collection.push(item);
  }

  removeList(index) {
    this.collection.splice(index, 1);
  }
}

export { TodoListCollection };
