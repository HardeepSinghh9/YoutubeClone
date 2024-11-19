import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("db ok");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbconnect;
