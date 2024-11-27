import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

const detailsController = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch all videos and channels
    const videos = await Video.find();
    const channels = await Channel.find();

    // Create a map with channelId
    const channelMap = channels.reduce((map, channel) => {
      map[channel.channelId] = {
        channelBanner: channel.channelBanner,
        channelName: channel.channelName,
      };
      return map;
    }, {});
    const videoDetailss = videos.find((item) => item.videoId === id);

    if (!videoDetailss) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Add channel details to the video details
    const detailedVideo = {
      ...videoDetailss.toObject(),
      channelBanner: channelMap[videoDetailss.channelId]?.channelBanner,
      channelName: channelMap[videoDetailss.channelId]?.channelName,
    };

    // Get related videos based on category, excluding the current video
    const relatedVideo = videos
      .filter(
        (item) =>
          item.category === videoDetailss.category && item.videoId !== id
      )
      .map((item) => ({
        ...item.toObject(),
        channelBanner: channelMap[item.channelId]?.channelBanner,
        channelName: channelMap[item.channelId]?.channelName,
      }));

    res.status(200).send({ videoDetailss: detailedVideo, relatedVideo });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default detailsController;
