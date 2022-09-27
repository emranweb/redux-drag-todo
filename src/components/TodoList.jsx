import React from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      <TodoItem />
      <TodoItem />
    </div>
  );
};

export default TodoList;
