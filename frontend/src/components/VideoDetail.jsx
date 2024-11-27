import React from "react";
import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import RelatedSideBar from "./RelatedSideBar";
import { Link } from "react-router-dom";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import Comments from "./Comments";

function VideoDetail() {
  const { id } = useParams();
  const [videoD, setVideoDetails] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/video/${id}`);
        setVideoDetails(response.data.videoDetailss);
        setRelated(response.data.relatedVideo);
        // console.log(response.data.relatedVideo);
        setLoading(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Handle Like button click
  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true); // Handle switching from dislike
      setDisliked(false);
    }
  };

  // Handle Dislike button click
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
      }
    }
  };

  return (
    <>
      <div className=" flex justify-center flex-row h-[calc(100%-56px)]">
        <div className="w-full max-w-[1580px] flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[100%-400px] px-4 py-3 lg:py-6">
            <div className="h-[200px] md:h-[700px] ml-[-16px] mr-[-16px] lg:ml-0 lg:mr-0">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                height="100%"
                width="100%"
                controls
                style={{ backgroundColor: "#000000" }}
                playing={true}
              />
            </div>
            <div className="font-bold text-sm md:text-xl mt-4 line-clamp-2">
              {videoD?.title}
            </div>
            <div className="flex justify-between flex-col md:flex-row mt-4">
              <div className="flex ">
                <Link to={`/channels/${videoD.channelId}`} key={videoD._id}>
                  <div className="flex items-start">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={videoD.channelBanner}
                      />
                    </div>
                  </div>
                </Link>
                <div className="flex space-x-5">
                  <div className="flex flex-col ml-3">
                    <div className="text-md font-semibold flex items-center">
                      {videoD?.channelName}
                    </div>
                    <div className=" text-sm">
                      {videoD?.views
                        .toString()
                        .split("")
                        .reverse()
                        .join("")
                        .match(/.{1,3}/g)
                        .join(",")
                        .split("")
                        .reverse()
                        .join("")}{" "}
                    </div>
                  </div>
                  <span
                    className="mb-5 flex items-center justify-center bg-red-600 py-2 lg:text-sm xl:text-base 
             xl:py-2 hover:bg-red-700 transition-colors duration-200 
             rounded-full px-5 font-bold text-white cursor-pointer shadow-sm"
                  >
                    Subscribe
                  </span>
                </div>
              </div>
              <div className="flex mt-4 md:mt-0">
                <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                  {/* Like Button */}
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-4"
                  >
                    {liked ? (
                      <AiFillLike className="text-2xl text-blue-500" />
                    ) : (
                      <AiOutlineLike className="text-2xl text-black" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        liked ? "text-blue-500" : "text-black"
                      }`}
                    ></span>
                  </button>

                  {/* Dislike Button */}
                  <button
                    onClick={handleDislike}
                    className="flex items-center space-x-2"
                  >
                    {disliked ? (
                      <AiFillDislike className="text-2xl text-blue-500" />
                    ) : (
                      <AiOutlineDislike className="text-2xl text-black" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        disliked ? "text-blue-500" : "text-black"
                      }`}
                    >
                      Dislike
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm">
              {videoD?.description}
            </div> */}

            <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm">
              <div
                className={`overflow-hidden ${
                  isExpanded ? "max-h-full" : "max-h-24"
                } transition-[max-height] duration-300`}
              >
                {videoD?.description}
              </div>
              {videoD?.description?.length > 200 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-500 text-sm font-medium mt-2 hover:underline"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {/*  */}
            <div className="flex gap-x-6 font-semibold rounded-xl mt-4 text-xl">
              <Comments videoId={videoD.videoId} />
            </div>
          </div>
          <div className="flex flex-col px-4 py-6 overflow-y-scroll overflow-x-hidden lg:w-[350px] xl:w-[400px]">
            {related?.map((item) => {
              if (item?.category === videoD.category)
                return <RelatedSideBar key={item._id} Rvideos={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoDetail;
