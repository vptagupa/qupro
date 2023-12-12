import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountTypes: [],
};

export const reducer = createSlice({
    name: "tellerReducer",
    initialState,
    reducers: {
        setAccountTypes: (state, action) => {
            state.accountTypes = action.payload;
        },
    },
});

export const { setAccountTypes } = reducer.actions;

export default reducer.reducer;
