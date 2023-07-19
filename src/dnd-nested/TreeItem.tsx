import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
export const TreeItem = ({
    children,
    id,
    depth,
    indentationWidth = 40,
}: {
    children: string;
    id: string;
    depth?: number;
    indentationWidth?: number;
}) => {
    const { transform, attributes, setNodeRef, transition, listeners } =
        useSortable({
            id: id,
        });

    const style = { transform: CSS.Transform.toString(transform), transition };
    return (
        <li
            className={`bg-red-100 p-2 rounded-sm m-2 inline- max-w-xs mx-[${
                depth === 1 ? indentationWidth * depth : 0
            }px]`}
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
