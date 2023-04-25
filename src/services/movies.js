const API_KEY = 'd6fc0a07';

export async function searchMovies({ search }) {
  if (search === '') return null;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const json = await response.json();

    const movies = json.Search;

    const movieResponse = json.Response === 'True' ? (json.response = true) : json.Error;

    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      releaseYear: movie.Year,
      imageSrc: movie.Poster
    }));

    return [movieResponse, mappedMovies];
  } catch (error) {
    throw new Error(`Error searching movies: ${error}`);
  }
}
