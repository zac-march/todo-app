import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";
import { TodoListCollection } from "./components/TodoListCollection";
import { TodoListCollectionScreenController } from "./components/TodoListCollectionScreenController";
import "./style.css";

const todoCollection = getTodoCollection();

TodoListCollectionScreenController(todoCollection);

function getTodoCollection() {
  let todoCollection;
  if (
    localStorage.getItem("collection") === "null" ||
    !storageAvailable("localStorage")
  ) {
    todoCollection = new TodoListCollection();
    todoCollection.addDemoList();
  } else {
    let test = new TodoListCollection();

    todoCollection = JSON.parse(localStorage.getItem("collection"));
    Object.setPrototypeOf(todoCollection, test);
    for (let todoList of todoCollection.collection) {
      Object.setPrototypeOf(todoList, new TodoList());
      for (let todo of todoList.items) {
        Object.setPrototypeOf(todo, new Todo());
      }
    }
  }
  return todoCollection;
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
