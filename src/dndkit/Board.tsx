import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import React, { useState } from 'react';
import Draggable from './Dragable';
import Droppable from './Dropable';

const Board = () => {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event: any) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  const draggableMarkup = <Draggable>Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable> {isDropped ? draggableMarkup : 'Drop here'}</Droppable>
    </DndContext>
  );
};

export default Board;
