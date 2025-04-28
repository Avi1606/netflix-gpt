
import React from 'react';
import GptSearchBar from "./GptSearchBar.jsx";
import GptMovieSuggestions from "./GptMovieSuggestions.jsx";

const GptSearchPage = () => {
    return (
        <div className="pt-40 min-h-screen ">
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    );
};

export default GptSearchPage;