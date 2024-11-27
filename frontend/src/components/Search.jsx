import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Scard from "./Scard";
import Header from "./Header";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchR = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/search?query=${query}`
        );
        // console.log(response.data);
        setSearchResults(response.data);
        setError(null); // Reset error
      } catch (errorr) {
        // Check if error response is 404
        if (errorr.response && errorr.response.status === 404) {
          setError("No results found for your search. Try Again");
        } else {
          setError(errorr.message); // For other errors
        }
      } finally {
        setLoading(false);
      }
    };
    searchR();
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col mt-2 overflow-hidden">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-500 text-white p-2 mb-4">{error}</div>
          )}
          {/* Search Results Grid */}

          <div className="grid grid-cols-1 gap-4 p-4 overflow-y-auto">
            {searchResults.map((item, index) => (
              <Scard key={index} video={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
