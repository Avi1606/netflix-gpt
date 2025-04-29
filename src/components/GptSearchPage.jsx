import React from 'react';
import GptSearchBar from "./GptSearchBar.jsx";
import GptMovieSuggestions from "./GptMovieSuggestions.jsx";
import {background_URL} from "../Utils/Constants.jsx";

const GptSearchPage = () => {
    return (
        <div>
            <div>
                <img src={background_URL} alt="background"
                     className="absolute w-full h-full object-cover -z-30 bg-gradient-to-b from-black"/>;
            </div>
            <div className="pt-40 min-h-screen ">
                <GptSearchBar/>
                <GptMovieSuggestions/>
            </div>
        </div>
    );
};

export default GptSearchPage;