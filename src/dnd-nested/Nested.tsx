import React, { useMemo, useState } from 'react';
import { TreeItems } from '../types';
import {
    DndContext,
    DragOverlay,
    UniqueIdentifier,
    closestCenter,
} from '@dnd-kit/core';
import { flattenTree, removeChildrenOf } from './utilities';
import { createPortal } from 'react-dom';
import { SortableContext } from '@dnd-kit/sortable';
import TreeItem from './TreeItem';

const initialItems: TreeItems = [
    {
        id: 'Home',
        children: [],
    },
    {
        id: 'Collections',
        children: [
            { id: 'Spring', children: [] },
            { id: 'Summer', children: [] },
            { id: 'Fall', children: [] },
            { id: 'Winter', children: [] },
        ],
    },
];

const Nested = () => {
    const [items, setItems] = useState(() => initialItems);

    return (
        <DndContext>
            <SortableContext items={items}>
                 {items.map((item) => (<TreeItem id="item.id">{}</TreeItem>)}
            </SortableContext>
        </DndContext>
    );
};

export default Nested;
