import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function Draggable(props: any) {
  const { listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners}>
      {props.children}
    </button>
  );
}

export default Draggable;
