import {API_OPTIONS} from "../Utils/Constants.jsx";
import {addTrailerVideo} from "../App/moviesSlice.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const useMovieVideo = (movieid) => {

    const dispatch = useDispatch();

    const fetchVideo = async () => {
       const data =
           await fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,
               API_OPTIONS);

        const json = await data.json();

        const filterData = json.results.filter(video => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];

        dispatch(addTrailerVideo(trailer));

    };

    useEffect(() => {
        fetchVideo();
    }, []);
}

export default useMovieVideo;