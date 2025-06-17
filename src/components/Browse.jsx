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
    const [isLoading, setIsLoading] = useState(true);

    const handleApiError = () => {
        setApiError(true);
        setIsLoading(false);
    };

    useEffect(() => {
        // Set a timeout to show error if loading takes too long
        const timeoutId = setTimeout(() => {
            if (isLoading) {
                handleApiError();
            }
        }, 3000); // Show error after 3 seconds

        // Add global error handler for fetch
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for each request

                const response = await originalFetch(...args, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('API request failed');
                }
                return response;
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Request timeout');
                }
                handleApiError();
                throw error;
            }
        };

        // Check if initial data is loaded
        const checkInitialLoad = () => {
            const movies = document.querySelector('.movie-list');
            if (movies) {
                setIsLoading(false);
            }
        };

        // Check periodically for initial load
        const checkInterval = setInterval(checkInitialLoad, 500);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(checkInterval);
            window.fetch = originalFetch;
        };
    }, [isLoading]);

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
