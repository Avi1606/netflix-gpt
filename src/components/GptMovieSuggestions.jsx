// GptMovieSuggestions.jsx
import React from 'react';
import MovieList from "./MovieList.jsx";
import { useSelector } from "react-redux";

const GptMovieSuggestions = () => {
    const { movieResults, movieNames } = useSelector((store) => store.gpt);

    if (!movieNames) return null;

    return (
        <div className="relative z-10">
            {/* REMOVED the fixed black overlay that was causing double-darkening */}

            {/* Content container with proper scrolling behavior */}
            <div className="max-w-[90%] mx-auto py-6 px-4 sm:px-6 md:px-8 rounded-xl
                            backdrop-blur-sm bg-black/60 border border-gray-800 shadow-2xl">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
                    Your Personalized Movie Suggestions
                </h1>

                <div className="space-y-8">
                    {movieNames.map((movieName, index) => (
                        <div key={movieName} className="movie-category">
                            <MovieList
                                title={movieName}
                                movies={movieResults[index]}
                            />

                            {/* Add subtle divider between categories except for the last one */}
                            {index < movieNames.length - 1 && (
                                <div className="w-[90%] mx-auto h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-6" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GptMovieSuggestions;