import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Todo, TodoStatus } from '../types/index';
interface TodoItemProps {
    todo: Todo;
}

const KanbanTodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { id, title, status } = todo;
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
                status === TodoStatus.complete ? 'bg-success' : ''
            } ${status === TodoStatus.inprogress ? 'bg-warning' : ''} ${
                status === TodoStatus.backlog ? 'bg-primary' : ''
            } `}
        >
            <div className={`select-none flex flex-1`}>{title}</div>
        </div>
    );
};

export default KanbanTodoItem;
