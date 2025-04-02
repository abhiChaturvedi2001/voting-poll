import express from "express"
import { getProfile, loginUser, logoutUser, registerUser, } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authMiddleware, getProfile);

export default router