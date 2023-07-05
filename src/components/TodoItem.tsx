import React from 'react';
// import { useDispatch } from 'react-redux';
import cancleImage from '../images/cancel.png';

// import { colorChange, deleteTodo } from '../redux/thunk/todoFetch';
import noteImage from '../images/notes.png';
//import { todoToggle } from '../redux/rtk-todo/todo';
import { Todo } from '../types/index';
import {
  removeFromTodos,
  todoMarkCompleted,
  updateTodo,
} from '../features/todos/todoSlice';
import { useAppDispatch } from '../hooks/app';
import { useDraggable } from '@dnd-kit/core';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: id,
  });

  const dispatch = useAppDispatch();

  // handle todo completed and imcomplete
  const handleChange = (id: number) => {
    dispatch(todoMarkCompleted(id));
  };

  //handle cancle task
  const handleRemove = (id: number) => {
    dispatch(removeFromTodos(id));
  };

  const handleUpdate = (id: number): void => {
    dispatch(updateTodo({ id: id }));
    console.log('hi');
  };

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0"
    >
      <div
        className={`rounded-full bg-white border-2  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed ? 'border-green-500' : 'border-gray-400'
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          className="opacity-0 absolute rounded-full"
          onChange={() => handleChange(id)}
        />
        <svg
          className={`${
            completed ? 'fill-current' : 'hidden'
          }  w-3 h-3 text-green-500 pointer-events-none`}
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>

      <div className={`select-none flex flex-1 ${completed && 'line-through'}`}>
        {title}
        <div className="w-3 h-3 mt-[6px] mx-4">
          <img onClick={() => handleUpdate(id)} src={noteImage} alt="note" />
        </div>
      </div>

      <img
        src={cancleImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => handleRemove(id)}
      />
    </div>
  );
};

export default TodoItem;
