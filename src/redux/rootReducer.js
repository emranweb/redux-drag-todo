import { combineReducers } from 'redux';
import todosReducer from './todos/todoReducer';
import filterReducer from './filter/filterReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
});

export default rootReducer;
