import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { addTodo, updateTodo } from '../features/todos/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { todoStatus } from '../types';

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

    // id: string;
    // title: string;
    // edit: boolean;
    // dueDate?: string;
    // priority?: priority;
    // completed?: boolean;
    // status: todoStatus;
    // parent?: null | string;
    // depth: number;
    // indentWidth?: number | undefined;
    // collapsed?: boolean;
    // collapsedItem?: boolean;

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
                    status: todoStatus.backlog,
                    parent: null,
                    depth: 0,
                    date: new Date(),
                })
            );
        }

        // clear the input field
        setData({ value: '' });
    };

    return (
        <div className="w-1/2 mx-auto mt-4">
            <form onSubmit={handleSubmit} className="flex">
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
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                />
                {/* <button
                    type="submit"
                    className="appearance-none w-8 h-8 bg-[url('./images/plus.png')] bg-no-repeat bg-contain"
                ></button> */}
                <button className="btn btn-primary ml-4">Add New Task</button>
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
