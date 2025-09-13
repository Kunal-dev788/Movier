import { useEffect, useState, useRef } from "react";
import type { MovieDetailsObj } from "../typeMovieDetails";
import StarRating from "./StarRating";
import Loader from "./Loader";
import type { WatchedMovie } from "../typeWatched";

interface MovieDetailsProps {
  selectedId: string | null;
  handleCloseMovie(): void;
  handleAddWatched(movie: WatchedMovie): void;
  watched: WatchedMovie[];
}

const KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails({
  selectedId,
  watched,
  handleCloseMovie,
  handleAddWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDetailsObj | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);

  const isWatched: boolean =
    !!selectedId && watched.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const countRef = useRef(0);
  useEffect(() => {
    if (userRating > 0) countRef.current++;
  }, [userRating]);

  // Fetch movie details when selectedId changes
  useEffect(() => {
    if (!selectedId) return;

    const controller = new AbortController();

    async function getMovieDetails() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovie(data);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Error fetching movie details:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();

    return () => controller.abort();
  }, [selectedId]);

  // Update document title
  useEffect(() => {
    if (movie?.Title) {
      document.title = `Movie | ${movie.Title}`;
    } else {
      document.title = "usePopcorn";
    }

    return () => {
      document.title = "usePopcorn";
    };
  }, [movie?.Title]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseMovie]);

  if (isLoading)
    return (
      <div className="details">
        <Loader />
      </div>
    );
  if (error) return <div className="details">❌ {error}</div>;
  if (!movie) return null;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    if (!selectedId) return;

    const newWatchedMovie: WatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handleCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`${title} poster`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} • {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span> {imdbRating}
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You Rated this movie {watchedUserRating} <span>⭐</span>
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>
          <strong>Starring:</strong> {actors}
        </p>
        <p>
          <strong>Director:</strong> {director}
        </p>
        <p>
          <strong>Year:</strong> {year}
        </p>
      </section>
    </div>
  );
}

export default MovieDetails;
