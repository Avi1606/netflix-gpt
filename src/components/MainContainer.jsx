import React from 'react';
import VideoContainer from "./VideoContainer.jsx";
import TitleContainer from "./TitleContainer.jsx";
import {useSelector} from "react-redux";
import ShimmerUI from "../Utils/ShimmerUI.jsx";

const MainContainer = () => {
    const movies = useSelector(store => store.movies.nowPlayingMovies);


    if(!movies) {
        return <ShimmerUI />;
    }

    const mainMovie = movies[0];
    //console.log(mainMovie.id);

    const {original_title, overview} = mainMovie;

    return (
        <div>
            <TitleContainer title={original_title} overview={overview} />
            <VideoContainer movieid={mainMovie.id}/>
        </div>
    );
};

export default MainContainer;