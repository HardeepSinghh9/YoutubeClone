import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cards({ videos, uniqueCategories }) {
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  function times() {
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);

    const time = [
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");
    return (
      <div>
        <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded-md">
          {time}
        </span>
      </div>
    );
  }

  // Filter videos based on selectedCategory
  const filteredVideos = selectedCategory
    ? videos.filter((video) => video.category === selectedCategory)
    : videos;

  return (
    <div className="md:w-[95%] overflow-y-scroll no-scrollbar my-5 overflow-x-hidden h-[calc(100vh-30px)]">
      <div className="top-0 sticky bg-white z-10 flex px-3">
        <div className=" flex whitespace-nowrap overflow-x-scroll no-scrollbar space-x-4 flex-nowrap">
          {uniqueCategories.map((category) => {
            return (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                } // Toggle category selection
                className={`mb-4 flex-none ${
                  selectedCategory === category
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } duration-300 rounded-xl px-3 py-2 font-medium text-gray-700 cursor-pointer`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {filteredVideos.map((video) => {
          return (
            <Link to={`/video/${video?.videoId}`} key={video._id}>
              <div className="flex flex-col">
                {/* thumbnail & duration */}
                <div className="relative h-40 lg:h-40 md:h-48 md: rounded-xl hover:rounded-none duration-200 overflow-hidden">
                  <img
                    loading="lazy"
                    className="h-full w-full object-cover"
                    src={video?.thumbnailUrl}
                    alt=""
                  />
                  {times()}
                </div>
                {/* channel logo & title */}
                <div className="flex mt-3 space-x-2 ">
                  <div className="flex items-start">
                    <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                      <img
                        className="h-full w-full rounded-full overflow-hidden"
                        src={video?.channelBanner}
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-bold line-clamp-2">
                      {video?.title}
                    </span>
                    <span className="flex items-center font-semibold mt-2 text-[12px] text-gray-600">
                      {video?.channelName}
                    </span>
                    <div className="flex text-gray-500 text-[12px]">
                      <span>
                        {video?.views
                          .toString()
                          .split("")
                          .reverse()
                          .join("")
                          .match(/.{1,3}/g)
                          .join(",")
                          .split("")
                          .reverse()
                          .join("")}{" "}
                        Views
                      </span>
                      <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">
                        .
                      </span>
                      <span>{video?.uploadDate.split("T")[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
