import React, { useState } from 'react';
import noteImage from '../images/notes.png';
import doubleTickImage from '../images/double-tick.png';

const Header = () => {
  const [data, setData] = useState({ value: '' });
  const handleCompleteAll = (): void => {
    //   dispatch(todoCompleteAllAction());
    console.log('handleComplete');
  };

  //handle clear all
  const handleClearAll = (): void => {
    //   dispatch(todoClearCompleteAction());
    console.log('color filter');
  };

  //hanlde input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setData({ value: event.target.value });
    console.log(data);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // dispatch(
    //   add({
    //     userId: 1,
    //     id: 4,
    //     title: 'fugiat veniam minus',
    //     completed: false,
    //     color: 'green',
    //   })
    // );
    console.log('hi');
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
