import React from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import CompletedTodo from './components/CompletedTodo';
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
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

function App() {
  const allTodos = useAppSelector(state => state.todos);
  const inCompletedTodos = allTodos.filter(todo => todo.completed === false);
  const completedTodos = allTodos.filter(todo => todo.completed === true);

  const dispatach = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = inCompletedTodos.findIndex(
        todo => todo.id === active.id
      );
      const newIndex = inCompletedTodos.findIndex(todo => todo.id === over?.id);
      const newTodos = arrayMove(inCompletedTodos, oldIndex, newIndex);
      dispatach(changeIndex(newTodos));
    }
  };
  const handleDragOver = (event: DragOverEvent): void => {
    console.log(event);
    const overId = event.over?.id;
    if (!overId) return;
    const activeContainer = event.active.data.current?.sortable.containerId;
    const overContainer = event.over?.data.current?.sortable.containerId;
    console.log(overContainer);
    if (!overContainer) return;
    if (activeContainer !== overContainer) {
      console.log('handleDrap Over');
      console.log(activeContainer);
      console.log(overContainer);
    }
  };

  return (
    <div className="App">
      <div className="grid place-items-center bg-blue-100  px-6 font-sans">
        <Navbar />
        <DndContext onDragOver={handleDragOver}>
          <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-40">
            <Header />
          </div>

          <SortableContext
            id="inprogress-sortable"
            items={inCompletedTodos}
            strategy={rectSortingStrategy}
          >
            <InProgressTodo>
              <TodoList todos={inCompletedTodos} />
            </InProgressTodo>
          </SortableContext>

          <SortableContext
            id="completed-sortable"
            items={completedTodos}
            strategy={rectSortingStrategy}
          >
            <CompletedTodo>
              <TodoList todos={completedTodos} />
            </CompletedTodo>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
