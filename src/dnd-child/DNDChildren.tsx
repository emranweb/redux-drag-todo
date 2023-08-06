import {
    DndContext,
    DragMoveEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChildItems } from '../types';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import ChildrenItem from './ChildrenItem';
import { createPortal } from 'react-dom';

/**
 * @type {ChildItems}
 * @returns []
 * */

const initialItems: ChildItems = [
    {
        id: uuidv4(),
        title: 'Home',
        depth: 0,
        parent: null,
        collapsed: false,
        collapsedItem: false,
    },
    {
        id: uuidv4(),
        title: 'About',
        depth: 0,
        parent: null,
        collapsed: false,
        collapsedItem: false,
    },
    {
        id: uuidv4(),
        title: 'Contact',
        depth: 0,
        parent: null,
        collapsed: false,
        collapsedItem: false,
    },
    {
        id: uuidv4(),
        title: 'Shop',
        depth: 0,
        parent: null,
        collapsed: false,
        collapsedItem: false,
    },
];

const DNDChildren = () => {
    const [task, setTask] = useState<string>('');
    const [items, setItems] = useState<ChildItems>(initialItems);
    const [activeId, setActiveId] = useState<string | null | UniqueIdentifier>(
        null
    );
    const [indentWidth] = useState<number>(40);
    const [dragPosition, setDragPosition] = useState<number>(0);
    const [overId, setOverId] = useState<string | null | UniqueIdentifier>(
        null
    );

    /**
     * @param {string} id
     * @override {Set New Items with item collapsed=true}
     * @returns {void}
     */
    function handleCollapse(id: string): void {
        // remove the item from the array
        const newCollapsedItem = items.map(item => {
            if (item.parent === id) {
                return {
                    ...item,
                    collapsedItem: !item.collapsedItem,
                };
            } else {
                return item;
            }
        });

        setItems(newCollapsedItem);
    }

    /**
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setTask(e.target.value);
    };

    const handleTaskSubmit = (): void => {
        const newTask = {
            id: uuidv4(),
            title: task,
            depth: 0,
            parent: null,
            collapsed: false,
            collapsedItem: false,
        };
        setItems([...items, newTask]);
        setTask('');
    };

    // remove from list
    const handleRemove = (id: string): void => {
        // find the id has children or not
        const hadChildren = items.filter(item => item.parent === id);
        // clone actual items
        const cloneItems = [...items];
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
        setItems(cloneItems);
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
        const activeItemIndex = items.findIndex(item => item.id === activeId);
        const overItemIndex = items.findIndex(item => item.id === overId);
        const previousItem = items[activeItemIndex - 1];

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
        setItems(newItemsArray);
    };

    return (
        <>
            <div>
                <input
                    className="border m-2 p-2"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="input task"
                />
                <button onClick={handleTaskSubmit}>add</button>
            </div>
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
                                ? items.map(item =>
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
