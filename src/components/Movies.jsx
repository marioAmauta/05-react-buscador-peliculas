import PropTypes from 'prop-types';

function ListOfMovies({ movies }) {
  return (
    <ul className='movies'>
      {movies?.map(movie => (
        <li
          key={movie.id}
          className='movie'
        >
          <h3>{movie.title}</h3>
          <p>{movie.releaseYear}</p>
          <img
            src={movie.imageSrc}
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  );
}
ListOfMovies.propTypes = {
  movies: PropTypes.array
};

function NoMoviesResult({ message }) {
  if (!message) return;

  return <p>{message}</p>;
}
NoMoviesResult.propTypes = {
  message: PropTypes.string
};

export function Movies({ movieResponse, movies }) {
  return movieResponse === true ? (
    <ListOfMovies movies={movies} />
  ) : (
    <NoMoviesResult message={movieResponse} />
  );
}
Movies.propTypes = {
  movieResponse: PropTypes.any,
  movies: PropTypes.array
};
