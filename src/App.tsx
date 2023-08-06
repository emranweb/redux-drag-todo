import React from 'react';

import Navbar from './components/Navbar';
import KanbanTodos from './kanban-todo/KanbanTodos';
import DNDChildren from './dnd-child/DNDChildren';

function App() {
    return (
        <div className="App">
            <div className="  px-6 font-sans">
                <Navbar />
                <KanbanTodos />
                <DNDChildren />
            </div>
        </div>
    );
}

export default App;
