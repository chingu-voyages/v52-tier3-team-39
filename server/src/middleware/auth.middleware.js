import User from "../models/user.model.js";

export const checkAuth = async (req, res, next) => {
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

export const checkAdmin = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });
    const role = user?.role ?? "user";

    req.user = { email, role };

    next();
  } catch (error) {
    console.error(error);
    res.status(500);
    return next({
      message: "An internal server error occurred",
    });
  }
};
