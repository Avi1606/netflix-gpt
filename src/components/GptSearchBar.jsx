import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import languageConstants from "../Utils/languageConstants.jsx";
import client from "../Utils/OpenAI.jsx";

const GptSearchBar = () => {
    const searchText = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const langKey = useSelector(store => store.language.language);

    const handleSearchButton = async () => {
        if (!searchText.current.value.trim()) return;
        
        setIsLoading(true);
        
        const query = "Act as a movie recommendation system and suggest only 5 best movies for "
            + searchText.current.value + ". Please give me names of those movies separated by commas without any explanation or additional text";

        try {
            const response = await client.responses.create({
                model: "gpt-3.5-turbo",
                input: query,
            });

            console.log(response.text);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="pt-4 md:pt-8 px-4 sm:px-8 w-full flex justify-center">
            <form onSubmit={(e) => e.preventDefault()}
                className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 
                          bg-black bg-opacity-80 
                          border border-gray-800
                          shadow-lg 
                          grid grid-cols-12 gap-2 
                          rounded-xl p-2 sm:p-3"
            >
                <input 
                    ref={searchText}
                    type="text"
                    className="col-span-12 sm:col-span-8 
                              p-3 sm:p-4 m-1 
                              text-white bg-gray-800 rounded-lg
                              border border-gray-700 focus:border-red-500
                              placeholder-gray-400
                              focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder={languageConstants[langKey].placeholder}
                />
                <button 
                    onClick={handleSearchButton}
                    disabled={isLoading}
                    className="col-span-12 sm:col-span-4 
                              py-3 m-1 
                              bg-red-600 text-white font-semibold rounded-lg 
                              hover:bg-red-700 active:bg-red-800
                              transition-colors duration-300
                              disabled:bg-gray-700 disabled:text-gray-300
                              flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>{languageConstants[langKey].search}</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;