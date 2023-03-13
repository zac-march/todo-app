class Todo {
  constructor(
    title,
    description = "",
    dueDate = "",
    isPriority = false,
    isComplete = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isPriority = isPriority;
    this.isComplete = isComplete;
  }

  toggleComplete() {
    this.isComplete ? (this.isComplete = false) : (this.isComplete = true);
  }

  setPriority(isPriority) {
    this.isPriority = isPriority;
  }

  setDescription(description) {
    this.description = description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  static createRandom() {
    const title = `Todo ${Math.floor(Math.random() * 100)}`;
    const description = `Description for ${title}`;
    const dueDate = "In 5hrs";
    const isPriority = Math.random() < 0.5;
    const isComplete = Math.random() < 0.5;
    return new Todo(title, description, dueDate, isPriority, isComplete);
  }
}

export { Todo };
