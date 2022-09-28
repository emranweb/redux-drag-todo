import { combineReducers } from "redux";
import todoReducer from "./todos/todoReducer";
import filterReducer from "./filter/filterReducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  filter: filterReducer,
});

export default rootReducer;
