import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './rtk-fetch';
import posttwoReducer from './trk-fetchTwo';
import todosReducer from './todo.js';
import filterReducer from './filter.js';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    posts: postsReducer,
    postTwo: posttwoReducer,
  },
});

export default store;
