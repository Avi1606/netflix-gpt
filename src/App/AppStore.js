import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import movieReducer from "./moviesSlice.js";
import gptReducer from "./useGptSlice.js";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: movieReducer,
        gpt:gptReducer
    },
});

export default appStore;
