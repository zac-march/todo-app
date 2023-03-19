import { TodoList } from "./TodoList";

class TodoListCollection {
  constructor() {
    this.collection = [];
  }

  add(item) {
    this.collection.push(item);
  }

  remove(index) {
    this.collection.splice(index, 1);
  }

  addTodoList(name) {
    const todoList = new TodoList(name);
    this.add(todoList);
  }

  addDemoList() {
    this.add(TodoList.generateDemoList());
  }
}

export { TodoListCollection };
