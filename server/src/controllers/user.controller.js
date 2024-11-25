import User from "../models/user.model.js";

export async function checkRole(req, res) {
  // grab currently logged in user's profile data from results
  console.log(JSON.stringify(req.headers))
  const email = req.headers["x-user-email"];
  console.log("email:", email)
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    if (user.role === "admin") {
      res.json(user.role);
    }
  }
  else {
    res.json({ role: "resident" })
  }

}
