import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../pages/screen/components/counters/reducer";
import colorReducer from "../pages/screen/components/colors/reducer";

export default configureStore({
    reducer: {
        counter: counterReducer,
        color: colorReducer,
    },
});
