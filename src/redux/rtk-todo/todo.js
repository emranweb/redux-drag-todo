// create slice

const { createSlice } = require("@reduxjs/toolkit");

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
    color: "green",
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
    color: "green",
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
    color: "green",
  },
];

const todoReducerSlice = createSlice({
  name: "todo",
  initialState: todos,
  reducers: {
    add: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { add } = todoReducerSlice.actions;

export default todoReducerSlice.reducer;
