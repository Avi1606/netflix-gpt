import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./UserSlice.jsx"

const AppStore = configureStore({
    reducer: {
        user : userReducer,
    },
});

export default AppStore;