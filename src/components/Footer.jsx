import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterColorAction,
  filterCompleteAction,
} from '../redux/filter/filterActions';

const Footer = () => {
  // toto list
  const todos = useSelector(state => state.todo);
  const filterState = useSelector(state => state.filter.complete);
  const itemLeft = todos.filter(item => !item.complete).length;
  const colorFilter = useSelector(state => state.filter.color);
  const dispatch = useDispatch();

  //handle status change
  const handleStatus = status => {
    dispatch(filterCompleteAction({ payload: status }));
  };

  const handleColorToggle = color => {
    dispatch(filterColorAction({ payload: color }));
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>
        {itemLeft === 0
          ? 'no task'
          : itemLeft === 1
          ? '1 task Left'
          : `${itemLeft} tasks left`}
      </p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${
            filterState === 'all' ? 'font-bold' : ''
          }`}
          onClick={() => handleStatus('all')}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${
            filterState === 'incomplete' ? 'font-bold' : ''
          }`}
          onClick={() => handleStatus('incomplete')}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${
            filterState === 'complete' ? 'font-bold' : ''
          }`}
          onClick={() => handleStatus('complete')}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colorFilter.includes('green') ? 'bg-green-500' : ''
          }`}
          onClick={() => handleColorToggle('green')}
        ></li>

        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer  ${
            colorFilter.includes('red') ? 'bg-red-500' : ''
          }`}
          onClick={() => handleColorToggle('red')}
        ></li>

        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer  ${
            colorFilter.includes('yellow') ? 'bg-yellow-500' : ''
          }`}
          onClick={() => handleColorToggle('yellow')}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
