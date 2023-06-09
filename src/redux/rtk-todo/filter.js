import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    complete: "all",
    color: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilterComplete: (state, action) => {
            state.complete = action.payload;
        },
        toggleFilterColor: (state, action) => {
            const colorType = state.color.includes(action.payload);
            if (colorType) {
                state.color = state.color.filter(
                    (item) => item !== action.payload
                );
            } else {
                state.color.push(action.payload);
            }
        },
    },
});

export const { setFilterComplete, toggleFilterColor } = filterSlice.actions;

export default filterSlice.reducer;
