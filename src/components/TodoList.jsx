import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state) => state.todo);
  const filterState = useSelector((state) => state.filter.complete);

  const filterTodos = () => {
    switch (filterState) {
      case "complete":
        return todos.filter((item) => item.complete === true);
      case "incomplete":
        return todos.filter((item) => item.complete === false);
      default:
        return todos;
    }
  };
  const updatedTodos = filterTodos();

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {updatedTodos.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default TodoList;
