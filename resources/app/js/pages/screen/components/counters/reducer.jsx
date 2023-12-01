import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
    name: "reducer",
    initialState: {
        data: {
            config: null,
            tickets: [],
            current: null,
            served: 0,
            total: 0,
            account_type: null,
        },
        param: {
            screen_id: null,
            account_type_id: null,
        },
    },
    reducers: {
        setData: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        setParam: (state, action) => {
            state.param = {
                ...state.param,
                ...action.payload,
            };
        },
    },
});

export const { setData, setParam } = reducer.actions;

export default reducer.reducer;
