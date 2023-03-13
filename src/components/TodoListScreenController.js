import { generateRandomTodoList } from "../generateRandomTodoList";
import { Todo } from "./Todo";

function TodoListScreenController() {
  const body = document.querySelector("body");
  const todoComponent = document.createElement("div");
  todoComponent.classList.add("todo-component");
  todoComponent.textContent = "bro";
  body.appendChild(todoComponent);
  const todoListDiv = document.createElement("div");
  todoListDiv.classList.add("todo-lists");
  const todoList = generateRandomTodoList();

  function updateScreen() {
    todoComponent.innerHTML = "";
    renderHeader();
    renderTodoCreate();
    updateTodoList();
    todoComponent.appendChild(todoListDiv);
  }

  function updateTodoList() {
    todoListDiv.innerHTML = "";
    renderLists();
  }

  function renderHeader() {
    const todoListHeaderDiv = document.createElement("div");
    const todoListTitle = document.createElement("h1");

    todoListTitle.textContent = todoList.name;
    todoListHeaderDiv.appendChild(todoListTitle);
    todoComponent.appendChild(todoListHeaderDiv);
  }

  function renderTodoCreate() {
    const todoCreateDiv = document.createElement("div");
    const todoCreateForm = document.createElement("Form");
    const todoAddBtn = document.createElement("button");
    const titleInput = document.createElement("input");
    const dateInput = document.createElement("input");
    const descriptionInput = document.createElement("textarea");
    const dateLbl = document.createElement("label");
    const dateDiv = document.createElement("div");
    const formHiddenInputs = document.createElement("div");

    dateLbl.textContent = "Due date:";
    dateInput.type = "date";
    todoAddBtn.textContent = "+ ADD";
    todoAddBtn.classList.add("add-todo-btn");
    descriptionInput.placeholder = "Add a description";
    titleInput.placeholder = "Add new todo";
    todoCreateDiv.classList.add("todo-create");
    dateDiv.id = "todo-create-date";
    todoCreateForm.classList.add("todo-create-form");
    todoAddBtn.addEventListener("click", createTodo);

    todoCreateDiv.appendChild(todoCreateForm);
    todoCreateForm.appendChild(todoAddBtn);
    todoCreateForm.appendChild(titleInput);
    todoCreateForm.appendChild(formHiddenInputs);
    formHiddenInputs.appendChild(descriptionInput);
    formHiddenInputs.appendChild(dateDiv);
    dateDiv.appendChild(dateLbl);
    dateDiv.appendChild(dateInput);

    function createTodo() {
      if (titleInput.value != "") {
        todoList.add(new Todo(titleInput.value));
        updateScreen();
      }
    }
    todoComponent.appendChild(todoCreateDiv);
  }

  function renderLists() {
    const incompleteTodosDiv = document.createElement("div");
    const completedTodosDiv = document.createElement("div");
    incompleteTodosDiv.classList.add("incomplete-todo-list");
    incompleteTodosDiv.classList.add("todo-list");
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
      <p class="todo-date">${dueDate}</p>
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
      updateTodoList();
    }

    function removeTodoItem(e) {
      const indexOfTodo = e.target.parentElement.dataset.index;
      todoList.remove(indexOfTodo);
      updateTodoList();
    }

    function renderTodoDivs() {
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
      todoListDiv.appendChild(incompleteTodosDiv);
      todoListDiv.appendChild(completedTodosDiv);
    }
    renderTodoDivs();
  }
  updateScreen();
}
export { TodoListScreenController };
