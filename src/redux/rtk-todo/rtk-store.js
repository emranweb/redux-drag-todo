import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./rtk-fetch";
import posttwoReducer from "./trk-fetchTwo";
import todoReducer from "./todo.js";
const store = configureStore({
    reducer: {
        todo: todoReducer,
        posts: postsReducer,
        postTwo: posttwoReducer,
    },
});

export default store;
