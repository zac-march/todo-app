import { formatDistance } from "date-fns";
import { format } from "date-fns";
import { add } from "date-fns";
import { isBefore } from "date-fns";

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

  getDateDistance() {
    const currentDate = new Date();
    const dueDateAsDate = new Date(this.dueDate);
    const isDueDateBefore = isBefore(currentDate, dueDateAsDate);

    if (this.dueDate != "" && isDueDateBefore) {
      return formatDistance(currentDate, dueDateAsDate);
    } else if (this.dueDate != "" && !isDueDateBefore) {
      return "Overdue";
    } else {
      return this.dueDate;
    }
  }

  setTitle(title) {
    this.title = title;
  }

  static createRandom() {
    const title = `Todo ${Math.floor(Math.random() * 100)}`;
    const description = `Description for ${title}`;
    const startDate = new Date();
    const randDays = Math.floor(Math.random() * (31 - 1) + 1);
    const newDate = add(startDate, { days: randDays });
    const dueDate = format(newDate, "yyyy-MM-dd");
    const isComplete = Math.random() < 0.5;
    return new Todo(title, description, dueDate, isComplete);
  }
}

export { Todo };
