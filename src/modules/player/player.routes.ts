import express from "express";
// Controllers
import * as playerController from "./player.controller";

const router = express.Router();

// Player controller
router.get("/", playerController.getPlaybackState);
router.put("/", playerController.setPlaybackDevice);
router.put("/play", playerController.setPlaybackPlay);
router.put("/pause", playerController.setPlaybackPause);
router.put("/repeat", playerController.setPlaybackRepeat);
router.post("/next", playerController.setPlaybackNext);
router.post("/previous", playerController.setPlaybackPrevious);
router.put("/seek", playerController.setPlaybackSeek);
router.put("/shuffle", playerController.setPlaybackShuffle);
router.put("/volume", playerController.setPlaybackVolume);
router.get("/devices", playerController.getPlaybackDevices);

// Playlist controller
// router.get("/queue", () => {});
// router.get("/recently-played", () => {});
// router.get("/currently-playing", () => {});
// router.post("/queue", () => {});

export default router;
