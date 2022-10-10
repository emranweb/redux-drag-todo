import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cancleImage from "../images/cancel.png";
import { toggleTodo } from "../redux/thunk/todoFetch";
import {
  todoToggledAction,
  todoColorSelectAction,
  todoDeleteAction,
} from "../redux/todos/todoActions";

const TodoItem = ({ todo }) => {
  // filter sector chang

  const dispatch = useDispatch();

  // handle todo completed and imcomplete
  const handleChange = (id, status) => {
    dispatch(toggleTodo(id, status));
    console.log(id);
  };
  // handle color change
  const handleColorChange = (color) => {
    dispatch(todoColorSelectAction({ payload: { id, color } }));
  };
  //handle cancle task
  const handleCancle = () => {
    dispatch(todoDeleteAction({ payload: id }));
  };

  const { id, title, color, completed } = todo;

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`rounded-full bg-white border-2  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed ? "border-green-500" : "border-gray-400"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          className="opacity-0 absolute rounded-full"
          onChange={() => handleChange(id, completed)}
        />
        <svg
          className={`${
            completed ? "fill-current" : "hidden"
          }  w-3 h-3 text-green-500 pointer-events-none`}
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>

      <div className={`select-none flex-1 ${completed && "line-through"}`}>
        {title}
      </div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 ${
          color === "green" ? "bg-green-500" : ""
        }`}
        onClick={() => handleColorChange("green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 ${
          color === "yellow" ? "bg-yellow-500" : ""
        }`}
        onClick={() => handleColorChange("yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 ${
          color === "red" ? "bg-red-500" : ""
        }`}
        onClick={() => handleColorChange("red")}
      ></div>

      <img
        src={cancleImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={handleCancle}
      />
    </div>
  );
};

export default TodoItem;
