import React, { useState } from 'react';
import {
    DndContext,
    DragMoveEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import ChildrenItem from './ChildrenItem';
import { updateAllTodos } from '../features/todos/todoSlice';
import { Todos } from '../types';

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
    // edit todo
    const editTodo = (id: string): void => {
        const editTodos = allTodos.map(item =>
            item.id === id ? { ...item, edit: true } : { ...item, edit: false }
        );

        dispatch(updateAllTodos(editTodos));
    };
    // handle collapsed
    function handleCollapse(id: string): void {
        //remove the item from the array
        const newCollapsedItems = allTodos.map(item => {
            if (item.parent === id) {
                return {
                    ...item,
                    collapsedItem: !item.collapsedItem,
                };
            } else {
                return item;
            }
        });
        dispatch(updateAllTodos(newCollapsedItems));
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
        const nextItem = allTodos[activeItemIndex + 1];
        let newArray;

        if (dragPosition === 1 && previousItem?.parent) {
            newArray = allTodos.map(todo => {
                if (todo.id == activeId) {
                    return {
                        ...todo,
                        parent: previousItem.parent,
                        depth: dragPosition,
                    };
                } else {
                    return {
                        ...todo,
                    };
                }
            });
        } else if (dragPosition === 1 && previousItem && !previousItem.parent) {
            newArray = allTodos.map(todo => {
                if (todo.id === previousItem.id) {
                    return {
                        ...todo,
                    };
                }
                if (todo.id == activeId) {
                    return {
                        ...todo,
                        parent: previousItem.id,
                        depth: dragPosition,
                    };
                } else {
                    return {
                        ...todo,
                    };
                }
            });
        } else if (dragPosition === 1 && !previousItem) {
            newArray = allTodos.map(todo => {
                if (todo.id == activeId) {
                    return {
                        ...todo,
                        parent: null,
                        depth: 0,
                    };
                } else {
                    return {
                        ...todo,
                    };
                }
            });
        } else if (dragPosition === 0 && nextItem?.parent) {
            const nextItems = allTodos
                .slice(activeItemIndex)
                .filter(todo => todo.parent === nextItem.parent);

            const cloneAllTodos: Todos = [...allTodos];
            if (nextItems.length > 2) {
                nextItems.forEach(item => {
                    const existItem = cloneAllTodos.find(
                        single => single.id === item.id
                    );
                    if (existItem) {
                        const updatedItem = {
                            ...existItem,
                            parent: activeId,
                        };
                        const index = cloneAllTodos.indexOf(existItem);
                        cloneAllTodos[index] = updatedItem;
                    }
                    if (item.id === activeId) {
                        const index = cloneAllTodos.indexOf(item);
                        cloneAllTodos[index] = {
                            ...item,
                            parent: null,
                            depth: 0,
                        };
                    }
                });
            } else {
                cloneAllTodos.forEach(item => {
                    if (item.id === nextItems[0].id) {
                        const updateItem = { ...item, parent: activeId };
                        const index = cloneAllTodos.indexOf(item);
                        cloneAllTodos[index] = updateItem;
                    }

                    if (activeId === item.id) {
                        const updatedItem = {
                            ...item,
                            parent: null,
                            depth: 0,
                        };
                        const index = cloneAllTodos.indexOf(item);
                        cloneAllTodos[index] = updatedItem;
                    }
                });
            }

            newArray = [...cloneAllTodos];
        } else if (dragPosition === 0 && !nextItem?.parent) {
            newArray = allTodos.map(todo => {
                if (todo.id == activeId) {
                    return {
                        ...todo,
                        parent: null,
                        depth: dragPosition,
                    };
                } else {
                    return {
                        ...todo,
                    };
                }
            });
        } else {
            newArray = allTodos;
        }

        // const parentItem = newArray.filter(item => item.id === activeId)[0];

        const parentCollapse = newArray.map(item => {
            if (item.parent) {
                return {
                    ...item,
                    collapsed: false,
                };
            } else {
                return {
                    ...item,
                    collapsed: true,
                };
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
        <div className="w-1/3 mx-auto">
            <h4 className="text-2xl font-medium">
                Todo App With Nested Element
            </h4>
            <div className="divider"></div>
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
                                editTodo={editTodo}
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
                                              editTodo={editTodo}
                                          />
                                      ) : null
                                  )
                                : null}
                        </DragOverlay>,
                        document.body
                    )}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default DNDChildren;
