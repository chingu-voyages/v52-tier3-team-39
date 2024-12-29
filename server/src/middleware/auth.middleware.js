import jwt from "jsonwebtoken";
import { jwtKey } from "../config/env.js";
import User from "../models/user.model.js";

export const checkGoogleAuth = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || bearer.split(" ")[0] !== "Bearer") {
    res.status(403);
    return next({ message: "Access forbidden" });
  }

  const token = bearer.replace("Bearer ", "");

  try {
    // Validate google token. Google will return an error
    // if the token is malformed or has expired
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );

    if (!response.ok) {
      res.status(403);
      return next({ message: "Access forbidden" });
    }

    const data = await response.json();
    const email = data.email;

    req.user = { email };

    next();
  } catch (error) {
    console.error(error);
    res.status(500);
    return next({
      message: "An internal server error occurred",
    });
  }
};

export const checkJwt = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || bearer.split(" ")[0] !== "Bearer") {
    res.status(403);
    return next({ message: "Access forbidden" });
  }

  const token = bearer.replace("Bearer ", "");

  const payload = jwt.verify(token, jwtKey, (err, decode) => {
    if (err) {
      res.status(403);
      return next({ message: "Access forbidden" });
    }
    return decode;
  });

  req.user = { email: payload.email, role: payload.role };

  next();
};

export const checkAdmin = async (req, res, next) => {
  const { role } = req.user;

  if (!role || role !== "admin") {
    res.status(403);
    return next({ message: "Access forbidden" });
  }

  next();
};
