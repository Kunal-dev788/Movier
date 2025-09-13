import { useEffect, useState } from "react";
import Main from "./Main";
import Navbar from "./Navbar";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import type { Movie } from "../typeMovie";
import type { WatchedMovie } from "../typeWatched";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useLocalStorage } from "../hooks/useLocalStorage";

const KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched, setWatched] = useLocalStorage<WatchedMovie[]>(
    "watchedMovies",
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      async function FetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) throw new Error("Failed to fetch movies");

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(data.Error || "No movies found");
          }

          setMovies(data.Search);
        } catch (err) {
          console.error("Error fetching movies:", err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Something went wrong");
          }
          setMovies([]); // optional: reset movies on error
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      const timeoutId = setTimeout(() => {
        FetchMovies();
      }, 750);
      return () => clearTimeout(timeoutId);
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
