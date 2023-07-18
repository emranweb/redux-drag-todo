import React, { useMemo, useState } from 'react';
import { TreeItems } from '../types';
import {
    DndContext,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
    closestCenter,
} from '@dnd-kit/core';
import { flattenTree, removeChildrenOf } from './utilities';
import { createPortal } from 'react-dom';
import { SortableContext } from '@dnd-kit/sortable';
import TreeItem from './TreeItem';
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

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
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [currentPosition, setCurrentPosition] = useState<{
        parentId: UniqueIdentifier | null;
        overId: UniqueIdentifier | null;
    } | null>(null);

    const flattenedItems = useMemo(() => {
        const flattenedTree = flattenTree(items);

        const collapsedItems = flattenedTree.reduce(
            (acc, { children, collapsed, id }) =>
                collapsed && children.length ? [...acc, id] : acc,
            []
        );

        // return removeChildrenOf(
        //     flattenedTree,
        //     activeId ? [activeId, ...collapsedItems] : collapsedItems
        // );
    }, [activeId, items]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
        setOverId(event.active.id);
    };

    return (
        <DndContext onDragStart={handleDragStart}>
            <SortableContext items={items} id="sortable-1">
                <div className="flex flex-col gap-2 bg-slate-300">
                    {items.map(item => (
                        <TreeItem key={item.id} id={item.id.toString()}>
                            {item.id.toString()}
                        </TreeItem>
                    ))}
                </div>
                {createPortal(
                    <DragOverlay>
                        {activeId ? (
                            <TreeItem id={activeId.toString()}>
                                {items
                                    .filter(
                                        item =>
                                            item.id.toString() ===
                                            activeId.toString()
                                    )[0]
                                    .id.toString()}
                            </TreeItem>
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </SortableContext>
        </DndContext>
    );
};

export default Nested;
