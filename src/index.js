import { TodoListCollection } from "./components/TodoListCollection";
import { TodoListCollectionScreenController } from "./components/TodoListCollectionScreenController";
import "./style.css";

const todoCollection = new TodoListCollection();
todoCollection.addDemoList();

TodoListCollectionScreenController(todoCollection);
