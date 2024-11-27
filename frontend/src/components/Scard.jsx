import React from "react";
import { Link } from "react-router-dom";

function Scard({ video }) {
  console.log(video);
  function times() {
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);

    const time = [
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");
    // console.log(time);
    return (
      <div>
        <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded-md">
          {time}
        </span>
      </div>
    );
  }
  return (
    <div>
      <Link to={`/video/${video?.videoId}`} key={video._id}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Thumbnail on the left */}
          <div className="relative min-w-56 h-48 md:w-48 md:h-28 lg:h-36 rounded-xl overflow-hidden hover:rounded-none duration-200">
            <img
              loading="lazy"
              className="h-full w-full object-cover"
              src={video?.thumbnailUrl}
              alt=""
            />
            {times()}
          </div>

          {/* Video Details on the right */}
          <div className="flex flex-col">
            {/* Channel logo and title */}
            <div className="flex space-x-2">
              <div className="flex items-start">
                <div className="h-9 w-9 rounded-full overflow-hidden border">
                  <img
                    className="h-full w-full rounded-full"
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
        </div>
      </Link>
    </div>
  );
}

export default Scard;
