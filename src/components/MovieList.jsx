import React from 'react';
import MovieCard from "./MovieCard.jsx";

const MovieList = ({ title, movies }) => {
        if (!movies) return null;

        return (
            <div className="relative px-1">
                <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
                <div className="overflow">
                    <div className="flex overflow-x-scroll overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                        {/* Extend Tailwind with a custom class for WebKit browsers */}
                        <style jsx>{`
                            .flex::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {movies.map((movie) => (
                            <div key={movie.id}
                                 className="flex-shrink-0 w-46 md:w-48 transition-transform duration-300 hover:scale-110 mr-2 md:mr-3">
                                <MovieCard imageID={movie.poster_path}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
};

export default MovieList;

