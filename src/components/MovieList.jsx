import React, { useEffect, useRef, useState } from 'react';
import MovieCard from "./MovieCard.jsx";

const MovieList = ({title, movies}) => {
    const scrollContainerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    // Set initial scroll direction based on specific titles
    const getInitialDirection = (title) => {
        switch(title) {
            case "Popular Movies": return "left";  // 1st row: right to left
            case "Now Playing": return "right";    // 2nd row: left to right
            case "Top Rated": return "left";       // 3rd row: right to left
            case "Upcoming": return "right";       // 4th row: left to right
            default: return "left";
        }
    };

    const [scrollDirection, setScrollDirection] = useState(getInitialDirection(title));
    const scrollSpeed = 1; // pixels per animation frame

    // Function to determine if a row should auto-scroll
    const shouldAutoScroll = (title) => {
        return title === "Popular Movies" || title === "Upcoming";
    };

    useEffect(() => {
        if (!movies || !scrollContainerRef.current) return;

        const scrollContainer = scrollContainerRef.current;
        let animationFrameId;

        const scroll = () => {
            if (!isPaused && shouldAutoScroll(title)) {
                if (scrollDirection === 'right') {
                    scrollContainer.scrollLeft += scrollSpeed;
                    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                        setScrollDirection('left');
                    }
                } else {
                    scrollContainer.scrollLeft -= scrollSpeed;
                    if (scrollContainer.scrollLeft <= 0) {
                        setScrollDirection('right');
                    }
                }
            }

            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [movies, scrollDirection, isPaused, title]);

    if (!movies) return null;

    return (
        <div className="relative px-1 mb-8">
            <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
            <div className="overflow">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-scroll overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Extend Tailwind with a custom class for WebKit browsers */}
                    <style jsx>{`
                        .flex::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {movies.map((movie) => (
                        <div key={movie.id}
                             className="flex-shrink-0 w-46 md:w-48 transition-transform duration-300 hover:scale-110 mr-2 md:mr-3">
                            <MovieCard imageID={movie.poster_path}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;