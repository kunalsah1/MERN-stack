require("dotenv").config();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  const { userName, email, password} = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred in backend" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed, user not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res.json({ token, userName: user.userName });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ status: "success" });
};
