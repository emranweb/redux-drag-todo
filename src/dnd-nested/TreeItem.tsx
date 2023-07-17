import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
export const TreeItem = ({
    children,
    id,
}: {
    children: string;
    id: string;
}) => {
    const { transform, attributes, setNodeRef, transition, listeners } =
        useSortable({
            id: id,
        });

    const style = { transform: CSS.Transform.toString(transform), transition };
    return (
        <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
            {children}
        </li>
    );
};

export default TreeItem;
