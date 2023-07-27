import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { ChildItem } from '../types';

type ChildItemTypes = {
    id: string;
    title: string;
    collapsed?: boolean;
    depth: number;
};

const ChildrenItem = ({ id, title, collapsed, depth }: ChildItemTypes) => {
    const { transform, attributes, setNodeRef, transition, listeners } =
        useSortable({
            id: id,
        });

    const style = { transform: CSS.Transform.toString(transform), transition };
    const marginLeft = depth ? 40 * depth : 0;
    return (
        <div
            className={`bg-red-100 p-2 m-2 rounded-sm ${
                marginLeft ? 'mx-10' : ''
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
