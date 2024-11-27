import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelId: { type: String },
  channelName: { type: String, required: true },
  channelconnect: { type: String },
  userId: { type: String },
  description: { type: String },
  channelBanner: { type: String, default: "" },
  subscribers: { type: Number, default: 0 },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

export default mongoose.model("Channel", channelSchema);
