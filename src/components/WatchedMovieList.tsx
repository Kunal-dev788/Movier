import type { WatchedMovie as WatchMovie } from "../typeWatched";
import WatchedMovie from "./WatchedMovie";

interface WatchedMovieListProps {
  watched: WatchMovie[];
  handleDeleteWatched(id: string): void;
}

function WatchedMovieList({ watched, handleDeleteWatched }: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}                                // ✅ pass as `movie`
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
