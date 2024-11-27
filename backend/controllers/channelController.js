import { set } from "mongoose";
import Channel from "../models/Channel.js";
import User from "../models/User.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelconnect, avatar } = req.body;

    // Check if the user already has a channel
    const existingChannel = await Channel.findOne({
      channelconnect: channelconnect,
    });
    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "Channel already exists for this user." });
    }

    // Generate a unique channelId
    const channelId = `comment-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    await User.updateOne(
      { channelId: "" },
      { $set: { channelId: "channelId" } }
    );
    // Create a new channel
    const newChannel = new Channel({
      channelId,
      channelName,
      description,
      channelconnect,
      channelBanner: avatar, // Set the banner from the user's avatar
    });

    // Save the channel to the database
    await newChannel.save();

    // Update the user document to link the channelId

    res
      .status(201)
      .json({ message: "Channel created successfully", channel: newChannel });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to create channel", error });
  }
};
