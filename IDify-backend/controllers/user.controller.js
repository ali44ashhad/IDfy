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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

 