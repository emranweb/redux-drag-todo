import React from 'react';
import { Todo } from '../types/index';
// import {
//     removeFromTodos,
//     todoMarkCompleted,
//     updateTodo,
// } from '../features/todos/todoSlice';
// import { useAppDispatch } from '../hooks/app';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { id, title, completed, status } = todo;
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: id,
        });

    // const dispatch = useAppDispatch();

    // handle todo completed and imcomplete
    // const handleChange = (id: number) => {
    //     dispatch(todoMarkCompleted(id));
    // };

    //handle cancle task
    // const handleRemove = (id: number) => {
    //     dispatch(removeFromTodos(id));
    // };

    // const handleUpdate = (id: number): void => {
    //     dispatch(updateTodo({ id: id }));
    //     console.log('hi');
    // };

    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className={`flex justify-start items-center p-4 text-white  space-x-4 border-b border-gray-400/20 last:border-0  rounded-lg mb-2 ${
                status === 'done' ? 'bg-success' : ''
            } ${status === 'inprogress' ? 'bg-warning' : ''} ${
                status === 'backlog' ? 'bg-primary' : ''
            } `}
        >
            {/* <div
                className={`rounded-full bg-white border-2  w-5 h-5 flex flex-shrink-0 justify-center items-center   ${
                    completed ? 'bg-green-500' : 'bg-gray-400'
                }`}
            >
                 <input
                    type="checkbox"
                    checked={completed}
                    className="opacity-0 absolute rounded-full"
                    onChange={() => handleChange(id)}
                /> 
            </div> */}

            <div className={`select-none flex flex-1`}>
                {title}
                <div className="w-3 h-3 mt-[6px] mx-4"></div>
            </div>
        </div>
    );
};

export default TodoItem;
