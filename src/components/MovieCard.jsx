import React from 'react';
import {MOVIEPOSTER_URL} from "../Utils/Constants.jsx";

const MovieCard = ({imageID}) => {
    return (
        <div className="w-36 md:w-48 pr-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
            <img
                src={MOVIEPOSTER_URL + imageID}
                alt="Movie poster"
                className="rounded-lg object-cover w-full shadow-lg"
            />
        </div>
    );
};

export default MovieCard;