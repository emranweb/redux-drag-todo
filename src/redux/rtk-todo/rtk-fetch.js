const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  loading: true,
  posts: [],
  errror: '',
};

export const fetchPost = createAsyncThunk('posts/fetchposts', async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = response.json();
  return data;
});

const postReducerSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPost.pending, state => {
      state.loading = true;
      state.posts = [];
      state.error = '';
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = '';
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export default postReducerSlice.reducer;
