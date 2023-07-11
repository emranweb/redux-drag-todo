import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

const CompletedTodo = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useSortable({
    id: 'completed',
  });
  return (
    <div
      className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white h-6"
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default CompletedTodo;
