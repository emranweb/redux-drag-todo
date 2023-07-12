import { useDroppable } from '@dnd-kit/core';
import React from 'react';

const InProgressTodo = ({ children }: { children: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({
        id: 'inprogress',
    });
    return (
        <div
            className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white"
            ref={setNodeRef}
        >
            {children}
        </div>
    );
};

export default InProgressTodo;
