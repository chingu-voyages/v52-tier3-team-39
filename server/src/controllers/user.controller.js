import User from "../models/user.model.js";

export async function checkRole(req, res) {
  // grab currently logged in user's profile data from results
  const email = req.headers["x-user-email"];
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    if (user.role === "admin") {
      res.json(user.role);
    }
  }
  else {
    // add new non-admin user to DB?
    res.json("user")
  }

}
