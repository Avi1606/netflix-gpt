import React from 'react';
import MovieList from "./MovieList.jsx";
import { useSelector } from "react-redux";

const SecondContainer = () => {
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const popularMovies = useSelector(store => store.movies.popularMovies);

    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

    const upComingMovies = useSelector(store => store.movies.upComingMovies);

    if (!nowPlayingMovies) return null;

    if(!popularMovies) return null;

    if(!topRatedMovies) return null;

    if(!upComingMovies) return null;


    return (
        <div className="-mt-35 bg-black">
            <MovieList title="Now Playing" movies={nowPlayingMovies} />
            <MovieList title="Top Rated" movies={topRatedMovies} />
            <MovieList title="Upcoming" movies={upComingMovies} />
            <MovieList title="Popular Movies" movies={popularMovies} />
             </div>
    );
};

export default SecondContainer;