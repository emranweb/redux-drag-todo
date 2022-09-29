import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cancleImage from "../images/cancel.png";
import {
  todoToggledAction,
  todoColorSelectAction,
  todoDeleteAction,
} from "../redux/todos/todoActions";

const TodoItem = ({ todo }) => {
  const { id, text, color, complete } = todo;

  const dispatch = useDispatch();

  // handle todo complete and imcomplete
  const handleChange = () => {
    dispatch(todoToggledAction({ payload: id }));
  };
  // handle color change
  const handleColorChange = (color) => {
    dispatch(todoColorSelectAction({ payload: { id, color } }));
  };
  //handle cancle task
  const handleCancle = () => {
    dispatch(todoDeleteAction({ payload: id }));
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`rounded-full bg-white border-2  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          complete ? "border-green-500" : "border-gray-400"
        }`}
      >
        <input
          type="checkbox"
          checked={complete}
          className="opacity-0 absolute rounded-full"
          onChange={() => handleChange(id)}
        />
        <svg
          className={`${
            complete ? "fill-current" : "hidden"
          }  w-3 h-3 text-green-500 pointer-events-none`}
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>

      <div className={`select-none flex-1 ${complete && "line-through"}`}>
        {text}
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
