const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "Secret");
    if (req.user == decoded.user.email) {
      next();
    } else {
      return res.status(403).json({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authGuard;
