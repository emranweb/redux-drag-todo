import React from 'react';
import TodoItem from './TodoItem';
import { useAppSelector } from '../hooks/app';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
// import { useSelector } from 'react-redux';
// import { fetchData } from '../redux/thunk/todoFetch';
// import { fetchPost } from '../redux/rtk-todo/rtk-fetch';

const TodoList = () => {
  const todos = useAppSelector(state => state.todos);

  return (
    <div className="mt-2 text-gray-700 text-sm">
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        {todos.map(item => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default TodoList;
