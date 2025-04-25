import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import ShimmerUI from "../Utils/ShimmerUI.jsx";
import useMovieVideo from "../hooks/useMovieVideo.jsx";

const VideoContainer = ({video}) => {

    const trailerFetch = useSelector(store =>store.movies.trailerVideo);

    useMovieVideo();
    //const [trailer, setTrailer] = useState(null);


     return !trailerFetch ? <ShimmerUI />
         : (
        <div className="w-screen">
            <iframe
                className="w-full aspect-video"
                src={"https://www.youtube.com/embed/"+trailerFetch.key+"?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist="+trailerFetch.key}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
        </div>
    );
};
export default VideoContainer;