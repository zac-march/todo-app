import { todoFactory } from "./components/todo";

const todoItem = todoFactory(
  "Go shopping",
  "buy bananas!",
  "Today",
  "Important",
  false
);

function component() {
  const element = document.createElement("div");

  element.innerHTML = todoItem.title;

  return element;
}

document.body.appendChild(component());
