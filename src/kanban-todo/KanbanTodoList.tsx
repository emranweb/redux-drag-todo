import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

const KanbanTodoList = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    const { setNodeRef } = useSortable({
        id: id,
    });
    return (
        <div
            className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white"
            ref={setNodeRef}
        >
            <h4>{id}</h4>
            <div className="divider"></div>
            {children}
        </div>
    );
};

export default KanbanTodoList;
