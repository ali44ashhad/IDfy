import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/admin.model.js";


const seedAdmin = async () => {
  try {
    console.log("Seeding started...");

    await connectDB();
    console.log("DB Connected...");

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (existingAdmin) {
      console.log("Admin already exists ❌");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await Admin.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created ✅");

    process.exit();

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedAdmin(); // 🔥 VERY IMPORTANT 