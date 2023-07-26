import { DndContext } from '@dnd-kit/core';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChildItems } from '../types';
import { SortableContext } from '@dnd-kit/sortable';
import ChildrenItem from './ChildrenItem';

const initialItems: ChildItems = [
    {
        id: uuidv4(),
        title: 'Home',
        depth: 0,
        parent: null,
        collapsed: false,
    },
    {
        id: uuidv4(),
        title: 'About',
        depth: 0,
        parent: null,
        collapsed: false,
    },
    {
        id: uuidv4(),
        title: 'Contact',
        depth: 0,
        parent: null,
        collapsed: false,
    },
    {
        id: uuidv4(),
        title: 'Shop',
        depth: 0,
        parent: null,
        collapsed: false,
    },
];

const DNDChildren = () => {
    const [items, setItems] = useState<ChildItems>(initialItems);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);
    console.log(items);
    return (
        <DndContext>
            <SortableContext items={items}>
                {items.map(item => {
                    return (
                        <ChildrenItem
                            key={item.id}
                            id={item.id}
                            depth={item.depth}
                            title={item.title}
                        />
                    );
                })}
            </SortableContext>
        </DndContext>
    );
};

export default DNDChildren;
