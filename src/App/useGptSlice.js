import {createSlice} from "@reduxjs/toolkit";

const useGptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptPage: false,
    },
    reducers: {
        setShowGptPage(state) {
            state.showGptPage = !state.showGptPage;
        },
    }
});

export const {setShowGptPage} = useGptSlice.actions;

export default useGptSlice.reducer;
