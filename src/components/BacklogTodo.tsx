import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

const BacklogTodo = ({ children }: { children: React.ReactNode }) => {
    const { setNodeRef } = useSortable({
        id: 'backlog',
    });
    return (
        <div
            className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white"
            ref={setNodeRef}
        >
            <h4>Backlog</h4>
            <div className="divider"></div>
            {children}
        </div>
    );
};

export default BacklogTodo;
