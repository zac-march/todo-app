class TodoList {
  constructor(name) {
    this.items = [];
    this.name = name;
  }

  add(item) {
    this.items.push(item);
  }

  remove(index) {
    this.items.splice(index, 1);
  }

  get(index) {
    return this.items[index];
  }
}

export { TodoList };
