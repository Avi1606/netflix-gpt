import {API_OPTIONS} from "../Utils/Constants.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addPopularMovies} from "../App/moviesSlice.js";

const usePopularMovies = () => {

    const dispatch = useDispatch();

    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',
            API_OPTIONS);

        const json = await data.json();

        dispatch(addPopularMovies(json.results));
        //console.log(json);
    };

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
};

export default usePopularMovies;