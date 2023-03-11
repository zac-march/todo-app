class TodoList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }
}

export { TodoList };
