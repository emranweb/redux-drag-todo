import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    complete: "all",
    color: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {},
});

export default filterSlice.reducer;
