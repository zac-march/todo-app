import { generateRandomTodoList } from "../generateRandomTodoList";
function TodoListScreenController() {
  const todoList = generateRandomTodoList();
  const body = document.querySelector("body");

  function updateScreen() {
    body.innerHTML = "";
    displayTodoListTitle();
    displayTodos();
  }

  function displayTodoListTitle() {
    const todoListTitleContainer = document.createElement("div");
    const todoListTitle = document.createElement("h1");
    todoListTitle.textContent = todoList.name;
    todoListTitleContainer.appendChild(todoListTitle);
    body.appendChild(todoListTitleContainer);
  }

  function displayTodos() {
    for (let todo of todoList.items) {
      const todoContainer = document.createElement("div");

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
      body.appendChild(todoContainer);
    }
  }

  updateScreen();
}
export { TodoListScreenController };
