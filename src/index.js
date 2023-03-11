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
const todoList = new TodoList();
todoList.addItem(todoItem1);
todoList.addItem(todoItem2);
todoList.addItem(todoItem3);

const body = document.querySelector("body");

function updateScreen() {
  body.innerHTML = "";
  for (let todo of todoList.items) {
    const todoContainer = document.createElement("div");
    for (let property of Object.entries(todo)) {
      const textContainer = document.createElement("p");
      textContainer.textContent = property[1];
      todoContainer.appendChild(textContainer);
    }
    body.appendChild(todoContainer);
    todoContainer.style.border = "1px solid black";
  }
}
updateScreen();

// const todoListCollection = new TodoListCollection();
// todoListCollection.addList(list);
// console.log("🚀 ~ file: index.js:24 ~ todoListCollection:", todoListCollection);

// function component() {
//   const element = document.createElement("div");

//   return element;
// }
// console.log("🚀 ~ file: index.js:24 ~ component ~ list:", list);
// list.removeItem(1);
// console.log("🚀 ~ file: index.js:24 ~ component ~ list:", list);

// document.body.appendChild(component());
