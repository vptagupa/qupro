import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    media: {
        set: {
            bg: null,
            font: null,
        },
    },
    message: {
        set: {
            bg: null,
            font: null,
        },
    },
};
export const reducer = createSlice({
    name: "themeMediaReducer",
    initialState: initialState,
    reducers: {
        set: (state, action) => {
            const selector = "media";
            const type = "set";
            state[selector] = {
                ...state[selector],
                [type]: {
                    ...state[selector][type],
                    ...action.payload,
                },
            };
        },
        setMessage: (state, action) => {
            const selector = "message";
            const type = "set";
            state[selector] = {
                ...state[selector],
                [type]: {
                    ...state[selector][type],
                    ...action.payload,
                },
            };
        },
        replace: (state, action) => {
            state.media = {
                ...state.media,
                ...(action.payload?.media ?? initialState.media),
            };
            state.message = {
                ...state.message,
                ...(action.payload?.message ?? initialState.message),
            };
        },
    },
});

export const { set, setMessage, replace } = reducer.actions;

export default reducer.reducer;
