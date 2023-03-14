import { generateRandomTodoList } from "../generateRandomTodoList";
import { Todo } from "./Todo";
import completeIcon from "../images/complete.svg";
import incompleteIcon from "../images/incomplete.svg";

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
    const todoCreateContainer = document.createElement("div");
    const form = document.createElement("Form");
    const formTop = document.createElement("div");
    const formBottom = document.createElement("div");
    const todoAddBtn = document.createElement("button");
    const titleInput = document.createElement("input");
    const descriptionInput = document.createElement("textarea");
    const dateContainer = document.createElement("div");
    const dateLbl = document.createElement("label");
    const dateInput = document.createElement("input");

    dateInput.type = "date";
    todoAddBtn.type = "button";
    dateLbl.textContent = "Due date:";
    todoAddBtn.textContent = "+ ADD";
    descriptionInput.placeholder = "Add a description";
    titleInput.placeholder = "Add new todo";
    dateContainer.id = "todo-create-date";

    titleInput.id = "todo-create-form-title-input";
    todoCreateContainer.classList.add("todo-create");
    form.classList.add("todo-create-form");
    formTop.classList.add("todo-create-form-top");
    formBottom.classList.add("todo-create-form-bottom");

    todoAddBtn.addEventListener("click", createTodo);
    todoCreateContainer.addEventListener("click", activateForm);
    todoComponent.addEventListener("click", queryIsFormFocused);

    todoCreateContainer.appendChild(form);
    form.appendChild(formTop);
    form.appendChild(formBottom);
    formTop.appendChild(todoAddBtn);
    formTop.appendChild(titleInput);
    formBottom.appendChild(descriptionInput);
    formBottom.appendChild(dateContainer);
    dateContainer.appendChild(dateLbl);
    dateContainer.appendChild(dateInput);

    function activateForm() {
      formBottom.style.height = "3rem";
      todoCreateContainer.style.paddingBottom = ".5rem";
    }

    function deactivateForm() {
      formBottom.style.height = "0";
      todoCreateContainer.style.paddingBottom = "0";
    }

    function queryIsFormFocused() {
      if (
        titleInput === document.activeElement ||
        dateInput === document.activeElement ||
        descriptionInput === document.activeElement
      ) {
        activateForm();
      } else {
        deactivateForm();
      }
    }

    function createTodo() {
      if (titleInput.value != "") {
        todoList.add(new Todo(titleInput.value));
        updateScreen();
      }
      descriptionInput.value = "";
      dateInput.value = "";
      titleInput.value = "";
    }
    todoComponent.appendChild(todoCreateContainer);
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
      <button></button>
      <div class="todo-header">
        <p class="todo-title">${title}</p>
        <p class="todo-description">${isComplete ? "" : description}</p>
      </div>
      <p class="todo-date">${isComplete ? "" : dueDate}</p>
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
        addCompleteIcon(completeBtn, todo);

        completeBtn.addEventListener("click", toggleComplete);

        if (todo.isComplete) {
          completedTodosDiv.appendChild(todoDiv);
        } else {
          incompleteTodosDiv.appendChild(todoDiv);
        }
      }
      todoListDiv.appendChild(incompleteTodosDiv);
      todoListDiv.appendChild(completedTodosDiv);

      function addCompleteIcon(button, todo) {
        if (todo.isComplete) {
          button.style.backgroundImage = `url(${completeIcon})`;
        } else {
          button.style.backgroundImage = `url(${incompleteIcon})`;
        }
      }
    }
    renderTodoDivs();
  }
  updateScreen();
}
export { TodoListScreenController };
