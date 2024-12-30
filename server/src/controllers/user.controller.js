import jwt from "jsonwebtoken";
import { jwtKey } from "../config/env.js";
import User from "../models/user.model.js";

export async function checkRole(req, res) {
  // check User db for registered admin accounts
  const { email } = req.user;
  const user = await User.findOne({ email });

  // return "admin" or default "user" role
  const role = user?.role ?? "user";

  // create jwt
  const payload = { email, role };
  const token = jwt.sign(payload, jwtKey, { expiresIn: "30d" });

  res.json({ role, token });
}
