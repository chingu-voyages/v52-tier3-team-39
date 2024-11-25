import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import formRouter from "./routes/form.route.js";
import connectDb from "./config/db.js";
import { port, dbConnectStr } from "./config/env.js";
import appointmentsRouter from "./routes/appointments.routes.js";
import userRouter from "./routes/user.route.js";

const app = express();

connectDb();

// parse incoming request bodies
app.use(bodyParser.json());

//! enable all CORS requests
app.use(cors());

app.use("/user", userRouter);
app.use("/form", formRouter);
app.use("/appointments", appointmentsRouter);
app.use("/database-health", async (_, res) => {
  try {
    await mongoose.connect(dbConnectStr);
    return res.json({ status: "connected" });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});

app.use("/", (req, res) => {
  return res.json({ message: "Hello team Radiant Minds" });
});

// error handler
app.use((error, req, res, next) => {
  res.status ? res.status : res.status(500);
  res.json({ message: error.message });
});

// init server
app.listen(port, () => {
  console.log("Rayvolution node/express server is listening on port", port);
});
