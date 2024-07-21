import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "../ProductsPage/DebounceHook";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        try {
          const response = await axios.get(
            "http://localhost:35000/products/searchProduct",
            {
              withCredentials: true,
              params: { q: debouncedQuery },
            }
          );
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center relative w-full">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 text-gray-500"
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="pl-10 p-2 border rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-96 bg-white"
      />
      {results.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-md mt-1 z-10 text-left"
        >
          {results.map((result) => (
            <div className="items-center justify-center">
              <li
                key={result.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemClick(result)}
              >
                {result.name}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
