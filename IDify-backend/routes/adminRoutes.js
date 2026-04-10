import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminAuth.controller.js";
 
const router = express.Router();

router.post("/admin-login", loginAdmin);
router.post("/admin-logout", logoutAdmin);

export default router;