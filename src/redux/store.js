import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";

const asyncOperation = (store) => (next) => (action) => {
  if (action.type === "todo/colorselect") {
    setTimeout(() => {
      console.log("wait 2sec");
    }, 2000);

    return;
  }

  return next(action);
};

const fetchTodo = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(asyncOperation, fetchTodo)
);

export default store;
