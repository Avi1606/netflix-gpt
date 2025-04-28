import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying.jsx";
import SecondContainer from "./SecondContainer.jsx";
import MainContainer from "./MainContainer.jsx";
import usePopularMovies from "../hooks/usePopularMovies.jsx";
import useTopRatedMovies from "../hooks/useTopRatedMovies.jsx";
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx";
import GptSearchPage from "./GptSearchPage.jsx";
import {useSelector} from "react-redux";

const Browse = () => {

    const showgptpage = useSelector(store => store.gpt.showGptPage);

    useNowPlaying();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

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
