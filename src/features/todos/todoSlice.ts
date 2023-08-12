import { createSlice } from '@reduxjs/toolkit';
import { Todos } from '../../types';

const getLocalStorageTodos: string | null = localStorage.getItem('todos');
const initialState: Todos = JSON.parse(getLocalStorageTodos || '[]');

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
            const data: Todos = state.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                        status: 'complete',
                    };
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(data));
            return data;
        },
        todoMarkInProgess: (state, action) => {
            const data: Todos = state.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: false, status: 'inprogress' };
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(data));
            return data;
        },
        todoMarkBacklog: (state, action) => {
            const data: Todos = state.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: false, status: 'backlog' };
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(data));
            return data;
        },
        updateTodo: (state, action) => {
            const { title } = action.payload;
            if (title) {
                const data: Todos = state.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            edit: !todo.edit,
                            title: action.payload.title,
                        };
                    }
                    return { ...todo, edit: false };
                });
                localStorage.setItem('todos', JSON.stringify(data));
                return data;
            } else {
                const data: Todos = state.map(todo => {
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
        changeIndex: (state, action) => {
            const newTodos = action.payload;
            localStorage.setItem('todos', JSON.stringify(newTodos));
            return newTodos;
        },
    },
});

export const {
    addTodo,
    removeFromTodos,
    todoMarkCompleted,
    todoMarkInProgess,
    updateTodo,
    todoMarkBacklog,
    changeIndex,
} = todosSlice.actions;

export default todosSlice.reducer;
