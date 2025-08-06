import {createSlice} from "@reduxjs/toolkit";

const useLanguageSlice = createSlice({
    name: 'language',
    initialState: {
        language: 'en',
    },
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload;
        },
    },
});

export const {setLanguage} = useLanguageSlice.actions;

export default useLanguageSlice.reducer;