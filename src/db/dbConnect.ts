import mongoose from "mongoose";
import conf from "../conf/conf.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${conf.dbURI}/${conf.dbName}`
    );
    console.log(`\n MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
