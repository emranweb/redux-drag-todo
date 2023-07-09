import { useDroppable } from '@dnd-kit/core';
import React from 'react';

const CompletedTodo = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: 'completed',
  });
  return (
    <div
      className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white"
      ref={setNodeRef}
    >
      MH
      {children}
    </div>
  );
};

export default CompletedTodo;
