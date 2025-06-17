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
        <div className="relative">
            {/* Netflix-style gradient overlay */}
            <div className="absolute top-0 left-0 w-full h-[100px] sm:h-[120px] md:h-[150px] bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.4)] to-black -mt-[100px] sm:-mt-[120px] md:-mt-[150px] z-10"></div>

            {/* Movie lists with black background */}
            <div className="relative bg-black -mt-[100px] sm:-mt-[120px] md:-mt-[150px] z-20 pt-6 sm:pt-8 md:pt-10">
                <MovieList title="Popular Movies" movies={popularMovies}/>
                <MovieList title="Now Playing" movies={nowPlayingMovies}/>
                <MovieList title="Upcoming" movies={upComingMovies}/>
                <MovieList title="Top Rated" movies={topRatedMovies}/>
            </div>
        </div>
    );
};

export default SecondContainer;