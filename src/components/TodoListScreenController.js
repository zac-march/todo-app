import { generateRandomTodoList } from "../generateRandomTodoList";
import { Todo } from "./Todo";

function TodoListScreenController() {
  const todoList = generateRandomTodoList();
  const body = document.querySelector("body");

  function updateScreen() {
    body.innerHTML = "";
    renderHeader();
    renderLists();
  }

  function renderHeader() {
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

  function renderLists() {
    const incompleteTodosDiv = document.createElement("div");
    const completedTodosDiv = document.createElement("div");
    incompleteTodosDiv.classList.add("incomplete-todo-list");
    completedTodosDiv.classList.add("completed-todo-list");

    function createTodoItemElement(todo, index) {
      const { title, description, dueDate, isPriority, isComplete } = todo;

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      todoDiv.dataset.index = index;

      const completeClass = isComplete ? "complete" : "incomplete";
      todoDiv.classList.add(completeClass);
      if (isPriority) {
        todoDiv.classList.add("priority");
      }

      todoDiv.innerHTML = `
      <button>${isComplete ? "✓" : "O"}</button>
      <div class="todo-header">
        <p class="todo-title">${title}</p>
        <p class="todo-description">${description}</p>
      </div>
      <p class="due-date">${dueDate}</p>
      <button>X</button>
    `;

      if (isComplete) {
        completedTodosDiv.appendChild(todoDiv);
      } else {
        incompleteTodosDiv.appendChild(todoDiv);
      }

      return todoDiv;
    }

    function toggleComplete(e) {
      const indexOfTodo = e.target.parentElement.dataset.index;
      todoList.get(indexOfTodo).toggleComplete();
      updateScreen();
    }

    function removeTodoItem(e) {
      const indexOfTodo = e.target.parentElement.dataset.index;
      todoList.remove(indexOfTodo);
      updateScreen();
    }

    for (const [index, todo] of todoList.items.entries()) {
      const todoDiv = createTodoItemElement(todo, index);

      const completeBtn = todoDiv.querySelector("button:first-of-type");
      const removeBtn = todoDiv.querySelector("button:last-of-type");

      completeBtn.addEventListener("click", toggleComplete);
      removeBtn.addEventListener("click", removeTodoItem);

      if (todo.isComplete) {
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
