import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

export const TreeItem = (props: { children: string; id: string }) => {
    const { transform, attributes, setNodeRef } = useSortable({ id: props.id });
    return <li ref={setNodeRef}>{props.children}</li>;
};

export default TreeItem;
