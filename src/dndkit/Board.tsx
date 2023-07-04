import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useState } from 'react';
import Draggable from './Dragable';
import MultipleDroppables from './MultipleDropable';

const Board = () => {
  const [isDropped, setIsDropped] = useState({
    status: false,
    id: '',
  });

  function handleDragEnd(event: DragEndEvent): void {
    if (
      (event.over && event.over.id === 'droppable-backlog') ||
      (event.over && event.over.id === 'droppable-in-progress') ||
      (event.over && event.over.id === 'droppable-done')
    ) {
      setIsDropped({ status: true, id: event.over.id });
    }
  }

  const draggableMarkup = <Draggable>Button</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped.status ? draggableMarkup : null}
      <MultipleDroppables id={isDropped.id}>
        {isDropped.status ? draggableMarkup : null}
      </MultipleDroppables>
    </DndContext>
  );
};

export default Board;
