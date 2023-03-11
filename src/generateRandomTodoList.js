import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";

function generateRandomTodoList() {
  const todoList = new TodoList("Random Todo List");

  for (let i = 1; i <= 5; i++) {
    const title = `Todo ${i}`;
    const description = `This is a random todo item #${i}`;
    const dueDate = new Date(
      Date.now() + Math.floor(Math.random() * 1000000000)
    );
    const isPriority = Math.random() >= 0.5;

    const todo = new Todo(title, description, dueDate, isPriority);
    todoList.addItem(todo);
  }

  return todoList;
}

export { generateRandomTodoList };
