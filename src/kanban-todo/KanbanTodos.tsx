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
import BacklogTodo from '../components/BacklogTodo';
import TodoItem from '../components/TodoItem';
import InProgressTodo from '../components/InProgressTodo';
import CompletedTodo from '../components/CompletedTodo';
import { createPortal } from 'react-dom';

const KanbanTodos = () => {
    const allTodos = useAppSelector(state => state.todos);
    const backlogTodos = allTodos.filter(todo => todo.status === 'backlog');
    const inCompletedTodos = allTodos.filter(
        todo => todo.status === 'inprogress'
    );
    const completedTodos = allTodos.filter(todo => todo.status === 'done');
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
            if (overContainer === 'backlog-sortable') {
                dispatach(todoMarkBacklog(active.id));
            }
            if (overContainer === 'inprogress-sortable') {
                dispatach(todoMarkInProgess(active.id));
            }
            if (overContainer === 'completed-sortable') {
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
                <div className="w-full  shadow-lg rounded-lg p-6 bg-white mt-40">
                    <Header />
                </div>

                <div className="flex gap-4 m-4">
                    <SortableContext
                        id="backlog-sortable"
                        items={backlogTodos}
                        strategy={rectSortingStrategy}
                    >
                        <BacklogTodo>
                            {backlogTodos.map(item => (
                                <TodoItem key={item.id} todo={item} />
                            ))}
                        </BacklogTodo>
                    </SortableContext>
                    <SortableContext
                        id="inprogress-sortable"
                        items={inCompletedTodos}
                        strategy={rectSortingStrategy}
                    >
                        <InProgressTodo>
                            {inCompletedTodos.map(item => (
                                <TodoItem key={item.id} todo={item} />
                            ))}
                        </InProgressTodo>
                    </SortableContext>

                    <SortableContext
                        id="completed-sortable"
                        items={completedTodos}
                        strategy={rectSortingStrategy}
                    >
                        <CompletedTodo>
                            {completedTodos.map(item => (
                                <TodoItem key={item.id} todo={item} />
                            ))}
                        </CompletedTodo>
                    </SortableContext>
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
