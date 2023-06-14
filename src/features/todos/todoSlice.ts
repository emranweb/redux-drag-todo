import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../types/index';

type TodosArray = Todo[];

const todos: string | null = localStorage.getItem('todos');
const initialState: TodosArray = JSON.parse(todos || '[]');

// const initialState: string | null = JSON.parse(localStorage.getItem('todos'));

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const data = [...state, action.payload];
      localStorage.setItem('todos', JSON.stringify(data));
      return data;
    },
    todoMarkCompleted: (state, action) => {
      const data: TodosArray = state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(data));
      return data;
    },
    updateTodo: (state, action) => {
      const { title } = action.payload;
      if (title) {
        const data: TodosArray = state.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, edit: !todo.edit, title: action.payload.title };
          }
          return { ...todo, edit: false };
        });
        localStorage.setItem('todos', JSON.stringify(data));
        return data;
      } else {
        const data: TodosArray = state.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, edit: !todo.edit };
          }
          return { ...todo, edit: false };
        });
        localStorage.setItem('todos', JSON.stringify(data));
        return data;
      }
    },
    removeFromTodos: (state, action) => {
      const data = state.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(data));
      return data;
    },
  },
});

export const { addTodo, removeFromTodos, todoMarkCompleted, updateTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
