import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

const CompletedTodo = ({ children }: { children: React.ReactNode }) => {
    const { setNodeRef } = useSortable({
        id: 'completed',
    });
    return (
        <div
            className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white"
            ref={setNodeRef}
        >
            <h4>Completed</h4>
            {children}
        </div>
    );
};

export default CompletedTodo;
