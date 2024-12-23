const checkAuth = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || bearer.split(" ")[0] !== "Bearer") {
    res.status(403);
    return next({ message: "Access forbidden" });
  }

  const token = bearer.replace("Bearer ", "");

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
};

export default checkAuth;
