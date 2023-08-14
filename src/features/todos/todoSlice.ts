import { createSlice } from '@reduxjs/toolkit';
import { Todos, TodoStatus } from '../../types';

const getLocalStorageTodos: string | null = localStorage.getItem('todos');
const initialState: Todos = JSON.parse(getLocalStorageTodos || '[]');

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const stateWithNewTodo = [...state, action.payload];
            localStorage.setItem('todos', JSON.stringify(stateWithNewTodo));
            return stateWithNewTodo;
        },
        updateAllTodos: (state, action) => {
            const newStateData = [...action.payload];
            localStorage.setItem('todos', JSON.stringify(newStateData));
            return newStateData;
        },
        todoMarkCompleted: (state, action) => {
            const updateTodoAsComplete: Todos = state.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                        status: TodoStatus.complete,
                    };
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(updateTodoAsComplete));
            return updateTodoAsComplete;
        },
        todoMarkInProgess: (state, action) => {
            const updateTodoAsInProgress: Todos = state.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: false,
                        status: TodoStatus.inprogress,
                    };
                }
                return todo;
            });
            localStorage.setItem(
                'todos',
                JSON.stringify(updateTodoAsInProgress)
            );
            return updateTodoAsInProgress;
        },
        todoMarkBacklog: (state, action) => {
            const data: Todos = state.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: false,
                        status: TodoStatus.backlog,
                    };
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(data));
            return data;
        },
        updateTodoTitle: (state, action) => {
            const { title } = action.payload;
            if (title) {
                const updateTodoTitle: Todos = state.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            edit: !todo.edit,
                            title: action.payload.title,
                        };
                    }
                    return { ...todo, edit: false };
                });
                localStorage.setItem('todos', JSON.stringify(updateTodoTitle));
                return updateTodoTitle;
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
            const filterTodos = state.filter(
                todo => todo.id !== action.payload
            );
            localStorage.setItem('todos', JSON.stringify(filterTodos));
            return filterTodos;
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
    updateTodoTitle,
    todoMarkBacklog,
    updateAllTodos,
    changeIndex,
} = todosSlice.actions;

export default todosSlice.reducer;
