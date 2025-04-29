import React from 'react';
import {useSelector} from "react-redux";
import languageConstants from "../Utils/languageConstants.jsx";

const GptSearchBar = () => {

    const langKey = useSelector(store => store.language.language);

    return (
        <div className="pt-[2%] flex justify-center">
            <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
                <input
                    type="text"
                    className="col-span-9 p-4 m-4 text-white bg-gray-700 rounded-lg"
                    placeholder={languageConstants[langKey].placeholder}
                />
                <button
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800"
                >
                    {languageConstants[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;