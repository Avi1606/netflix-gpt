import React from 'react';
import MovieList from "./MovieList.jsx";
import { useSelector } from "react-redux";

const SecondContainer = () => {
    const movies = useSelector(store => store.movies.nowPlayingMovies);

    if (!movies) return null;

    return (
        <div className="">
            <MovieList title="Now Playing" movies={movies} />
            <MovieList title="Now Playing" movies={movies} />
            <MovieList title="Now Playing" movies={movies} />
            <MovieList title="Now Playing" movies={movies} />
            <MovieList title="Now Playing" movies={movies} />
             </div>
    );
};

export default SecondContainer;