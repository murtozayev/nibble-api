import { connect } from "mongoose";

export default async function connectDB() {
  try {
    await connect(process.env.MONGO_URL, {
      connectTimeoutMS: 600000
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
