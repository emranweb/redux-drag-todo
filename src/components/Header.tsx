import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { addTodo, updateTodoTitle } from '../features/todos/todoSlice';
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
                updateTodoTitle({
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
                    collapsed: false,
                    collapsedItem: false,
                })
            );
        }

        // clear the input field
        setData({ value: '' });
    };

    return (
        <div className="w-1/2 mx-auto mt-4">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    placeholder="Type here"
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                />
                <button className="btn btn-primary ml-4">Add New Task</button>
            </form>
        </div>
    );
};

export default Header;
