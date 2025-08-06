import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import languageConstants from "../Utils/languageConstants.jsx";
import openai from "../Utils/OpenAI.jsx";
import { API_OPTIONS } from "../Utils/Constants.jsx";
import { addGptMovieResult } from "../App/useGptSlice.js";
import {actionMovies, comedyMovies, mockMovieResults} from "../Utils/mockMovieData.js";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.language.language);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
          "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
          API_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`TMDB API error: ${data.status}`);
      }

      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("Error searching TMDB:", error);
      throw error;
    }
  };

  const handleGptSearchClick = async () => {
    // Reset any previous errors
    setError(null);
    setIsLoading(true);
  
    try {
      // Validate input
      if (!searchText.current?.value?.trim()) {
        setError("Please enter a search term");
        return;
      }
  
      const gptQuery =
          "Act as a Movie Recommendation system and suggest some movies for the query : " +
          searchText.current.value +
          ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
  
      // Make OpenAI API call
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
  
      // Validate OpenAI response
      if (!gptResults.choices || gptResults.choices.length === 0) {
        throw new Error("No results returned from OpenAI");
      }
  
      // Process movie names
      const gptMovies = gptResults.choices[0]?.message?.content.split(",").map(movie => movie.trim());
  
      if (!gptMovies || gptMovies.length === 0) {
        throw new Error("No movie recommendations found");
      }
  
      // Search for each movie in TMDB
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
  
      // Filter out empty results
      const validResults = tmdbResults.map(results =>
          results && results.length > 0 ? results : null
      );
  
      if (validResults.every(result => result === null)) {
        throw new Error("No movie data found for the recommendations");
      }
  
      // Dispatch to Redux store
      dispatch(
          addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
  
    } catch (error) {
      console.error("Error in GPT search:", error);
      setError(error.message || "An error occurred while searching for movies");
    } finally {
      setIsLoading(false);
    }
  };
  // const handleGptSearchClick = async () => {
  //   // Reset any previous errors
  //   setError(null);

  //   // Check if the search text is empty
  //   if (!searchText.current?.value?.trim()) {
  //     setError("Please enter a search term");
  //     return;
  //   }

  //   // Set loading state
  //   setIsLoading(true);

  //   try {
  //     // Simulate API delay for realistic testing
  //     await new Promise(resolve => setTimeout(resolve, 1500));

  //     // Get mock data based on search query
  //     let mockData;
  //     const query = searchText.current.value.toLowerCase();

  //     if (query.includes("action")) {
  //       mockData = actionMovies;
  //     } else if (query.includes("comedy")) {
  //       mockData = comedyMovies;
  //     } else {

  //       mockData = mockMovieResults;
  //     }


  //     dispatch(addGptMovieResult(mockData));

  //   } catch (error) {
  //     console.error("Error in mock search:", error);
  //     setError("An error occurred while searching for movies");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  return (
      <div className="pt-[25%] sm:pt-[20%] md:pt-[15%] lg:pt-[10%] flex justify-center flex-col items-center">
        <form
            className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2 bg-black bg-opacity-80 rounded-lg shadow-lg p-3 sm:p-4 grid grid-cols-12 gap-2 border border-gray-700"
            onSubmit={(e) => e.preventDefault()}
        >
          <input
              ref={searchText}
              type="text"
              disabled={isLoading}
              className="col-span-9 p-2 sm:p-3 md:p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              placeholder={languageConstants[langKey].placeholder}
              defaultValue={"action movies"}
          />
          <button
              className={`col-span-3 py-2 sm:py-3 px-2 sm:px-4 ${isLoading ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"} text-white font-semibold rounded-lg shadow transition-colors duration-300 transform hover:scale-105 focus:outline-none flex items-center justify-center text-sm sm:text-base`}
              onClick={handleGptSearchClick}
              disabled={isLoading}
          >
            {isLoading ? (
                <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                languageConstants[langKey].search
            )}
          </button>
        </form>

        {error && (
            <div className="mt-4 p-2 sm:p-3 bg-red-500 text-white rounded-md text-xs sm:text-sm w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2">
              {error}
            </div>
        )}
      </div>
  );
};

export default GptSearchBar;