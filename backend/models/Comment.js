import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentId: { type: String, required: true },
  userId: { type: String },
  videoId: { type: String },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  name: { type: String },
});

export default mongoose.model("Comment", commentSchema);
