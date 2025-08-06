import React from 'react';

const ShimmerUI = () => {
    return (
        <div className="pt-[15%] sm:pt-[20%] px-4 sm:px-8 md:px-12 absolute w-full h-full bg-black bg-opacity-80">
            <div className="h-8 sm:h-10 w-1/2 sm:w-1/3 mb-4 sm:mb-6 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="h-4 sm:h-6 w-3/4 sm:w-1/2 mb-2 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="h-4 sm:h-6 w-2/3 sm:w-2/5 mb-2 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="h-4 sm:h-6 w-1/2 sm:w-1/3 mb-4 sm:mb-6 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="flex gap-2 sm:gap-4">
                <div className="h-8 sm:h-12 w-24 sm:w-32 bg-gray-700 animate-pulse rounded-md"></div>
                <div className="h-8 sm:h-12 w-24 sm:w-32 bg-gray-700 animate-pulse rounded-md"></div>
            </div>
        </div>
    );
};

export default ShimmerUI;