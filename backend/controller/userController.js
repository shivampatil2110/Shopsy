const User = require("../schema/user");

const userProfile = async (req, res) => {
  try {
    let response = await User.findOne({ email: req.user });
    if (!response) {
      return;
    }
    res.send(reponse);
  } catch (error) {}
};

module.exports = { userProfile };
