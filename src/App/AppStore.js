import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import movieReducer from "./moviesSlice.js";
import gptReducer from "./useGptSlice.js";
import languageReducer from "./useLanguageSlice.js";
import interviewReducer from "./interviewSlice.js";
import questionBankReducer from "./questionBankSlice.js";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: movieReducer,
        gpt:gptReducer,
        language:languageReducer,
        interview: interviewReducer,
        questionBank: questionBankReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['interview/setMediaStream'],
                ignoredPaths: ['interview.mediaStream'],
            },
        }),
});

export default appStore;
