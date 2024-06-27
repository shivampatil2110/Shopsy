const jwt = require("jsonwebtoken");

const setUserName = (req, res, next) => {
  // const token = req.cookies.jwtToken;

  // if (!token) {
  //   return res.status(401).json({ message: "No token, authorization denied" });
  // }
  try {
    // const decoded = jwt.verify(token, "Secret");
    req.user = "grokhborito69@gmail.com";
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = setUserName;
