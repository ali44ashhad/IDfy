import express from "express";
import { createUser, updateUser } from "../controllers/user.controller.js";
import { uploadPhoto } from "../config/multer.js";
 
const router = express.Router();

router.post("/create-user",uploadPhoto.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
   createUser);

router.put("/update-user/:id", updateUser);

export default router;