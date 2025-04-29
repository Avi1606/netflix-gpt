import React from 'react';

const GptSearchBar = () => {
    return (
        <div className="pt-[2%] flex justify-center">
            <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
                <input
                    type="text"
                    className="col-span-9 p-4 m-4 text-white bg-gray-700 rounded-lg"
                    placeholder="What would you like to watch today?"
                />
                <button
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;