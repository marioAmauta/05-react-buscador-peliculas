import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function App() {
  const movies = useMovies();

  return (
    <div className='page'>
      <header>
        <form className='search-form'>
          <input
            type='text'
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <button>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
