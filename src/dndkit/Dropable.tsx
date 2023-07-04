import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div className="w-40 h-40 bg-red-100" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;
