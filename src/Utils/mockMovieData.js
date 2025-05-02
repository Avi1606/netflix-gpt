// src/utils/mockMovieData.js
export const mockMovieResults = {
    movieNames: ["The Shawshank Redemption", "The Godfather", "Pulp Fiction", "Fight Club", "Forrest Gump"],
    movieResults: [
        [
            {
                id: 1,
                title: "The Shawshank Redemption",
                poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
                overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
                release_date: "1994-09-23",
                vote_average: 8.7
            }
        ],
        [
            {
                id: 2,
                title: "The Godfather",
                poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers.",
                release_date: "1972-03-14",
                vote_average: 8.7
            }
        ],
        [
            {
                id: 3,
                title: "Pulp Fiction",
                poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
                overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
                release_date: "1994-09-10",
                vote_average: 8.5
            }
        ],
        [
            {
                id: 4,
                title: "Fight Club",
                poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
                overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
                release_date: "1999-10-15",
                vote_average: 8.4
            }
        ],
        [
            {
                id: 5,
                title: "Forrest Gump",
                poster_path: "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
                overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
                release_date: "1994-06-23",
                vote_average: 8.5
            }
        ]
    ]
};

// You can add more sets of mock data for different search queries
export const actionMovies = {
    movieNames: ["Die Hard", "The Matrix", "Mad Max: Fury Road", "John Wick", "Mission Impossible"],
    movieResults: [
        [
            {
                id: 6,
                title: "Die Hard",
                poster_path: "/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
                overview: "NYPD cop John McClane goes on a Christmas vacation to visit his wife Holly in Los Angeles where she works for the Nakatomi Corporation.",
                release_date: "1988-07-15",
                vote_average: 7.9
            }
        ],
        // Add data for other action movies...
        // For brevity, I'll skip the full details for the other movies
    ]
};

export const comedyMovies = {
    movieNames: ["Step Brothers", "Superbad", "The Hangover", "Bridesmaids", "Anchorman"],
    movieResults: [
        // Add comedy movie data
    ]
};