import jwt from "jsonwebtoken";

 const generateToken = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 🍪 store in cookie
  res.cookie("token", token, {
    httpOnly: true, // 🔐 cannot access via JS
    secure: "true", // https only in prod
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
   });

  return token;
};

export default generateToken;