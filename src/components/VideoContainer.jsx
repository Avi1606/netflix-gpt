import React from 'react';
         import { useSelector } from "react-redux";
         import ShimmerUI from "../Utils/ShimmerUI.jsx";
         import useMovieVideo from "../hooks/useMovieVideo.jsx";

         const VideoContainer = ({movieid}) => {
             const trailerFetch = useSelector(store => store.movies.trailerVideo);

             useMovieVideo(movieid);

             return !trailerFetch ? <ShimmerUI />
                 : (
                 <div className="absolute w-screen">
                     <iframe
                         className="w-screen aspect-video bg-gradient-to-r from-black "
                         src={"https://www.youtube.com/embed/"+trailerFetch.key+"?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist="+trailerFetch.key}
                         title="YouTube video player"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                         referrerPolicy="strict-origin-when-cross-origin"
                        style={{position: 'absolute', top: -105, left: 0, zIndex: -10}}
                     ></iframe>
                     {/*<div className="absolute inset-0 bg-gradient-to-r from-black/28"></div>*/}
                 </div>
             );
         };

         export default VideoContainer;