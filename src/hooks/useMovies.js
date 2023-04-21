import responseMovies from '../mocks/with-results.json';
import withoutResults from '../mocks/no-results.json';

export function useMovies() {
  const movies = responseMovies.Search;

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    releaseYear: movie.Year,
    poster: movie.Poster
  }));

  return mappedMovies;
}
