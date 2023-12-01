import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../pages/screen/components/counters/reducer";
import themeCounterReducer from "../pages/screen/components/theme/counter/reducer";
import themeMediaReducer from "../pages/screen/components/theme/media/reducer";

export default configureStore({
    reducer: {
        counter: counterReducer,
        themeCounter: themeCounterReducer,
        themeMedia: themeMediaReducer,
    },
});
