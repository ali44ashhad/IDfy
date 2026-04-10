import User from "../models/user.model.js";
 
export const createUser = async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);
  
      const {
        email,
        tellegramId,
        pronoun,
        firstName,
        middleName,
        lastName,
        addressOne,
        addressTwo,
        city,
        postalCode,
        dateOfBirth,
        license,
        gender,
        paymentRef,
      } = req.body || {};
  
      // ✅ Cloudinary URLs
      const photoUrl = req.files?.photo?.[0]?.path || null;
      const signatureUrl = req.files?.signature?.[0]?.path || null;

  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const user = await User.create({
       
        email,
        tellegramId,
        pronoun,
        firstName,
        middleName,
        lastName,
        addressOne,
        addressTwo,
        city,
        postalCode,
        dateOfBirth,
        license,
        photo: photoUrl,      // ✅ cloudinary URL
        signature: signatureUrl ,  // ✅ cloudinary URL
        gender,
        paymentRef,
      });
  
      res.status(201).json({
        message: "User created successfully",
        data: user,
    
      });
      console.log("User created successfully", user);
  
    } catch (error) {
      console.error("🔥 FULL ERROR:", error);
      return res.status(500).json({
        message: error.message,
        error: error
      });
    }
  };

  
export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user, { message: "User fetched successfully" });
};

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users, { message: "All Users fetched successfully" });
};

export const updateUser = async (req, res) => {
    const user = await User.findOneAndReplace(req.params.id, req.body, { new: true });
    res.status(200).json(user, { message: "User updated successfully" });
};

 