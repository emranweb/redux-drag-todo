import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types';
// import { useAppSelector } from '../hooks/app';

// import { useSelector } from 'react-redux';
// import { fetchData } from '../redux/thunk/todoFetch';
// import { fetchPost } from '../redux/rtk-todo/rtk-fetch';

const TodoList = ({ todos }: { todos: Todo[] }) => {
    return (
        <div className="mt-2 text-gray-700 text-sm h-32">
            {todos.map(item => (
                <TodoItem key={item.id} todo={item} />
            ))}
        </div>
    );
};

export default TodoList;
