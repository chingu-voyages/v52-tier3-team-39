import mongoose from "mongoose";
import { dbConnectStr, myTestDb } from "./env.js";

export default async function connectDb() {
  try {
    await mongoose.connect(dbConnectStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: myTestDb,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Error with Mongo connection:", error);
    process.exit(1);
  }
}
