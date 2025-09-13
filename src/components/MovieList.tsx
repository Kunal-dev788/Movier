import type { Movie as MovieType } from "../typeMovie";
import Movie from "./Movie";

interface MovieListProps {
  movies: MovieType[];
  onSelectMovie: (id: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          {...movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
