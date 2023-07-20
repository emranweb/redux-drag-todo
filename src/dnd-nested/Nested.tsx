import React, { useMemo, useState } from 'react';
import { TreeItems } from '../types';
import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
    closestCenter,
} from '@dnd-kit/core';
import {
    buildTree,
    flattenTree,
    getProjection,
    removeChildrenOf,
} from './utilities';
import { createPortal } from 'react-dom';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import TreeItem from './TreeItem';
import { v4 as uuidv4 } from 'uuid';

import { FlattenedItem } from './types';

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
    {
        id: 'About Us',
        children: [],
    },
    {
        id: 'My Account',
        children: [
            { id: 'Addresses', children: [] },
            { id: 'Order History', children: [] },
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
    const [indentationWidth, setIndentationWidth] = useState(40);

    const flattenedItems = useMemo(() => {
        const flattenedTree = flattenTree(items);

        // const collapsedItems = flattenedTree.reduce(
        //     (acc, item) =>
        //         item.collapsed && children.length ? [...acc, item.id] : acc,
        //     []
        // );

        const collapsedItems = flattenedTree.reduce<any>(
            (acc, item) =>
                item.collapsed && item.children ? [...acc, item.id] : acc,
            []
        );

        return removeChildrenOf(
            flattenedTree,
            activeId ? [activeId, ...collapsedItems] : collapsedItems
        );
    }, [activeId, items]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
        setOverId(event.active.id);
        const activeItem = flattenedItems.find(
            ({ id }) => id === event.active.id
        );
        if (activeItem) {
            setCurrentPosition({
                parentId: activeItem.parentId,
                overId: activeId,
            });
        }
    };

    function handleDragMove({ delta }: DragMoveEvent) {
        setOffsetLeft(delta.x);
    }

    function handleDragOver({ over }: DragOverEvent) {
        setOverId(over?.id ?? null);
    }

    function handleDragEnd({ active, over }: DragEndEvent) {
        resetState();
        // if (projected && over) {
        //     const { depth, parentId } = projected;
        //     console.log('projected', projected);
        //     const clonedItems: FlattenedItem[] = JSON.parse(
        //         JSON.stringify(flattenTree(items))
        //     );

        //     const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
        //     const activeIndex = clonedItems.findIndex(
        //         ({ id }) => id === active.id
        //     );

        //     const activeTreeItem = clonedItems[activeIndex];

        //     clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

        //     const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

        //     const newItems = buildTree(sortedItems);

        //     setItems(newItems);
        // }
    }

    function resetState() {
        setOverId(null);
        setActiveId(null);
        setOffsetLeft(0);
        setCurrentPosition(null);

        document.body.style.setProperty('cursor', '');
    }

    const projected =
        activeId && overId
            ? getProjection(
                  flattenedItems,
                  activeId,
                  overId,
                  offsetLeft,
                  indentationWidth
              )
            : null;

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} id="sortable-1">
                <div className="flex flex-col gap-2 bg-slate-300">
                    {flattenedItems.map(item => (
                        <TreeItem
                            key={item.id}
                            depth={item.depth}
                            indentationWidth={indentationWidth}
                            id={item.id.toString()}
                        >
                            {item.id.toString()}
                        </TreeItem>
                    ))}
                </div>
                {createPortal(
                    <DragOverlay>
                        {activeId ? (
                            <TreeItem id={activeId.toString()}>
                                {flattenedItems
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
