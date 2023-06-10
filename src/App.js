import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import { fetchPost } from './redux/rtk-todo/rtk-fetch';
import { fetchPostTwo } from './redux/rtk-todo/trk-fetchTwo';

function App() {
  //   const [data, setData] = useState('');
  const dispatch = useDispatch();
  const state = useSelector(state => state.posts);
  //   const state2 = useSelector(state => state.postTwo);

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  useEffect(() => {
    if (!state.loading) {
      const title = state.posts[1].title;
      const [text] = title.split(' ').slice(-1);
      dispatch(fetchPostTwo(text));
    }
  }, [state, dispatch]);

  return (
    <div className="App">
      <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
        <Navbar />

        <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
          <Header />
          <hr className="mt-4" />
          <TodoList />
          <hr className="mt-4" />
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
