import React from 'react';
import { useSelector } from "react-redux";
import ShimmerUI from "../Utils/ShimmerUI.jsx";
import useMovieVideo from "../hooks/useMovieVideo.jsx";

const VideoContainer = ({movieid}) => {
    const trailerFetch = useSelector(store => store.movies.trailerVideo);

    useMovieVideo(movieid);

    return !trailerFetch ? <ShimmerUI />
        : (
        <div className="relative w-full h-full">
            <iframe
                className="w-full h-full object-cover"
                src={"https://www.youtube.com/embed/"+trailerFetch.key+"?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist="+trailerFetch.key}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -10
                }}
            ></iframe>
        </div>
    );
};

export default VideoContainer;