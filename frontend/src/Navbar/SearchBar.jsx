import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center relative w-full max-w-md"
    >
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 text-gray-500"
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="pl-10 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-96 bg-gray-200"
      />
    </form>
  );
};

export default SearchBar;
