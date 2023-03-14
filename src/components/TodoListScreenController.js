import { generateRandomTodoList } from "../generateRandomTodoList";
import { Todo } from "./Todo";
import completeIcon from "../images/complete.svg";
import incompleteIcon from "../images/incomplete.svg";
import editIcon from "../images/edit.svg";

function TodoListScreenController() {
  const body = document.querySelector("body");
  const todoComponent = document.createElement("div");
  todoComponent.classList.add("todo-component");
  todoComponent.textContent = "bro";
  body.appendChild(todoComponent);
  const todoListDiv = document.createElement("div");
  todoListDiv.classList.add("todo-lists");
  const todoList = generateRandomTodoList();

  function renderEditModal() {
    const modalContainer = document.createElement("div");
    const modalContent = document.createElement("div");
    const formTop = document.createElement("div");
    const formBottom = document.createElement("div");

    const deleteButton = document.createElement("button");

    const saveButton = document.createElement("button");
    const titleInput = document.createElement("input");

    const descriptionInput = document.createElement("textarea");
    const dateContainer = document.createElement("div");
    const dateLbl = document.createElement("label");
    const dateInput = document.createElement("input");

    dateInput.type = "date";
    dateLbl.textContent = "Due date:";
    saveButton.textContent = "SAVE";
    descriptionInput.placeholder = "Add a description";
    dateContainer.id = "todo-create-date";
    deleteButton.textContent = "DELETE";

    deleteButton.classList.add("edit-modal-delete");
    modalContainer.classList.add("edit-modal");
    modalContent.classList.add("edit-modal-content");
    formTop.classList.add("edit-modal-top");
    formBottom.classList.add("edit-modal-bottom");

    formTop.append(saveButton, titleInput);
    formBottom.append(descriptionInput, dateContainer);
    dateContainer.append(dateLbl, dateInput);

    modalContent.append(formTop, formBottom, deleteButton);
    modalContainer.appendChild(modalContent);
    todoComponent.appendChild(modalContainer);

    window.onclick = function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    };
  }

  function updateScreen() {
    todoComponent.innerHTML = "";
    renderEditModal();
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
    form.append(formTop, formBottom);
    formTop.append(todoAddBtn, titleInput);
    formBottom.append(descriptionInput, dateContainer);
    dateContainer.append(dateLbl, dateInput);

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

      return todoDiv;
    }

    function toggleComplete(e) {
      e.stopPropagation();
      const indexOfTodo = e.target.parentElement.dataset.index;
      todoList.get(indexOfTodo).toggleComplete();
      updateTodoList();
    }

    function editTodo(todo, index) {
      console.log(todo);
      const editModal = document.querySelector(".edit-modal");
      editModal.style.display = "block";

      const title = document.querySelector(".edit-modal-top input");
      title.value = todo.title;

      const dueDate = document.querySelector(".edit-modal-bottom input");
      // dueDate.value = todo.dueDate;

      const description = document.querySelector(".edit-modal-bottom textarea");
      description.value = todo.description;

      const saveButton = document.querySelector(".edit-modal-top button");
      saveButton.addEventListener("click", () => {
        todo.setTitle(title.value);
        todo.setDescription(description.value);
        todo.setDueDate(dueDate.value);
        resetEditModal();
        updateScreen();
      });

      const deleteButton = document.querySelector(
        ".edit-modal-content > button"
      );
      deleteButton.addEventListener("click", () => {
        todoList.remove(index);
        resetEditModal();
        updateScreen();
      });

      function resetEditModal() {
        title.value = "";
        description.value = "";
        dueDate.value = "";
      }
    }

    function renderTodoDivs() {
      for (const [index, todo] of todoList.items.entries()) {
        const todoElement = createTodoItemElement(todo, index);

        renderTodoButtons(todoElement, todo);

        if (todo.isComplete) {
          completedTodosDiv.appendChild(todoElement);
        } else {
          incompleteTodosDiv.appendChild(todoElement);
          todoElement.addEventListener("click", function () {
            editTodo(todo, index);
          });
        }
      }
      todoListDiv.appendChild(incompleteTodosDiv);
      todoListDiv.appendChild(completedTodosDiv);

      function renderTodoButtons(todoElement, todo) {
        const completeBtn = todoElement.querySelector("button:first-of-type");
        addCompleteIcon(completeBtn, todo);

        completeBtn.addEventListener("click", toggleComplete);
      }

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
