import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { addTodo, updateTodo } from '../features/todos/todoSlice';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
    const todos = useAppSelector(state => state.todos);

    // find todo that enable edit
    const editTodo = todos.find(item => item.edit === true);
    const [data, setData] = useState({ value: editTodo ? editTodo.title : '' });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (editTodo) {
            setData({ value: editTodo.title });
        }
    }, [editTodo]);

    //hanlde input change
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setData({ value: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!data.value) return;
        if (editTodo) {
            dispatch(
                updateTodo({
                    id: editTodo.id,
                    title: data.value,
                })
            );
        } else {
            dispatch(
                addTodo({
                    id: uuidv4(),
                    edit: false,
                    title: data.value,
                    completed: false,
                    status: 'backlog',
                })
            );
        }

        // clear the input field
        setData({ value: '' });
    };

    return (
        <div>
            <form
                className={`flex items-center bg-gray-100 px-3 py-3 rounded-md ${
                    data.value === ''
                        ? 'border border-red-400'
                        : 'border border-green-400'
                }`}
                onSubmit={handleSubmit}
            >
                {/* <input
                    type="text"
                    value={data.value}
                    onChange={handleInputChange}
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                /> */}
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                />
                {/* <button
                    type="submit"
                    className="appearance-none w-8 h-8 bg-[url('./images/plus.png')] bg-no-repeat bg-contain"
                ></button> */}
                <button className="btn btn-primary">Helo World</button>
            </form>

            {/* <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer">
          <img className="w-4 h-4" src={doubleTickImage} alt="Complete" />
          <span onClick={handleCompleteAll}>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={handleClearAll}>
          Clear completed
        </li>
      </ul> */}
        </div>
    );
};

export default Header;
