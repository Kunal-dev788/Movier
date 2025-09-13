import type { WatchedMovie as WatchMovie } from "../typeWatched";

interface WatchedMovieProps {
  movie: WatchMovie;
  handleDeleteWatched(id: string): void;
}

function WatchedMovie({ movie, handleDeleteWatched }: WatchedMovieProps) {
  const { imdbID, title, poster, imdbRating, userRating, runtime } = movie;

  return (
    <li key={imdbID}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => handleDeleteWatched(imdbID)}>X</button>
      </div>
    </li>
  );
}

export default WatchedMovie;
