import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { addTodo, updateTodoTitle } from '../features/todos/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { TodoStatus } from '../types';

const Header = () => {
    const todos = useAppSelector(state => state.todos);
    // find todo that enable edit
    const editTodo = todos.find(item => item.edit === true);
    const [inputData, setInputData] = useState({
        value: '',
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (editTodo) {
            setInputData({ value: editTodo.title });
        } else {
            setInputData({ value: '' });
        }
    }, [editTodo]);

    // update input data state when input change
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setInputData({ value: event.target.value });
    };
    // submit the new task to todos state
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!inputData.value) return;
        if (editTodo) {
            dispatch(
                updateTodoTitle({
                    id: editTodo.id,
                    title: inputData.value,
                })
            );
        } else {
            dispatch(
                addTodo({
                    id: uuidv4(),
                    edit: false,
                    title: inputData.value,
                    completed: false,
                    status: TodoStatus.backlog,
                    parent: null,
                    depth: 0,
                    collapsed: true,
                    collapsedItem: false,
                })
            );
        }
        setInputData({ value: '' });
    };

    return (
        <div className="w-1/2 mx-auto my-4">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={inputData.value}
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
