import React from 'react';
import Header from "./Header.jsx";

const Browse = () => {
    return (
        <div>
            <div className="flex">
                <Header/>
            </div>
           <div className="flex justify-end">
                <button className="text-white p-3 m-4 bg-red-600 flex flex-row rounded-xl cursor-pointer">Logout</button>
            </div>

        </div>
    );
};

export default Browse;