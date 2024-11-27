import Comment from "../models/Comment.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Get comments for a specific video
export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find();
    const videoComments = comments.filter((item) => item.videoId === videoId);

    res.status(200).json({ videoComments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

// Add a new comment
export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    const userId = req.user.id; // From authMiddleware
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const newComment = new Comment({
      commentId: `comment-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`, // Generate a unique comment ID
      text,
      videoId,
      userId,
      name: user.username,
    });

    await newComment.save();
    res.json({ newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findOne({ commentId: commentId });

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.userId !== userId)
      return res.status(403).json({ message: "Not authorized" });

    comment.text = text;
    await comment.save();
    res.json({ updatedComment: comment });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: "Error editing comment" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findOne({ commentId: commentId });

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.userId !== userId)
      return res.status(403).json({ message: "Not authorized" });

    await Comment.deleteOne({ commentId: commentId });
    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
