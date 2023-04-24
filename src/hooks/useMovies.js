import { useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState(null);
  const previousSearch = useRef(search);

  async function getMovies() {
    if (search === previousSearch.current) return;

    try {
      setMoviesLoading(true);
      setMoviesError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setMoviesError(error);
    } finally {
      setMoviesLoading(false);
    }
  }

  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
  }, [movies, sort]);

  return {
    movies: sortedMovies,
    moviesLoading,
    moviesError,
    getMovies
  };
}
