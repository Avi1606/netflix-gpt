// Temporarily using mock data to avoid security warnings
// OpenAI functionality disabled to resolve browser security issues

const mockMovieRecommendations = [
  "The Dark Knight, Inception, Interstellar, The Matrix, Pulp Fiction",
  "Titanic, The Shawshank Redemption, Forrest Gump, The Godfather, Schindler's List",
  "Avatar, Avengers: Endgame, Star Wars, Jurassic Park, The Lion King",
  "The Departed, Goodfellas, Casino, Scarface, The Irishman",
  "Toy Story, Finding Nemo, Up, Monsters Inc, Cars"
];

const getMovieRecommendations = async (prompt) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mock recommendations based on prompt keywords
    let recommendations = mockMovieRecommendations[0]; // default

    if (prompt.toLowerCase().includes('action')) {
      recommendations = "The Dark Knight, Mad Max Fury Road, John Wick, Mission Impossible, Die Hard";
    } else if (prompt.toLowerCase().includes('comedy')) {
      recommendations = "The Hangover, Superbad, Anchorman, Step Brothers, Dumb and Dumber";
    } else if (prompt.toLowerCase().includes('romance')) {
      recommendations = "Titanic, The Notebook, Casablanca, When Harry Met Sally, Pretty Woman";
    } else if (prompt.toLowerCase().includes('horror')) {
      recommendations = "The Conjuring, Hereditary, Get Out, A Quiet Place, The Exorcist";
    } else if (prompt.toLowerCase().includes('sci-fi') || prompt.toLowerCase().includes('science fiction')) {
      recommendations = "Blade Runner 2049, Interstellar, The Matrix, Arrival, Ex Machina";
    }

    return recommendations;
  } catch (error) {
    console.error('Error getting movie recommendations:', error);
    // Return fallback recommendations
    return "The Shawshank Redemption, The Godfather, The Dark Knight, Pulp Fiction, Forrest Gump";
  }
};

export default getMovieRecommendations;
