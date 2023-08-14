import {
    DndContext,
    DragMoveEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import React, { useState } from 'react';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import ChildrenItem from './ChildrenItem';
import { updateAllTodos } from '../features/todos/todoSlice';

// const initialItems: ChildItems = [
//     {
//         id: uuidv4(),
//         title: 'Home',
//         depth: 0,
//         parent: null,
//         collapsed: false,
//         collapsedItem: false,
//     },
//     {
//         id: uuidv4(),
//         title: 'About',
//         depth: 0,
//         parent: null,
//         collapsed: false,
//         collapsedItem: false,
//     },
//     {
//         id: uuidv4(),
//         title: 'Contact',
//         depth: 0,
//         parent: null,
//         collapsed: false,
//         collapsedItem: false,
//     },
//     {
//         id: uuidv4(),
//         title: 'Shop',
//         depth: 0,
//         parent: null,
//         collapsed: false,
//         collapsedItem: false,
//     },
// ];

const DNDChildren = () => {
    const allTodos = useAppSelector(state => state.todos);
    const [activeId, setActiveId] = useState<string | null | UniqueIdentifier>(
        null
    );
    const [indentWidth] = useState<number>(40);
    const [dragPosition, setDragPosition] = useState<number>(0);
    const [overId, setOverId] = useState<string | null | UniqueIdentifier>(
        null
    );

    const dispatch = useAppDispatch();

    function handleCollapse(id: string): void {
        // remove the item from the array
        const newCollapsedItem = allTodos.map(item => {
            if (item.parent === id) {
                return {
                    ...item,
                    collapsedItem: !item.collapsedItem,
                };
            } else {
                return item;
            }
        });

        newCollapsedItem;
    }

    // remove from list
    const handleRemove = (id: string): void => {
        // find the id has children or not
        const hadChildren = allTodos.filter(item => item.parent === id);
        // clone actual items
        const cloneItems = [...allTodos];
        for (let i = 0; i < cloneItems.length; i++) {
            if (hadChildren.length > 0) {
                // first remove the selected id
                if (cloneItems[i].id === id) {
                    cloneItems.splice(i, 1);
                }
                // remove the children of the selected id
                if (cloneItems[i].parent === id) {
                    cloneItems.splice(i, hadChildren.length);
                }
            } else {
                // remove the selected id that has no children
                if (cloneItems[i].id === id) {
                    cloneItems.splice(i, 1);
                }
            }
        }
        // set the clone items to store
        dispatch(updateAllTodos(cloneItems));
    };
    // store the active id when the drag starts
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id);
    };

    // store the drag position
    const handleDragMove = ({ delta }: DragMoveEvent) => {
        if (delta.x > indentWidth) {
            setDragPosition(1);
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
        const activeItemIndex = allTodos.findIndex(
            item => item.id === activeId
        );
        const overItemIndex = allTodos.findIndex(item => item.id === overId);
        const previousItem = allTodos[activeItemIndex - 1];

        // calculate parent id
        const parentId = () => {
            if (previousItem && dragPosition === 1) {
                if (previousItem.parent === null) {
                    return previousItem.id;
                } else {
                    return previousItem.parent;
                }
            } else {
                return null;
            }
        };
        // create new of items with new position
        const newItems = allTodos.map(item => {
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

        const parentItem = newItems.filter(item => item.id === activeId)[0];

        const parentCollapse = newItems.map(item => {
            if (item.id === parentItem.parent) {
                return {
                    ...item,
                    collapsed: true,
                };
            } else {
                return item;
            }
        });

        // create the new array after chagne the position
        const newItemsArray = arrayMove(
            parentCollapse,
            activeItemIndex,
            overItemIndex
        );

        // set the array to store
        dispatch(updateAllTodos(newItemsArray));
    };

    return (
        <>
            <DndContext
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={allTodos}>
                    {allTodos.map(item => {
                        return (
                            <ChildrenItem
                                key={item.id}
                                id={item.id}
                                depth={item.depth}
                                title={item.title}
                                collapsed={item.collapsed}
                                collapsedItem={item.collapsedItem}
                                indentWidth={indentWidth}
                                handleCollapse={handleCollapse}
                                handleRemove={handleRemove}
                            />
                        );
                    })}

                    {createPortal(
                        <DragOverlay>
                            {activeId
                                ? allTodos.map(item =>
                                      item.id === activeId ? (
                                          <ChildrenItem
                                              id={item.id}
                                              title={item.title}
                                              key={item.id}
                                              depth={item.depth}
                                              collapsed={item.collapsed}
                                              indentWidth={indentWidth}
                                              handleCollapse={handleCollapse}
                                              handleRemove={handleRemove}
                                              collapsedItem={item.collapsedItem}
                                          />
                                      ) : null
                                  )
                                : null}
                        </DragOverlay>,
                        document.body
                    )}
                </SortableContext>
            </DndContext>
        </>
    );
};

export default DNDChildren;
