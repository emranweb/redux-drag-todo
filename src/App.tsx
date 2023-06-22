import React from 'react';

// import Footer from './components/Footer';
// import Header from './components/Header';
// import Navbar from './components/Navbar';
// import TodoList from './components/TodoList';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import Completed from './components/Completed';
import Board from './dndkit/Board';

function App() {
  return (
    // <DndProvider backend={HTML5Backend}>
    //   <div className="App">
    //     <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
    //       <Navbar />

    //       <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
    //         <Header />
    //         <hr className="mt-4" />
    //         <Completed>
    //           <TodoList />
    //         </Completed>
    //         <hr className="mt-4" />
    //         <Footer />
    //       </div>

    //       <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white"></div>
    //     </div>
    //   </div>
    // </DndProvider>
    <Board />
  );
}

export default App;
