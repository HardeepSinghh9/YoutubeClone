import React from "react";
import { Link } from "react-router-dom";

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

function RelatedSideBar({ Rvideos }) {
  return (
    <div>
      <Link to={`/video/${Rvideos?.videoId}`}>
        <div className="flex mb-3 ">
          <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl hover:rounded-none duration-200">
            <img
              className="h-full w-full rounded-lg"
              src={Rvideos?.thumbnailUrl}
            />
            {times()}
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 ">
              {Rvideos?.title}
            </span>
            <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2  flex items-center">
              {Rvideos?.channelName}
            </span>
            <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold  truncate overflow-hidden">
              <span>
                {Rvideos?.views
                  .toString()
                  .split("")
                  .reverse()
                  .join("")
                  .match(/.{1,3}/g)
                  .join(",")
                  .split("")
                  .reverse()
                  .join("")}{" "}
              </span>
              <span className="flex text-[24px] leading-none font-bold  relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">
                {Rvideos.uploadDate.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RelatedSideBar;
