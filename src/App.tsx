import React from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import CompletedTodo from './components/CompletedTodo';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from './hooks/app';
import {
  todoMarkCompleted,
  todoMarkInProgess,
} from './features/todos/todoSlice';
import InProgressTodo from './components/InProgressTodo';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
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

  return (
    <div className="App">
      <div className="grid place-items-center bg-blue-100  px-6 font-sans">
        <Navbar />
        <DndContext onDragEnd={handleDragEnd}>
          <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-40">
            <Header />
          </div>
          <InProgressTodo>
            <TodoList todos={inCompletedTodos} />
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
