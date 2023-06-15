import React from 'react';
import TodoItem from './TodoItem';
import { useAppSelector } from '../hooks/app';

// import { useSelector } from 'react-redux';
// import { fetchData } from '../redux/thunk/todoFetch';
// import { fetchPost } from '../redux/rtk-todo/rtk-fetch';

const TodoList = () => {
  const todos = useAppSelector(state => state.todos);

  return (
    <div className="mt-2 text-gray-700 text-sm">
      {todos.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default TodoList;
