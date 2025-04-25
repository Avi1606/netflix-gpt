import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import movieSlice from "../components/moviesSlice.jsx";

const appStore = configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice
    },
});

export default appStore;
