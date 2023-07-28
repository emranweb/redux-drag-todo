import {
    DndContext,
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
    const [items, setItems] = useState<ChildItems>(initialItems);
    const [activeId, setActiveId] = useState<string | null | UniqueIdentifier>(
        null
    );
    const [indentWidth, setIndentWidth] = useState<number>(40);
    const [dragPosition, setDragPosition] = useState<number>(0);
    const [overId, setOverId] = useState<string | null | UniqueIdentifier>(
        null
    );

    // store the active id when the drag starts
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id);
    };

    // store the drag position
    const handleDragMove = ({ delta }: DragMoveEvent) => {
        if (delta.x > indentWidth) {
            setDragPosition(1);
            console.log('drag position', delta.x);
        } else {
            setDragPosition(0);
        }
    };
    // create new array after drag ends
    const handleDragOver = (event: DragOverEvent) => {
        const { over } = event;
        setOverId(over?.id ?? null);
    };

    const handleDragEnd = () => {
        const activeItemIndex = items.findIndex(item => item.id === activeId);
        const overItemIndex = items.findIndex(item => item.id === overId);
        const previousItem = items[activeItemIndex - 1];

        // calculate parent id
        const parentId = () => {
            if (previousItem && dragPosition === 1) {
                return previousItem.id;
            } else {
                return null;
            }
        };
        // create new of items with new position
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
        // create the new array after chagne the position
        const newItemsArray = arrayMove(
            newItems,
            activeItemIndex,
            overItemIndex
        );
        // set the array to store
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
                            indentWidth={indentWidth}
                        />
                    );
                })}
            </SortableContext>
        </DndContext>
    );
};

export default DNDChildren;
