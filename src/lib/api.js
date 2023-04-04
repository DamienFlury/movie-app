import { Settings } from "@lightningjs/sdk";

export const fetchMovies = async () => {
  const key = Settings.get("app", "tmdb_api_key");
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`
  );
  return response.json();
};

export const fetchMovieById = async (id) => {
  const key = Settings.get("app", "tmdb_api_key");
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
  );
  return response.json();
};

export const getRecommendations = async (id) => {
  const key = Settings.get("app", "tmdb_api_key");
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}`
  );
  return response.json();
};

export const searchMovies = async (searchQuery) => {
  const key = Settings.get("app", "tmdb_api_key");
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`
  );
  return response.json();
};
