import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="navbar flex justify-between p-4 pt-5">
      <SearchBar />
      <w3m-button />
    </header>
  );
}
