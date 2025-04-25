import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying.jsx";
import FirstContainer from "./FirstContainer.jsx";
import SecondContainer from "./SecondContainer.jsx";
import MainContainer from "./MainContainer.jsx";

const Browse = () => {

     useNowPlaying();

    return (
        <div className="">
            <Header />
            <MainContainer />
            <FirstContainer />
            <SecondContainer />

        </div>
    );
};
export default Browse;
