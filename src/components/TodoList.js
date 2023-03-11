class TodoList {
  constructor(name) {
    this.items = [];
    this.name = name;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }
}

export { TodoList };
