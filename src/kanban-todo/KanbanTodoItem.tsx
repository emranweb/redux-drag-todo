import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Todo } from '../types/index';
interface TodoItemProps {
    todo: Todo;
}

const KanbanTodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { id, title, completed, status } = todo;
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: id,
        });

    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className={`flex justify-start items-center p-4 text-white  space-x-4 border-b border-gray-400/20 last:border-0  rounded-lg mb-2 ${
                status === 'complete' ? 'bg-success' : ''
            } ${status === 'inprogress' ? 'bg-warning' : ''} ${
                status === 'backlog' ? 'bg-primary' : ''
            } `}
        >
            <div className={`select-none flex flex-1`}>
                {title}
                <div className="w-3 h-3 mt-[6px] mx-4"></div>
            </div>
        </div>
    );
};

export default KanbanTodoItem;
