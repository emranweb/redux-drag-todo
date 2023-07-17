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
        <li
            className="bg-red-100 p-2 rounded-sm m-2 inline- max-w-xs"
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            {children}
        </li>
    );
};

export default TreeItem;
