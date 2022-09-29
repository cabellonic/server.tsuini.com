import express from "express";
// Controllers
import * as userController from "./user.controller";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserByID);
router.get("/filter", userController.getUsersByCriteria);

export default router;
