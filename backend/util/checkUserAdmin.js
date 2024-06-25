const isAdmin = (req, res, next) => {
  try {
    if (req.cookies.isAdmin) {
      next();
    } else {
      throw new Error("Not an admin");
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = isAdmin;
