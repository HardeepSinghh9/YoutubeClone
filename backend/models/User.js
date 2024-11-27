import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  userId: { type: String },
  channels: { type: String },
  channelId: { type: String },
  channelconnect: { type: String },
});

export default mongoose.model("User", userSchema);
