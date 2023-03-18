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
    const itemsWithoutDates = [];
    const itemsWithDates = [];
    for (const item of this.items) {
      if (item.dueDate != "") {
        itemsWithDates.push(item);
      } else {
        itemsWithoutDates.push(item);
      }
    }
    itemsWithDates.sort(function (a, b) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    this.items = [];
    this.items.push(...itemsWithDates);
    this.items.push(...itemsWithoutDates);
  }
}

export { TodoList };
