import { createStore } from "redux";
import todoReducer from "./todos/todoReducer";

const store = createStore(todoReducer);

export default store;
