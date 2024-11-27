import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

const fetchvideos = async (req, res) => {
  try {
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

    res.status(200).send(modifiedVideos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { fetchvideos };
