import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully to campus_scheduler");
    });
    const baseUri = process.env.MONGO_URI.endsWith('/') 
      ? process.env.MONGO_URI.slice(0, -1) 
      : process.env.MONGO_URI;
    const conn = await mongoose.connect(`${baseUri}/campus_scheduler`);
  } catch (error) {
    console.log("Error connection to MongoDB: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};
