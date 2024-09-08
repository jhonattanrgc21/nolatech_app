import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    mongoose.set('bufferTimeoutMS', 30000); 
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nolatech', );
    console.log("Database is connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();
