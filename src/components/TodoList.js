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

  sortByDate() {
    this.items.sort(function (a, b) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }
}

export { TodoList };
