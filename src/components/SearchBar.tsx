import { type SetStateAction } from "react";

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
}

function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBar;
