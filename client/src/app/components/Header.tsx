import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="navbar flex justify-end items-center p-4 pt-5">
      <div className="flex items-center space-x-4">
        <SearchBar />
        <w3m-button />
      </div>
    </header>
  );
}
