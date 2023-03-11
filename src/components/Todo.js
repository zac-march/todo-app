class Todo {
  constructor(
    title,
    description,
    dueDate,
    isPriority = false,
    isComplete = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isPriority = isPriority;
    this.isComplete = isComplete;
  }

  markAsComplete() {
    this.isComplete = true;
  }

  markAsIncomplete() {
    this.isComplete = false;
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
}

export { Todo };
