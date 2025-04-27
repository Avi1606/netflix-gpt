import React from 'react';
import MovieList from "./MovieList.jsx";
import { useSelector } from "react-redux";

const SecondContainer = () => {
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);
    const popularMovies = useSelector(store => store.movies.popularMovies);
    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);
    const upComingMovies = useSelector(store => store.movies.upComingMovies);

    if (!nowPlayingMovies || !popularMovies || !topRatedMovies || !upComingMovies) return null;

    return (

        <div className=" ">
            <div className="relative -mt-20 z-10">
                <MovieList title="Popular Movies" movies={popularMovies}/>
                <MovieList title="Now Playing" movies={nowPlayingMovies}/>
                <MovieList title="Upcoming" movies={upComingMovies}/>
                <MovieList title="Top Rated" movies={topRatedMovies}/>
            </div>
        </div>

    );

};

export default SecondContainer;