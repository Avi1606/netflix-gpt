import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying.jsx";
import SecondContainer from "./SecondContainer.jsx";
import MainContainer from "./MainContainer.jsx";

const Browse = () => {

     useNowPlaying();

    return (
        <div>
            <Header />
            <MainContainer />
            <SecondContainer />
        </div>
    );
};
export default Browse;
