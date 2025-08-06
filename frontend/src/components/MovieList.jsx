import React, { useEffect, useRef, useState } from 'react';
import MovieCard from "./MovieCard.jsx";

const MovieList = ({title, movies}) => {
    const scrollContainerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

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

    const checkScrollPosition = () => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        const isAtStart = container.scrollLeft <= 10;
        const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10;
        
        setShowLeftArrow(!isAtStart);
        setShowRightArrow(!isAtEnd);
    };
    
    const handleScroll = (direction) => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of container width
        
        if (direction === 'left') {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
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
        
        // Add scroll event listener to update arrow visibility
        scrollContainer.addEventListener('scroll', checkScrollPosition);
        // Initial check
        checkScrollPosition();

        return () => {
            cancelAnimationFrame(animationFrameId);
            scrollContainer.removeEventListener('scroll', checkScrollPosition);
        };
    }, [movies, scrollDirection, isPaused, title]);

    if (!movies) return null;

    return (
        <div className="relative px-2 sm:px-4 md:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10 group">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3 pl-1">{title}</h1>
            
            {/* Left scroll arrow */}
            {showLeftArrow && (
                <button 
                    onClick={() => handleScroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20
                          w-6 h-10 sm:w-8 sm:h-12 md:w-10 md:h-16 lg:w-12 lg:h-20 
                          bg-black/50 
                          flex items-center justify-center
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                          hover:bg-black/80
                          rounded-r-md
                          touch-manipulation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
            
            {/* Right scroll arrow */}
            {showRightArrow && (
                <button 
                    onClick={() => handleScroll('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20
                          w-6 h-10 sm:w-8 sm:h-12 md:w-10 md:h-16 lg:w-12 lg:h-20 
                          bg-black/50 
                          flex items-center justify-center
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                          hover:bg-black/80
                          rounded-l-md
                          touch-manipulation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
            
            <div className="relative overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="movie-list flex overflow-x-auto overflow-y-hidden py-2 sm:py-4 px-1 sm:px-2
                              scrollbar-hide
                              [scrollbar-width:none] [-ms-overflow-style:none]
                              [&::-webkit-scrollbar]:hidden
                              touch-pan-x"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                    onScroll={checkScrollPosition}
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0">
                            <MovieCard imageID={movie.poster_path}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;