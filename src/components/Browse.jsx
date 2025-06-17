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
    const [apiError, setApiError] = useState(false);

    const handleApiError = () => {
        setApiError(true);
    };

    useEffect(() => {
        // Add global error handler for fetch
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                return response;
            } catch (error) {
                handleApiError();
                throw error;
            }
        };

        return () => {
            window.fetch = originalFetch;
        };
    }, []);

    useNowPlaying();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    if (apiError) {
        return <ErrorMessage />;
    }

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
