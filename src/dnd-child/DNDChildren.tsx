import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverEvent,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChildItems } from '../types';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
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
    const [items, setItems] = useState<ChildItems | any[]>(initialItems);
    const [activeId, setActiveId] = useState<string | null | UniqueIdentifier>(
        null
    );
    const [dragPosition, setDragPosition] = useState<number | null>(0);
    const [overId, setOverId] = useState<string | null | UniqueIdentifier>(
        null
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id);
    };
    const handleDragMove = ({ delta }: DragMoveEvent) => {
        if (delta.x > 48) {
            setDragPosition(1);
        } else {
            setDragPosition(0);
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { over } = event;
        setOverId(over?.id ?? null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const activeItem = items.find(item => item.id === activeId);
        const overItem = items.find(item => item.id === overId);
        const activeItemIndex = items.findIndex(item => item.id === activeId);
        const overItemIndex = items.findIndex(item => item.id === overId);
        const previousItem = items[activeItemIndex - 1];
        const nextItem = items[activeItemIndex + 1];
        // parent id
        const parentId = () => {
            if (previousItem && dragPosition === 1) {
                return previousItem.id;
            } else {
                return null;
            }
        };
        const newItems = items.map(item => {
            if (item.id === activeId) {
                return {
                    ...item,
                    parent: parentId(),
                    depth: dragPosition,
                };
            } else {
                return item;
            }
        });

        const newItemsArray = arrayMove(
            newItems,
            activeItemIndex,
            overItemIndex
        );

        setItems(newItemsArray);
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
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
