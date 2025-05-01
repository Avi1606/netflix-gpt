import React from 'react';

const TitleContainer = ({title, overview}) => {
    return (
        <div className="absolute text-white w-screen aspect-video
                      pt-[35%] sm:pt-[30%] md:pt-[25%] lg:pt-[20%] 
                      px-4 sm:px-8 md:px-12 lg:px-16
                      bg-gradient-to-r from-black/80 via-black/50 to-transparent">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 
                         line-clamp-2 sm:line-clamp-none">
                {title}
            </h1>
            <p className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 
                        text-sm sm:text-base md:text-lg 
                        mb-4 sm:mb-6 md:mb-8
                        line-clamp-2 sm:line-clamp-3 md:line-clamp-none
                        opacity-90">
                {overview}
            </p>
            <div className="flex gap-2 sm:gap-3 md:gap-4">
                <button className="cursor-pointer bg-white text-black 
                                  py-1 px-4 sm:py-2 sm:px-6 md:px-8 
                                  text-sm sm:text-base md:text-lg 
                                  font-semibold rounded-md 
                                  hover:bg-opacity-80 
                                  transition-all duration-300
                                  flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                         className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                    Play
                </button>
                <button className="cursor-pointer bg-gray-600 bg-opacity-70 text-white 
                                  py-1 px-4 sm:py-2 sm:px-6 md:px-8 
                                  text-sm sm:text-base md:text-lg 
                                  font-semibold rounded-md 
                                  hover:bg-gray-700
                                  transition-all duration-300
                                  flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                         className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 0 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>
                    More Info
                </button>
            </div>
        </div>
    );
};

export default TitleContainer;