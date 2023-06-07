import { faker } from "@faker-js/faker";
// import {
//     TODOADD,
//     TODOCLEARALL,
//     TODOCOLORSELECT,
//     TODOCOMPLETEALL,
//     TODODELETE,
//     TODOLOADED,
//     TODOTOGGLED,
// } from "./todoActionTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: faker.datatype.uuid(),
        text: "First Text",
        complete: true,
        color: "green",
    },
    {
        id: faker.datatype.uuid(),
        text: "Second  Text",
        complete: false,
        color: "red",
    },
];

// const todoReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case TODOLOADED:
//             return action.payload;

//         case TODOADD:
//             return [...state, action.payload];

//         case TODOCOMPLETEALL:
//             return state.map((item) => {
//                 return { ...item, complete: true };
//             });

//         case TODOCLEARALL:
//             return state.filter((item) => !item.complete);

//         case TODODELETE:
//             return state.filter((item) => item.id !== action.payload);

//         case TODOCOLORSELECT:
//             const { id, color } = action.payload;
//             return state.map((item) => {
//                 if (item.id !== id) {
//                     return item;
//                 }
//                 return { ...item, color: color };
//             });

//         case TODOTOGGLED:
//             return state.map((item) => {
//                 if (item.id !== action.payload) {
//                     return item;
//                 }
//                 return {
//                     ...item,
//                     completed: !item.completed,
//                 };
//             });

//         default:
//             return state;
//     }
// };

// create a root reducer with createSlice
const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        todoLoaded: (state, action) => {
            return action.payload;
        },
        todoAdd: (state, action) => {
            return [...state, action.payload];
        },
        todoCompleteAll: (state, action) => {
            return state.map((item) => {
                return { ...item, complete: true };
            });
        },
        todoClearAll: (state, action) => {
            return state.filter((item) => !item.complete);
        },
        todoDelete: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        todoColorSelect: (state, action) => {
            const { id, color } = action.payload;
            return state.map((item) => {
                if (item.id !== id) {
                    return item;
                }
                return { ...item, color: color };
            });
        },
        todoToggled: (state, action) => {
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

export const {
    todoLoaded,
    todoAdd,
    todoCompleteAll,
    todoClearAll,
    todoDelete,
    todoColorSelect,
    todoToggled,
} = todosSlice.actions;
export default todosSlice.reducer;
