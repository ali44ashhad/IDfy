import express from "express";
import { createUser, getUser, getAllUsers, updateUser } from "../controllers/user.controller.js";
import { uploadPhoto } from "../config/multer.js";
 
const router = express.Router();

router.post("/create-user",uploadPhoto.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
   createUser);
router.get("/get-user/:id", getUser);
router.get("/get-all-users", getAllUsers);
router.put("/update-user/:id", updateUser);

export default router;