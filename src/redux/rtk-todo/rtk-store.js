import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./rtk-fetch";
import posttwoReducer from "./trk-fetchTwo";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    postTwo: posttwoReducer,
  },
});

export default store;
