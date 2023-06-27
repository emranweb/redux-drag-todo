import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import React, { useState } from 'react';

const Board = () => {
  const [isDroped, setIsDroped] = useState(false);
  const { isOver, setNodeRef: dropNode } = useDroppable({
    id: 'dropable',
  });

  const handleDrapEvent = (event: any) => {
    if (event.over && event.over.id === 'dropable') {
      setIsDroped(true);
    }
  };
  const { setNodeRef: dragNode, listeners } = useDraggable({
    id: 'dragable',
  });
  return (
    <DndContext onDragEnd={handleDrapEvent}>
      <button ref={dragNode} type="button" className="p-2 bg-orange-400">
        Drag
      </button>

      <div
        ref={dropNode}
        {...listeners}
        className="drop-container w-32 h-32 bg-red-300"
      ></div>
    </DndContext>
  );
};

export default Board;
