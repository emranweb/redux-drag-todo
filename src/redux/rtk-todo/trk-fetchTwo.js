import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  posts: [],
  error: "",
};

export const fetchPostTwo = createAsyncThunk("posttwo/fetch", async (text) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?title_like=${text}`
  );
  const data = await response.json();
  console.log(data);
  return data;
});

const postsTwoReducerSlice = createSlice({
  name: "posttwo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostTwo.pending, (state, action) => {
      state.loading = true;
      state.posts = [];
      state.error = "";
    });
    builder.addCase(fetchPostTwo.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPostTwo.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export default postsTwoReducerSlice.reducer;
