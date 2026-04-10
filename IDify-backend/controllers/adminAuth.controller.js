import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/generateToken.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // 🔥 generate token + set cookie
  const token = generateToken(res, user._id);
  const message = "Welcome to the Admin Dashboard";
  res.status(200).json({
    token: token,
    _id: user._id,
    name: user.name,
    email: user.email,
    message: message
  });
};

export const logoutAdmin = (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      expires: new Date(0)
    });
  
    res.json({ message: "Logged out" });
  };