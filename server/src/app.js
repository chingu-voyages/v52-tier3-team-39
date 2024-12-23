import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectDb from "./config/db.js";
import { port, dbConnectStr } from "./config/env.js";
import { checkAuth } from "./middleware/auth.middleware.js";
import appointmentsRouter from "./routes/appointments.routes.js";
import userRouter from "./routes/user.route.js";
import addressRouter from "./routes/address.routes.js";

const app = express();

connectDb();

// parse incoming request bodies
app.use(bodyParser.json());

//! enable all CORS requests
app.use(cors());

app.use("/addresses", addressRouter);

// auth middleware applies to user and appt routes
app.use(checkAuth);

app.use("/user", userRouter);
app.use("/appointments", appointmentsRouter);

app.use("/database-health", async (_, res) => {
  try {
    await mongoose.connect(dbConnectStr);
    return res.json({ status: "connected" });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});

app.use((_, res, next) => {
  res.status(404);
  next({ message: "Endpoint not found" });
});

// error handler
app.use((error, req, res, next) => {
  res.status || 500;
  res.json({ message: error.message });
});

// init server
app.listen(port, () => {
  console.log("Rayvolution node/express server is listening on port", port);
});
