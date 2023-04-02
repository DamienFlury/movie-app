const key = "63bddd9820a8a4d4b4159ae751eaff78";
export const fetchMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`
  );
  return response.json();
};

export const fetchMovieById = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
  );
  return response.json();
};
