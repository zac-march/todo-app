class TodoListCollection {
  constructor() {
    this.collection = [];
  }

  add(item) {
    this.collection.push(item);
  }

  remove(index) {
    this.collection.splice(index, 1);
  }
}

export { TodoListCollection };
