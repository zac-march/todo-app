class TodoListCollection {
  constructor() {
    this.list = [];
  }

  addList(item) {
    this.list.push(item);
  }

  removeList(index) {
    this.list.splice(index, 1);
  }
}

export { TodoListCollection };
