class Todo {
  constructor(title, description = "", dueDate = "", isComplete = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isComplete = isComplete;
  }

  toggleComplete() {
    this.isComplete ? (this.isComplete = false) : (this.isComplete = true);
  }

  setDescription(description) {
    this.description = description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setTitle(title) {
    this.title = title;
  }

  static createRandom() {
    const title = `Todo ${Math.floor(Math.random() * 100)}`;
    const description = `Description for ${title}`;
    const dueDate = "2023-03-23";
    const isPriority = Math.random() < 0.5;
    const isComplete = Math.random() < 0.5;
    return new Todo(title, description, dueDate, isPriority, isComplete);
  }
}

export { Todo };
