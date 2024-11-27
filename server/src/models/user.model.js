import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
});

const User = mongoose.model("User", userSchema, "users");

export default User;
