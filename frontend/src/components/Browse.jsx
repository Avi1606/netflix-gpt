import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying.jsx";
import SecondContainer from "./SecondContainer.jsx";
import MainContainer from "./MainContainer.jsx";
import usePopularMovies from "../hooks/usePopularMovies.jsx";
import useTopRatedMovies from "../hooks/useTopRatedMovies.jsx";
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx";
import GptSearchPage from "./GptSearchPage.jsx";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import ErrorMessage from "./ErrorMessage.jsx";

const Browse = () => {
    const showgptpage = useSelector(store => store.gpt.showGptPage);
    // Remove apiError and isLoading state and related logic

    // Remove useEffect with fetch override and error handling

    useNowPlaying();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    // Remove apiError check and ErrorMessage rendering

    return (
        <div>
            <Header />
            {showgptpage ?
                <>
                    <GptSearchPage />
                </>
                :
                <>
                    <MainContainer />
                    <SecondContainer />
                </>
            }
        </div>
    );
};

export default Browse;
