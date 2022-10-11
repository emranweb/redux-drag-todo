import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/thunk/todoFetch";

const TodoList = () => {
  const todos = useSelector((state) => state.todo);
  const filterState = useSelector((state) => state.filter.complete);
  const filterColor = useSelector((state) => state.filter.color);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData);
  }, [dispatch]);

  const filterTodos = () => {
    switch (filterState) {
      case "complete":
        return todos.filter((item) => item.completed === true);
      case "incomplete":
        return todos.filter((item) => item.completed === false);
      default:
        return todos;
    }
  };
  const FilterCompleteTodos = filterTodos();

  const FilterColorTodos = FilterCompleteTodos.filter((item) =>
    filterColor.length > 0 ? filterColor.includes(item.color) : item
  );

  return (
    <div className="mt-2 text-gray-700 text-sm">
      {FilterColorTodos.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default TodoList;
