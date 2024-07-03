// components/SearchBar.jsx
"use client";
import { useState } from "react";
import { HiSearch } from "react-icons/hi"; // Import icon from react-icons library

const SearchBar = () => {
  const [query, setQuery] = useState("");

  // const handleSearch = (e) => {
  //     e.preventDefault();
  //     setQuery('');
  // };

  return (
    <form className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        // onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-4 rounded-r-md focus:outline-none hover:bg-blue-600"
      >
        <HiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
