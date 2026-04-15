import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminAuth.controller.js";
import { getUser, getAllUsers, updateUserStatus } from "../controllers/admin.controller.js";
import { isAuth } from "../middleware/authMiddleware.js";
 
const router = express.Router();

router.post("/admin-login", loginAdmin);
router.post("/admin-logout", logoutAdmin);

// admin routes // 
router.get("/get-user/:id",isAuth, getUser);
router.get("/get-all-users",isAuth, getAllUsers);
router.put("/update-user-status/:id", isAuth, updateUserStatus);

export default router;  