import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import formRouter from "./routes/form.js";

// load env vars from .env
dotenv.config();

const app = express();

// parse incoming request bodies
app.use(bodyParser.json());

//! enable all CORS requests
app.use(cors());

app.use("/form", formRouter);

app.use("/", (req, res) => {
  return res.json({ message: "Hello team Radiant Minds" });
});

// error handler
app.use((error, req, res, next) => {
  res.status ? res.status : res.status(500);
  res.json({ message: error.message });
});

// init server
app.listen(process.env.PORT, () => {
  console.log(
    "Rayvolution node/express server is listening on port",
    process.env.PORT
  );
});
