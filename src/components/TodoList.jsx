import React, { useEffect } from 'react';
// import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchData } from '../redux/thunk/todoFetch';
import { fetchPost } from '../redux/rtk-todo/rtk-fetch';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  console.log(todos);
  //   const filterState = useSelector(state => state.filter.complete);
  //   const filterColor = useSelector(state => state.filter.color);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost);
  }, [dispatch]);

  //   const filterTodos = () => {
  //     switch (filterState) {
  //       case 'complete':
  //         return todos.filter(item => item.completed === true);
  //       case 'incomplete':
  //         return todos.filter(item => item.completed === false);
  //       default:
  //         return todos;
  //     }
  //   };
  //   const FilterCompleteTodos = filterTodos();

  //   const FilterColorTodos = FilterCompleteTodos.filter(item =>
  //     filterColor.length > 0 ? filterColor.includes(item.color) : item
  //   );

  return (
    // <div className="mt-2 text-gray-700 text-sm">
    //   {todos.map(item => (
    //     <TodoItem key={item.id} todo={item} />
    //   ))}
    // </div>
    <div>
      <h4> Github actions check</h4>
    </div>
  );
};

export default TodoList;
