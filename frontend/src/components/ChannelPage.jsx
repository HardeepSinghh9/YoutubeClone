import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

function ChannelPage() {
  const { id } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/channels/${id}`
        );
        setChannelData(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading channel data.
      </div>
    );
  if (!channelData)
    return <div className="text-center py-10">No channel data available.</div>;

  const { channel, videos } = channelData;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex w-full sm:w-[85%] px-3 md:px-5 flex-col items-center bg-gray-100 min-h-screen">
        {/* Channel Banner */}
        <div
          className="w-full h-56 md:h-72 bg-cover bg-center"
          style={{ backgroundImage: `url(${channel.channelBanner})` }}
        ></div>

        {/* Channel Info Section */}
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg -mt-16 p-6 md:p-8">
          <div className="flex items-center space-x-4">
            <img
              src={channel.channelBanner}
              alt="Channel Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">
                {channel.channelName}
              </h1>
              <p className="text-gray-500 text-sm">
                {channel.channelSubscribers.toLocaleString()} subscribers
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">{channel.channelDescription}</p>
        </div>

        {/* Videos Section */}
        <div className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Link to={`/video/${video.videoId}`} key={index}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">
                    {video.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">
                    {video.views.toLocaleString()} views •{" "}
                    {new Date(video.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelPage;
