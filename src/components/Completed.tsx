import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, Todo } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { todoMarkCompleted } from '../features/todos/todoSlice';
import TodoItem from './TodoItem';

interface CompletedProps {
  children: React.ReactNode;
}

const Completed: React.FC<CompletedProps> = ({ children }) => {
  const todos = useAppSelector(state => state.todos);
  const filterTodo = todos.filter(todo => todo.completed === true);

  const dispatch = useAppDispatch();
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: (item: Todo, monitor) => {
      dispatch(todoMarkCompleted(item.id));
      return monitor.getDropResult();
    },
  }));
  return (
    <div ref={drop} style={{ height: '300px' }}>
      {children}
    </div>
  );
};

export default Completed;
