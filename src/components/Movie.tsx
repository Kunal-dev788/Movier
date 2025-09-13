import type { Movie as MovieType } from "../typeMovie";

type MovieProps = MovieType & {
  onSelectMovie: (id: string) => void;
};

function Movie({ imdbID, Title, Year, Poster, onSelectMovie }: MovieProps) {
  return (
    <li onClick={() => onSelectMovie(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
