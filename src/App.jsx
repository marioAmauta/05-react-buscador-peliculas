import { useEffect, useState } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movieResponse, movies, moviesLoading, moviesError, getMovies } = useMovies({
    search,
    sort
  });

  function handleSubmit(event) {
    event.preventDefault();

    getMovies({ search });

    event.target.search.blur();
  }

  function handleSort() {
    setSort(!sort);
  }

  function handleChange(event) {
    updateSearch(event.target.value);
  }

  useEffect(() => {
    if (!search) return;

    const debouncedSearch = setTimeout(() => getMovies({ search }), 800);

    return () => clearTimeout(debouncedSearch);
  }, [search, getMovies]);

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
      </header>
      <form
        className='search-form'
        onSubmit={handleSubmit}
      >
        <input
          style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'var(--focus)'
          }}
          value={search}
          onChange={handleChange}
          name='search'
          type='search'
          placeholder='Avengers, Star Wars, The Matrix...'
          autoComplete='off'
        />
        <input
          type='checkbox'
          onChange={handleSort}
          checked={sort}
        />
        <button disabled={search.length === 0}>Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <main>
        {moviesLoading ? (
          <p>Cargando</p>
        ) : (
          <Movies
            movieResponse={movieResponse}
            movies={movies}
          />
        )}
        {moviesError && <p>Error con las pelis</p>}
      </main>
    </div>
  );
}

export default App;
