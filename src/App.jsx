import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search });

  function handleSubmit(event) {
    event.preventDefault();
    getMovies();
    console.log({ search });
  }

  function handleChange(event) {
    updateSearch(event.target.value);
  }

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
            borderColor: error ? 'red' : 'transparent'
          }}
          value={search}
          onChange={handleChange}
          name='search'
          type='search'
          placeholder='Avengers, Star Wars, The Matrix...'
        />
        <button>Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
