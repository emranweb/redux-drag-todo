import React from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import CompletedTodo from './components/CompletedTodo';
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from './hooks/app';
import {
  todoMarkCompleted,
  todoMarkInProgess,
} from './features/todos/todoSlice';
import InProgressTodo from './components/InProgressTodo';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function App() {
  const allTodos = useAppSelector(state => state.todos);
  const inCompletedTodos = allTodos.filter(todo => todo.completed === false);
  const completedTodos = allTodos.filter(todo => todo.completed === true);

  const dispatach = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent): void => {
    if (event.over && event.over.id === 'completed') {
      dispatach(todoMarkCompleted(event.active.id));
    }
    if (event.over && event.over.id === 'inprogress') {
      dispatach(todoMarkInProgess(event.active.id));
    }
  };
  const handleDragOver = (event: DragOverEvent): void => {
    console.log(event);
  };

  return (
    <div className="App">
      <div className="grid place-items-center bg-blue-100  px-6 font-sans">
        <Navbar />
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
          <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-40">
            <Header />
          </div>
          <InProgressTodo>
            <SortableContext
              items={inCompletedTodos}
              strategy={verticalListSortingStrategy}
            >
              <TodoList todos={inCompletedTodos} />
            </SortableContext>
          </InProgressTodo>
          <CompletedTodo>
            <SortableContext
              items={completedTodos}
              strategy={verticalListSortingStrategy}
            >
              <TodoList
                todos={completedTodos.length > 0 ? completedTodos : []}
              />
            </SortableContext>
          </CompletedTodo>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
