import express from "express";
// Services
import * as songService from "./song.controller";

const router = express.Router();

router.get("/", songService.getSongs);
router.get("/:id", songService.getSongByID);

export default router;
