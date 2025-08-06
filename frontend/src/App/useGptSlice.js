import {createSlice} from "@reduxjs/toolkit";

const useGptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptPage: false,
        movieResults: null,
        movieNames: null,
    },
    reducers: {
        setShowGptPage(state) {
            state.showGptPage = !state.showGptPage;
        },
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    }
});

export const {setShowGptPage,addGptMovieResult} = useGptSlice.actions;

export default useGptSlice.reducer;
