import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbconnect from "./config/db.js";
import { registerUser, loginUser } from "./controllers/authController.js";
import { fetchvideos } from "./controllers/feedcontroller.js";
import detailsController from "./controllers/detailsController.js";
import { searchVideos } from "./controllers/search.js";
import {
  getComments,
  editComment,
  addComment,
  deleteComment,
} from "./controllers/comments.js";
import Comment from "./models/Comment.js";
import User from "./models/User.js";
import Channel from "./models/Channel.js";

import { verifyToken } from "./middlewares/authMiddleware.js";
import { createChannel } from "./controllers/channelController.js";
import getChannels from "./controllers/channelPage.js";

dotenv.config();
const app = express();

// Database connection
dbconnect();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", //frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //meth allowed
    allowedHeaders: ["Content-Type", "Authorization"], //tokens
  })
);

app.use(express.json());

// EPS
app.post("/api/register", registerUser); //register ep

app.post("/api/login", loginUser); //login ep

app.get("/api/videos", fetchvideos);

app.get("/video/:id", detailsController);

app.get("/search", searchVideos);

app.get("/comments/:videoId", getComments);
app.post("/comments", verifyToken, addComment);
app.put("/comments/:commentId", verifyToken, editComment);
app.delete("/comments/:commentId", verifyToken, deleteComment);

app.post("/channels/create", createChannel);
app.get("/channels/:id", getChannels);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
