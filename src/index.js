import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";
import { TodoListCollection } from "./components/TodoListCollection";
import { TodoListCollectionScreenController } from "./components/TodoListCollectionScreenController";
import "./style.css";

const todoCollection = getCollectionFromStorage();

TodoListCollectionScreenController(todoCollection);

function getCollectionFromStorage() {
  let todoCollection;
  if (
    sessionStorage.getItem("collection") === "null" ||
    sessionStorage.getItem("collection") === null ||
    !storageAvailable("sessionStorage")
  ) {
    todoCollection = new TodoListCollection();
    todoCollection.addDemoList();
  } else {
    todoCollection = JSON.parse(sessionStorage.getItem("collection"));
    Object.setPrototypeOf(todoCollection, new TodoListCollection());
    for (let todoList of todoCollection.collection) {
      Object.setPrototypeOf(todoList, new TodoList());
      for (let todo of todoList.items) {
        Object.setPrototypeOf(todo, new Todo());
      }
    }
  }
  return todoCollection;
}

function wipeStorage() {
  sessionStorage.setItem("collection", null);
}

function storageAvailable(type) {
  // Function plucked from the Web Storage API docs
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
