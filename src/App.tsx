import React from 'react';

import Navbar from './components/Navbar';
import KanbanTodos from './kanban-todo/KanbanTodos';
import DNDChildren from './dnd-child/DNDChildren';
import Header from './components/Header';

function App() {
    return (
        <div className="App">
            <div className="font-sans">
                <Navbar />
                <Header />
                {/* <KanbanTodos /> */}
                <DNDChildren />
            </div>
        </div>
    );
}

export default App;
