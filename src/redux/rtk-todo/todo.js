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

const todosReducerSlice = createSlice({
    name: "todo",
    initialState: todos,
    reducers: {
        add: (state, action) => {
            return [...state, action.payload];
        },
        todoToggle: (state, action) => {
            return state.map((item) => {
                if (item.id !== action.payload) {
                    return item;
                }
                return {
                    ...item,
                    completed: !item.completed,
                };
            });
        },
    },
});

export const { add, todoToggle } = todosReducerSlice.actions;

export default todosReducerSlice.reducer;
