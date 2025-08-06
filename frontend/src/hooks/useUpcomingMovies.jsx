import {API_OPTIONS} from "../Utils/Constants.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { addUpComingMovies} from "../App/moviesSlice.js";

const useUpcomingMovies = () => {

    const dispatch = useDispatch();

    const getUpcomingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1',
            API_OPTIONS);

        const json = await data.json();

        dispatch(addUpComingMovies(json.results));
    };

        useEffect(() => {
            getUpcomingMovies();
        }, []);
    };

export default useUpcomingMovies;