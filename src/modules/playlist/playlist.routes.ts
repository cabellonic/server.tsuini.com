import express from 'express';
// Controllers
import * as playlistController from './playlist.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/me', catchAsyncErrors(playlistController.getMyPlaylists));
router.get('/:id', catchAsyncErrors(playlistController.getPlaylistByID));
router.get('/user/:userId', catchAsyncErrors(playlistController.getUserPlaylists));
router.post('/user/:userId', catchAsyncErrors(playlistController.createPlaylist));

export default router;
