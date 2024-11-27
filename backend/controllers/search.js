import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Query parameter is required." });
    }
    const videos = await Video.find();
    const channels = await Channel.find();

    const channelMap = channels.reduce((map, channel) => {
      map[channel.channelId] = {
        channelBanner: channel.channelBanner,
        channelName: channel.channelName,
      };
      return map;
    }, {});

    const modifiedVideos = videos
      .filter((video) => channelMap[video.channelId])
      .map((video) => ({
        ...video.toObject(),
        channelBanner: channelMap[video.channelId].channelBanner,
        channelName: channelMap[video.channelId].channelName,
      }));

    const matchingVideos = modifiedVideos.filter((video) => {
      const titleMatch = video.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const channelNameMatch = video.channelName
        .toLowerCase()
        .includes(query.toLowerCase());
      return titleMatch || channelNameMatch;
    });

    if (matchingVideos.length === 0) {
      return res
        .status(404)
        .json({
          message: "No videos or channels match the search query. Try Again",
        });
    }

    res.status(200).json(matchingVideos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { searchVideos };
