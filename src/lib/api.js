export const fetchMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=63bddd9820a8a4d4b4159ae751eaff78"
  );
  return response.json();
};
