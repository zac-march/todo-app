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
    const incompleteTodosDiv = document.createElement("div");
    const completedTodosDiv = document.createElement("div");
    incompleteTodosDiv.classList.add("incomplete-todo-list");
    completedTodosDiv.classList.add("completed-todo-list");
    for (const [index, todo] of todoList.items.entries()) {
      const todoDiv = document.createElement("div");
      todoDiv.dataset.index = index;

      const { title, description, dueDate, isPriority, isComplete } = todo;
      const completeClass = isComplete ? "complete" : "incomplete";
      const completeBtnText = isComplete ? "✓" : "O";
      if (isPriority) {
        todoDiv.classList.add("priority");
      }
      todoDiv.classList.add(completeClass);
      todoDiv.innerHTML += `
        <button>${completeBtnText}</button>
        <div class="todo-header">
          <p class="todo-title">${title}</p>
          <p class="todo-description">${description}</p>
        </div>
        <p class="due-date">${dueDate}</p>
      `;
      todoDiv.classList.add("todo");

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.addEventListener("click", (e) => {
        const indexOfTodo = e.target.parentElement.dataset.index;
        todoList.remove(indexOfTodo);
        updateScreen();
      });
      todoDiv.appendChild(removeBtn);
      if (isComplete) {
        completedTodosDiv.appendChild(todoDiv);
      } else {
        incompleteTodosDiv.appendChild(todoDiv);
      }
    }
    body.appendChild(incompleteTodosDiv);
    body.appendChild(completedTodosDiv);
  }
  updateScreen();
}
export { TodoListScreenController };
