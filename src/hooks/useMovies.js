import withResultsMock from '../mocks/with-results.json';
import withoutResultsMock from '../mocks/no-results.json';
import { useState } from 'react';

export function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState([]);

  const movies = responseMovies.Search;

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    releaseYear: movie.Year,
    imageSrc: movie.Poster
  }));

  function getMovies() {
    if (search) {
      // setResponseMovies(withResultsMock);

      fetch(`http://www.omdbapi.com/?apikey=d6fc0a07&s=${search}`)
        .then(res => res.json())
        .then(json => {
          setResponseMovies(json);
        });
    } else {
      setResponseMovies(withoutResultsMock);
    }
  }

  return {
    movies: mappedMovies,
    getMovies
  };
}
