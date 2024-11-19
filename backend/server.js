import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbconnect from "./config/db.js";
import { registerUser, loginUser } from "./controllers/authController.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();

// Database connection
dbconnect();

// CORS configuration (allowing localhost:5173)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
