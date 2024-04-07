import { Router } from "express";
import { forgotPassword, loginUser, refreshAccessToken, registerUser, resetPassword } from "../controller/auth.controller.js";

const router=Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)
router.route("/forget-password").post(forgotPassword)
router.route("/reset-password/:resetToken").patch(resetPassword)
router.route("/refresh-token").post(refreshAccessToken)

export default router