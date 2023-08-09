import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

const InProgressTodo = ({ children }: { children: React.ReactNode }) => {
    const { setNodeRef } = useSortable({
        id: 'inprogress',
    });
    return (
        <div
            className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white"
            ref={setNodeRef}
        >
            <h4>In Progess</h4>
            <div className="divider"></div>
            {children}
        </div>
    );
};

export default InProgressTodo;
