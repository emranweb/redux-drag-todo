import React, { useState } from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import CompletedTodo from './components/CompletedTodo';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
} from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from './hooks/app';
import {
    changeIndex,
    todoMarkCompleted,
    todoMarkInProgess,
} from './features/todos/todoSlice';
import InProgressTodo from './components/InProgressTodo';
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { adjustScale } from '@dnd-kit/core/dist/utilities';
import TodoItem from './components/TodoItem';

function App() {
    const allTodos = useAppSelector(state => state.todos);
    const inCompletedTodos = allTodos.filter(todo => todo.completed === false);
    const completedTodos = allTodos.filter(todo => todo.completed === true);
    const [activeId, setActiveId] = useState<number | string | null>(null);
    const [containers, setContainers] = useState<string | null>('');
    const dispatach = useAppDispatch();

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        const activeContainer = event.active.data.current?.sortable.containerId;
        const overContainer = event.over?.data.current?.sortable.containerId;
        if (activeContainer !== overContainer) {
            dispatach(todoMarkCompleted(active.id));
        } else {
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
        }
    };
    // const handleDragOver = (event: DragOverEvent): void => {
    //   const overId = event.over?.id;
    //   if (!overId) return;
    //   const activeContainer = event.active.data.current?.sortable.containerId;
    //   const overContainer = event.over?.data.current?.sortable.containerId;

    //   if (!overContainer) return;
    //   if (activeContainer !== overContainer) {
    //     dispatach(todoMarkCompleted(activeId));
    //   }
    // };

    console.log(activeId);

    return (
        <div className="App">
            <div className="grid place-items-center bg-blue-100  px-6 font-sans">
                <Navbar />
                <DndContext
                    onDragEnd={handleDragEnd}
                    onDragStart={({ active }) => {
                        setActiveId(active.id);
                    }}
                >
                    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-40">
                        <Header />
                    </div>

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
        </div>
    );
}

export default App;
