import { generateRandomTodoList } from "../generateRandomTodoList";
import { Todo } from "./Todo";
function TodoListScreenController() {
  const todoList = generateRandomTodoList();
  const body = document.querySelector("body");

  function updateScreen() {
    body.innerHTML = "";
    displayTodoListHeader();
    displayTodos();
  }

  function displayTodoListHeader() {
    const todoListHeaderDiv = document.createElement("div");
    const todoListTitle = document.createElement("h1");
    const todoCreateBtn = document.createElement("button");

    todoCreateBtn.textContent = "+ ADD";
    todoCreateBtn.classList.add("add-todo-btn");
    todoListTitle.textContent = todoList.name;

    todoListHeaderDiv.appendChild(todoListTitle);
    todoListHeaderDiv.appendChild(todoCreateBtn);
    body.appendChild(todoListHeaderDiv);

    todoCreateBtn.addEventListener("click", () => {
      const todo = Todo.createRandom();
      todoList.add(todo);
      updateScreen();
    });
  }

  function displayTodos() {
    for (const [index, todo] of todoList.items.entries()) {
      const todoContainer = document.createElement("div");
      todoContainer.dataset.index = index;

      const { title, description, dueDate, isPriority, isComplete } = todo;
      const priorityClass = isPriority ? "priority" : "";
      const completeClass = isComplete ? "complete" : "";

      todoContainer.innerHTML = `
        <p class="title ${priorityClass}">${title}</p>
        <p class="description">${description}</p>
        <p class="due-date">${dueDate}</p>
        <p class="status ${completeClass}">${
        isComplete ? "Completed" : "Incomplete"
      }</p>
      `;
      todoContainer.classList.add("todo");

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.addEventListener("click", (e) => {
        const indexOfTodo = e.target.parentElement.dataset.index;
        todoList.remove(indexOfTodo);
        updateScreen();
      });
      todoContainer.appendChild(removeBtn);

      body.appendChild(todoContainer);
    }
  }
  updateScreen();
}
export { TodoListScreenController };
