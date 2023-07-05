import { useDroppable } from '@dnd-kit/core';
import React from 'react';

const InProgressTodo = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: 'inprogress',
  });
  return (
    <div
      className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-4 mb-4"
      ref={setNodeRef}
    >
      <h4>In Progress</h4>
      <hr />
      {children}
    </div>
  );
};

export default InProgressTodo;
