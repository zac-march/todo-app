import { TodoListScreenController } from "./TodoListScreenController";
import addIcon from "../images/add.svg";

function TodoListCollectionScreenController(todoCollection) {
  const body = document.querySelector("body");
  const collectionComponent = document.createElement("div");
  collectionComponent.id = "collection-component";
  const todoComponent = document.createElement("div");
  todoComponent.id = "todo-list-component";
  body.append(collectionComponent);
  body.append(todoComponent);

  updateController();

  function updateController() {
    collectionComponent.innerHTML = "";
    renderMenuToggle();
    renderCollectionMenu();
    renderOverlay();
  }

  function renderOverlay() {
    const menuOverlay = document.createElement("div");
    menuOverlay.classList.add("menu-overlay");
    collectionComponent.append(menuOverlay);
    menuOverlay.addEventListener("click", () => {
      const menuToggle = document.querySelector(
        "#collection-component > input"
      );
      menuToggle.checked = false;
    });
  }

  function renderMenuToggle() {
    const menuToggle = document.createElement("input");
    menuToggle.type = "checkbox";
    collectionComponent.appendChild(menuToggle);
  }

  function renderCollectionMenu() {
    const collectionMenu = document.createElement("div");
    const collectionListContainer = document.createElement("div");
    collectionMenu.classList.add("collection-menu");
    renderHeader();
    renderHamburger();
    renderCollectionListAdd();
    renderCollectionList(collectionListContainer);

    function renderHamburger() {
      for (let i = 0; i < 3; i++) {
        const span = document.createElement("span");
        collectionComponent.appendChild(span);
      }
    }

    function renderCollectionListAdd() {
      const collectionListAdd = document.createElement("div");
      const addButton = document.createElement("button");
      const addInput = document.createElement("input");

      addButton.style.backgroundImage = `url(${addIcon})`;
      addInput.maxLength = 20;
      collectionListAdd.classList.add("collection-list-add");
      collectionListAdd.append(addButton, addInput);
      collectionMenu.append(collectionListAdd);

      addButton.addEventListener("click", (e) => {
        if (addInput.value != "") {
          todoCollection.addTodoList(addInput.value);
        }
        addInput.value = "";
        renderCollectionList(collectionListContainer);
      });
      collectionComponent.appendChild(collectionMenu);
    }
    function renderHeader() {
      const title = document.createElement("h2");
      title.textContent = "Classes";
      collectionMenu.append(title);
    }
    function renderCollectionList(collectionListContainer) {
      collectionListContainer.innerHTML = "";
      collectionListContainer.classList.add("collection-list-container");

      for (let i = 0; i < todoCollection.collection.length; i++) {
        const collectionItem = document.createElement("div");
        const openButton = document.createElement("button");

        openButton.textContent = todoCollection.collection[i].name;

        collectionItem.append(openButton);
        collectionListContainer.appendChild(collectionItem);

        openButton.addEventListener("click", () => {
          const menuToggle = document.querySelector(
            "#collection-component > input"
          );
          menuToggle.checked = false;
          TodoListScreenController(todoCollection.collection[i]);
        });
      }
      collectionMenu.append(collectionListContainer);
    }
  }
}

export { TodoListCollectionScreenController };
