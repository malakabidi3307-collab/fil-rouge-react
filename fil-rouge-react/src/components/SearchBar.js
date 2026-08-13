import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    onSearch(debouncedValue.trim().toLowerCase());
  }, [debouncedValue, onSearch]);

  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        aria-label="Rechercher un produit"
      />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export default SearchBar;