import React, { useState } from "react";
import noteImage from "../images/notes.png";
import doubleTickImage from "../images/double-tick.png";
import { useDispatch } from "react-redux";
import {
  todoClearCompleteAction,
  todoCompleteAllAction,
  todoAddAction,
} from "../redux/todos/todoActions";

const Header = () => {
  const [data, setData] = useState({ value: "" });

  const dispatch = useDispatch();

  const handleCompleteAll = () => {
    dispatch(todoCompleteAllAction());
  };

  //handle clear all
  const handleClearAll = () => {
    dispatch(todoClearCompleteAction());
  };

  //hanlde input change
  const handleInputChange = (event) => {
    setData({ value: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event");
    dispatch(todoAddAction({ payload: data.value }));
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          value={data.value}
          onChange={handleInputChange}
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        />
        <button
          type="submit"
          className="appearance-none w-8 h-8 bg-[url('./images/plus.png')] bg-no-repeat bg-contain"
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer">
          <img className="w-4 h-4" src={doubleTickImage} alt="Complete" />
          <span onClick={handleCompleteAll}>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={handleClearAll}>
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
