import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
    changeIndex,
    todoMarkBacklog,
    todoMarkCompleted,
    todoMarkInProgess,
} from '../features/todos/todoSlice';
import Header from '../components/Header';
import TodoItem from '../components/TodoItem';
import { createPortal } from 'react-dom';
import KanbanTodoList from './KanbanTodoList';

const KanbanTodos = () => {
    const allTodos = useAppSelector(state => state.todos);
    const [cartTitle] = useState<string>();
    const [activeId, setActiveId] = useState<number | string | null>(null);
    const dispatach = useAppDispatch();

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        const activeContainer = event.active.data.current?.sortable.containerId;
        const overContainer = event.over?.data.current?.sortable.containerId;
        if (!activeContainer || !overContainer) return;
        if (activeContainer === overContainer) {
            if (active.id !== over?.id) {
                const oldIndex = allTodos.findIndex(
                    todo => todo.id === active.id
                );
                const newIndex = allTodos.findIndex(
                    todo => todo.id === over?.id
                );
                const newTodos = arrayMove(allTodos, oldIndex, newIndex);
                dispatach(changeIndex(newTodos));
            }
        } else {
            if (overContainer === 'backlog') {
                dispatach(todoMarkBacklog(active.id));
            }
            if (overContainer === 'inprogress') {
                dispatach(todoMarkInProgess(active.id));
            }
            if (overContainer === 'complete') {
                dispatach(todoMarkCompleted(active.id));
            }
        }
    };

    return (
        <div className="todo-container">
            <DndContext
                onDragEnd={handleDragEnd}
                onDragStart={({ active }) => {
                    setActiveId(active.id);
                }}
            >
                <Header />

                <div className="flex gap-4 m-4">
                    {cartTitle.map(item => {
                        return (
                            <SortableContext
                                key={item}
                                id={item}
                                items={allTodos}
                                strategy={rectSortingStrategy}
                            >
                                <KanbanTodoList id={item}>
                                    {allTodos
                                        .filter(a => a.status === item)
                                        .map(item => (
                                            <TodoItem
                                                key={item.id}
                                                todo={item}
                                            />
                                        ))}
                                </KanbanTodoList>
                            </SortableContext>
                        );
                    })}
                </div>
                {createPortal(
                    <DragOverlay>
                        {activeId ? (
                            <TodoItem
                                todo={
                                    allTodos.filter(
                                        item => item.id === activeId
                                    )[0]
                                }
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
};

export default KanbanTodos;
