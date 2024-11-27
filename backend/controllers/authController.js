import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
  const channelconnect = `comment-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const channelId = "";

    const newUser = new User({
      username,
      email,
      password,
      avatar,
      channelconnect,
      channelId,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res
      .status(201)
      .json({ message: "User created successfully!", newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).json({ message: "Login successful!", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export { registerUser, loginUser };
