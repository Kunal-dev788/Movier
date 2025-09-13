import type { Movie } from "../typeMovie";

interface NumResultProps{
  movies : Movie[]
}

function NumResults({movies}:NumResultProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
