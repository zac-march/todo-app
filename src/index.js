import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";
import { TodoListCollection } from "./components/TodoListCollection";
import { TodoListCollectionScreenController } from "./components/TodoListCollectionScreenController";
import "./style.css";

let todoCollection;
if (localStorage.getItem("collection") === "null") {
  todoCollection = new TodoListCollection();
  todoCollection.addDemoList();
} else {
  let todoListCollectionProto = new TodoListCollection();
  let todoListProto = new TodoList();
  let todoProto = new Todo();
  todoCollection = JSON.parse(localStorage.getItem("collection"));
  Object.setPrototypeOf(todoCollection, todoListCollectionProto);
  for (let todoList of todoCollection.collection) {
    Object.setPrototypeOf(todoList, todoListProto);
    for (let todo of todoList.items) {
      Object.setPrototypeOf(todo, todoProto);
    }
  }
}

TodoListCollectionScreenController(todoCollection);
