import { todoFactory } from "./components/todoFactory";
import { TodoList } from "./components/TodoList";
import { TodoListCollection } from "./components/TodoListCollection";

const todoItem1 = todoFactory("Study", "Programming", "Yesterday", "", false);

const todoItem2 = todoFactory(
  "Go shopping",
  "buy bananas!",
  "Today",
  "Important",
  false
);

const todoItem3 = todoFactory("Soccer practice", "", "Tomorrow", "", false);

const list = new TodoList();
list.addItem(todoItem1);
list.addItem(todoItem2);
list.addItem(todoItem3);

const todoListCollection = new TodoListCollection();
todoListCollection.addList(list);
console.log("🚀 ~ file: index.js:24 ~ todoListCollection:", todoListCollection);

function component() {
  const element = document.createElement("div");

  return element;
}
console.log("🚀 ~ file: index.js:24 ~ component ~ list:", list);
list.removeItem(1);
console.log("🚀 ~ file: index.js:24 ~ component ~ list:", list);

document.body.appendChild(component());
