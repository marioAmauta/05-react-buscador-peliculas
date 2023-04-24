import { useCallback, useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sort }) {
  const [movieResponse, setMovieResponse] = useState(null);
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    if (search === '') return;
    if (search.length < 3) return;

    try {
      setMoviesLoading(true);
      setMoviesError(null);
      previousSearch.current = search;
      const [movieResponse, newMovies] = await searchMovies({ search });
      setMovieResponse(movieResponse);
      setMovies(newMovies);
    } catch (error) {
      setMoviesError(error);
    } finally {
      setMoviesLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return movies?.length > 0 && sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return {
    movieResponse,
    movies: sortedMovies,
    moviesLoading,
    moviesError,
    getMovies
  };
}
