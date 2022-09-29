import express from "express";
// Controllers
import * as authController from "./auth.controller";

const router = express.Router();

router.get("/login", authController.login);
router.get("/callback", authController.authCallback);
router.get("/me", authController.getMe);
router.get("/logout", authController.logout);

export default router;
