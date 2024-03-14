import mongoose from "mongoose";

let isConnected = "false"; //track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongoDB is already connected");
    return;
  }
  try {
    if (!process.env.MONGOGB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(process.env.MONGOGB_URI, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
