import express from 'express';
// Controllers
import * as playerController from './player.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

// Player controller
router.get('/', catchAsyncErrors(playerController.getPlaybackState));
router.put('/', catchAsyncErrors(playerController.setPlaybackDevice));
router.put('/play', catchAsyncErrors(playerController.setPlaybackPlay));
router.put('/pause', catchAsyncErrors(playerController.setPlaybackPause));
router.put('/repeat', catchAsyncErrors(playerController.setPlaybackRepeat));
router.post('/next', catchAsyncErrors(playerController.setPlaybackNext));
router.post('/previous', catchAsyncErrors(playerController.setPlaybackPrevious));
router.put('/seek', catchAsyncErrors(playerController.setPlaybackSeek));
router.put('/shuffle', catchAsyncErrors(playerController.setPlaybackShuffle));
router.put('/volume', catchAsyncErrors(playerController.setPlaybackVolume));
router.get('/devices', catchAsyncErrors(playerController.getPlaybackDevices));

// Playlist controller
// router.get("/queue", () => {});
// router.get("/recently-played", () => {});
// router.get("/currently-playing", () => {});
// router.post("/queue", () => {});

export default router;
