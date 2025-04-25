import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying.jsx";

const Browse = () => {

     useNowPlaying();

    return (
        <div>
            <Header />
        </div>
    );
};
export default Browse;
