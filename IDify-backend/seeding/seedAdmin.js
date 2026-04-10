import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/admin.model.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    console.log("Seeding started...");

    await connectDB();
    console.log("DB Connected...");

    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com"
    });

    if (existingAdmin) {
      console.log("Admin already exists ❌");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await Admin.create({
      name: "Admin",
      email: "admin@gmail.com",
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