import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

const getChannels = async (req, res) => {
  const { id } = req.params;

  try {
    const channels = await Channel.find();
    const filter1 = channels.find((item) => {
      if (item.channelconnect == id || item.channelId == id) {
        return item;
      }
    });

    const videos = await Video.find();
    const filter2 = videos.filter((item) => item.channelId == id);

    const response = {
      channel: {
        channelName: filter1.channelName,
        channelBanner: filter1.channelBanner,
        channelDescription: filter1.description,
        channelSubscribers: filter1.subscribers,
      },
      videos: filter2.map((video) => ({
        videoId: video.videoId,
        title: video.title,
        thumbnailUrl: video.thumbnailUrl,
        views: video.views,
        uploadDate: video.uploadDate,
      })),
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
export default getChannels;
