import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import languageConstants from "../Utils/languageConstants.jsx";
import client from "../Utils/OpenAI.jsx";


const GptSearchBar = () => {
    const searchText = useRef(null);

    const langKey = useSelector(store => store.language.language);

    const handleSearchButton = async () => {

        const query = "Act as a movie recommendation system and suggest only 5 best movies for "
            + searchText.current.value + ". Please give me names of those movies separated by commas without any explanation or additional text";

        const response = await client.responses.create({
            model: "gpt-3.5-turbo",
            input: query,
        });

        console.log(response.text);
    }

    return (
        <div className="pt-[2%] flex justify-center">
            <form onSubmit={(e) => e.preventDefault()}
                className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
                <input ref={searchText}
                    type="text"
                    className="col-span-9 p-4 m-4 text-white bg-gray-700 rounded-lg"
                    placeholder={languageConstants[langKey].placeholder}
                />
                <button onClick={handleSearchButton}
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800"
                >
                    {languageConstants[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;