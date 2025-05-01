import React from 'react';

const GptMovieSuggestions = () => {
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10 
                      bg-black bg-opacity-80 
                      rounded-lg shadow-lg
                      mt-4 sm:mt-6 md:mt-8
                      mx-auto max-w-7xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-4 md:mb-6">
                Your Recommended Movies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Movie suggestions will appear here */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-5 h-40 animate-pulse flex flex-col justify-between">
                    <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-8 bg-red-700 rounded w-1/3"></div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 md:p-5 h-40 animate-pulse flex flex-col justify-between">
                    <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-8 bg-red-700 rounded w-1/3"></div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 md:p-5 h-40 animate-pulse flex flex-col justify-between">
                    <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-8 bg-red-700 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

export default GptMovieSuggestions;