import React from 'react';
import {MOVIEPOSTER_URL} from "../Utils/Constants.jsx";

const MovieCard = ({imageID}) => {
    return (
        <div>
            <img src={MOVIEPOSTER_URL + imageID} alt="Movie poster"/>

        </div>
    );
};

export default MovieCard;