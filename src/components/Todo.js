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
    const descriptions = [
      "Build a CRUD application using Node.js and MongoDB",
      "Create a responsive landing page using HTML, CSS, and JavaScript",
      "Implement user authentication and authorization in a web app",
      "Design and develop a RESTful API using Express.js",
      "Develop a chat application using Socket.io",
      "Integrate a third-party API into an existing web app",
      "Optimize the performance of a slow-running database query",
      "Write a script to automate a repetitive task",
      "Implement pagination in a web app that displays large data sets",
      "Build a real-time data visualization dashboard using D3.js",
    ];

    const title = `Assignment ${Math.floor(Math.random() * 20)}`;
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const startDate = new Date();
    const randDays = Math.floor(Math.random() * (31 - -3) + -3);
    const newDate = add(startDate, { days: randDays });
    const dueDate = format(newDate, "yyyy-MM-dd");
    const isComplete = Math.random() < 0.5;
    return new Todo(title, description, dueDate, isComplete);
  }
}

export { Todo };
