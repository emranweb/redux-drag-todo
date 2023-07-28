import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

type ChildItemTypes = {
    id: string;
    title: string;
    collapsed?: boolean;
    indentWidth: number;
    depth: number;
};

const ChildrenItem = ({ id, title, indentWidth, depth }: ChildItemTypes) => {
    const { transform, attributes, setNodeRef, transition, listeners } =
        useSortable({
            id: id,
        });

    const style = { transform: CSS.Transform.toString(transform), transition };

    const marginLeft = depth ? indentWidth * depth : 0;
    return (
        <div
            className={`bg-red-100 p-2 m-2 rounded-sm relative ${
                marginLeft ? 'left-[40px]' : ''
            }`}
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {title}
        </div>
    );
};

export default ChildrenItem;
