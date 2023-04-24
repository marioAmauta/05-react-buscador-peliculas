const API_KEY = 'd6fc0a07';

export async function searchMovies({ search }) {
  if (search === '') return null;

  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const json = await response.json();

    const movies = json.Search;

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      releaseYear: movie.Year,
      imageSrc: movie.Poster
    }));
  } catch (error) {
    throw new Error(`Error searching movies: ${error}`);
  }
}
