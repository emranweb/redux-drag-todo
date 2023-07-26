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
    return (
        <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
            {title}
        </div>
    );
};

export default ChildrenItem;
