import { useDroppable } from '@dnd-kit/core';
import React from 'react';

const CompletedTodo = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: 'completed',
  });
  return (
    <div
      className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-4 mb-36"
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default CompletedTodo;
