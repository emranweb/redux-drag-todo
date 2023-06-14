import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import { DndContext } from '@dnd-kit/core';

function App() {
  return (
    <div className="App">
      <DndContext>
        <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
          <Navbar />

          <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
            <Header />
            <hr className="mt-4" />
            <TodoList />
            <hr className="mt-4" />
            <Footer />
          </div>

          <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
            <TodoList />
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default App;
