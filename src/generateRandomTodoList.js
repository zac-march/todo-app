import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";

function generateRandomTodoList() {
  const todoList = new TodoList("Random Todo List");

  for (let i = 1; i <= 10; i++) {
    todoList.add(Todo.createRandom());
  }

  return todoList;
}

export { generateRandomTodoList };
