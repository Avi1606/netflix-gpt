import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying.jsx";
import SecondContainer from "./SecondContainer.jsx";
import MainContainer from "./MainContainer.jsx";
import usePopularMovies from "../hooks/usePopularMovies.jsx";
import useTopRatedMovies from "../hooks/useTopRatedMovies.jsx";
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx";

const Browse = () => {

    useNowPlaying();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    return (
        <div>
            <Header />
            <MainContainer />
            <SecondContainer />
        </div>
    );
};
export default Browse;
