import express from "express";
// Controllers
import * as artistController from "./artist.controller";

const router = express.Router();

router.get("/", artistController.getArtists);
router.get("/:id", artistController.getArtistByID);

export default router;
