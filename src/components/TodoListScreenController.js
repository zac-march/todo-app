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

    const todoCreateDiv = generateTodoCreateDiv();
    todoListTitle.textContent = todoList.name;
    todoListHeaderDiv.appendChild(todoListTitle);
    todoListHeaderDiv.appendChild(todoCreateDiv);
    body.appendChild(todoListHeaderDiv);

    function generateTodoCreateDiv() {
      const todoCreateDiv = document.createElement("div");
      const todoCreateBtn = document.createElement("button");
      const todoCreateInput = document.createElement("input");

      todoCreateBtn.textContent = "+ ADD";
      todoCreateBtn.classList.add("add-todo-btn");
      todoCreateInput.placeholder = "Add new todo";

      todoCreateDiv.appendChild(todoCreateBtn);
      todoCreateDiv.appendChild(todoCreateInput);
      todoCreateBtn.addEventListener("click", () => {
        if (todoCreateInput.value != "") {
          todoList.add(new Todo(todoCreateInput.value));
          updateScreen();
        }
      });
      return todoCreateDiv;
    }
  }

  function displayTodos() {
    for (const [index, todo] of todoList.items.entries()) {
      const todoContainer = document.createElement("div");
      todoContainer.dataset.index = index;

      const { title, description, dueDate, isPriority, isComplete } = todo;
      const priorityClass = isPriority ? "priority" : "";
      const completeClass = isComplete ? "complete" : "incomplete";

      if (isPriority) {
        todoContainer.classList.add("priority");
      }
      todoContainer.classList.add(completeClass);
      todoContainer.innerHTML = `
        <div class="todo-header">
          <p class="todo-title">${title}</p>
          <p class="todo-description">${description}</p>
        </div>
        <p class="due-date">${dueDate}</p>
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
