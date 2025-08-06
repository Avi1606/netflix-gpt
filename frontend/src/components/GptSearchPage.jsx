import React from 'react';
import GptSearchBar from "./GptSearchBar.jsx";
import GptMovieSuggestions from "./GptMovieSuggestions.jsx";
import { background_URL } from "../Utils/Constants.jsx";
import { useSelector } from "react-redux";
import Header from "./Header.jsx";

const GptSearchPage = () => {
    const { movieNames } = useSelector((store) => store.gpt);
    const hasResults = movieNames && movieNames.length > 0;

    return (
        <div className="min-h-screen relative">

            <div className="fixed inset-0 -z-10">
                <img
                    src={background_URL}
                    alt="background"
                    className="w-full h-full object-cover"
                />

                <div className={`absolute inset-0 ${hasResults
                    ? 'bg-gradient-to-b from-black/70 via-black/40 to-black/70'
                    : 'bg-gradient-to-b from-black/50 via-black/30 to-black/50'}`}
                ></div>
            </div>


            <div className="relative z-20">
                <Header />
            </div>

            <div className="relative z-10 pt-[100px] pb-16 min-h-screen">
                <GptSearchBar />

                {hasResults && (
                    <div className="mt-8">
                        <GptMovieSuggestions />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GptSearchPage;