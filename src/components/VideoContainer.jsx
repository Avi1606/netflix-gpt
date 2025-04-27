import React from 'react';
         import { useSelector } from "react-redux";
         import ShimmerUI from "../Utils/ShimmerUI.jsx";
         import useMovieVideo from "../hooks/useMovieVideo.jsx";

         const VideoContainer = ({movieid}) => {
             const trailerFetch = useSelector(store => store.movies.trailerVideo);

             useMovieVideo(movieid);

             return !trailerFetch ? <ShimmerUI />
                 : (
                 <div className="absolute ">
                     <iframe
                         className="w-screen aspect-video "
                         src={"https://www.youtube.com/embed/"+trailerFetch.key+"?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist="+trailerFetch.key}
                         title="YouTube video player"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         referrerPolicy="strict-origin-when-cross-origin"
                        style={{position: 'absolute', top: -100, left: 0, zIndex: -20}}
                     ></iframe>
                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                 </div>
             );
         };

         export default VideoContainer;