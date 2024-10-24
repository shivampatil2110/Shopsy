const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schema/user");

const register = async (req, res) => {
  const { username, password, email, isAdmin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword, email, isAdmin });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
    };
    const token = jwt.sign(payload, "Secret", { expiresIn: "6h" });
    res.cookie("userId", user.id, {
      maxAge: 21600000,
      secure: true,
      sameSite: "None",
    });
    res.cookie("isAdmin", user.isAdmin, {
      maxAge: 21600000,
      secure: true,
      sameSite: "None",
    });
    res.cookie("userEmail", user.email, {
      maxAge: 21600000,
      secure: true,
      sameSite: "None",
    });
    res.cookie("jwtToken", token, {
      maxAge: 21600000,
      secure: true,
      sameSite: "None",
    }); // secure: true if using HTTPS
    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login, register };
