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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { todo } from 'node:test';

function App() {
  const allTodos = useAppSelector(state => state.todos);
  const inCompletedTodos = allTodos.filter(todo => todo.completed === false);
  const completedTodos = allTodos.filter(todo => todo.completed === true);

  const dispatach = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent): void => {
    console.log(event);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = inCompletedTodos.findIndex(
        todo => todo.id === active.id
      );
      const newIndex = inCompletedTodos.findIndex(todo => todo.id === over?.id);
      const newTodos = arrayMove(inCompletedTodos, oldIndex, newIndex);
      dispatach(changeIndex(newTodos));
      console.log(newTodos);
    }
  };
  const handleDragOver = (event: DragOverEvent): void => {
    // const overId = event.over?.id;
    // if (!overId) return;
    // const activeContainer = event.active.data.current?.sortable.containerId;
    // const overContainer = event.over?.data.current?.sortable.containerId;
    // if (!overContainer) return;
    console.log('evnet Over');
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
              id="inprogress-sortable"
              items={inCompletedTodos}
              strategy={verticalListSortingStrategy}
            >
              <TodoList todos={inCompletedTodos} />
            </SortableContext>
          </InProgressTodo>
          <CompletedTodo>
            <SortableContext
              id="completed-sortable"
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
