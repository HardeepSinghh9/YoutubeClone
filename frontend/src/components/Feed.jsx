import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/videos");

        setVideos(response.data);
      } catch (error) {
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <p className="text-center">Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(videos.map((video) => video.category))
  );

  return (
    <>
      <Cards videos={videos} uniqueCategories={uniqueCategories}></Cards>
    </>
  );
}

export default Feed;
