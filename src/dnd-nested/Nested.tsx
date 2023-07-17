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
import { v4 as uuidv4 } from 'uuid';

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
    console.log(items);

    return (
        <DndContext>
            <SortableContext items={items.map(item => item.id)}>
                {items.map(item => (
                    <TreeItem key={item.id} id={item.id.toString()}>
                        {item.id.toString()}
                    </TreeItem>
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default Nested;
