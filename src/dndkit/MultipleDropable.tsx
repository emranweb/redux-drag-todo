import { useDroppable } from '@dnd-kit/core';
import React from 'react';

function MultipleDroppables({
    id,
    children,
}: {
    children: React.ReactNode;
    id: string;
}) {
    const { setNodeRef: backlogDropRef } = useDroppable({
        id: 'droppable-backlog',
    });
    const { setNodeRef: inprogressDropRef } = useDroppable({
        id: 'droppable-in-progress',
    });
    const { setNodeRef: doneDropRef } = useDroppable({
        id: 'droppable-done',
    });

    return (
        <section>
            <div className="w-40 h-40 bg-red-100" ref={backlogDropRef}>
                {id === 'droppable-backlog' ? children : 'Drop Here'}
            </div>
            <div className="w-40 h-40 bg-red-100" ref={inprogressDropRef}>
                {id === 'droppable-in-progress' ? children : 'drop Here'}
            </div>
            <div className="w-40 h-40 bg-red-100" ref={doneDropRef}>
                {id === 'droppable-done' ? children : 'drop Here'}
            </div>
        </section>
    );
}

export default MultipleDroppables;
