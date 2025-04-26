import React from 'react';
import MovieCard from "./MovieCard.jsx";

const MovieList = ({ title, movies }) => {
        if (!movies) return null;

        return (
            <div className="px-6 my-0">
                <h1 className="text-xl md:text-2xl font-bold text-black mb-2">{title}</h1>
                <div className="relative">
                    <div className="flex overflow-scroll scrollbar-hide gap-4 py-4">
                        {movies.map((movie) => (
                            <div className="flex-shrink-0 w-36 md:w-48 transition-transform duration-300 hover:scale-110">
                                <MovieCard key={movie.id} imageID={movie.poster_path}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
};

export default MovieList;

