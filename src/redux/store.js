// import { applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos/todoReducer.js';

//const store = createStore(rootReducer, applyMiddleware(thunk));

// create redux store
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
