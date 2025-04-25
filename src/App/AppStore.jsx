import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import movieReducer from "./moviesSlice.jsx";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: movieReducer
    },
});

export default appStore;
