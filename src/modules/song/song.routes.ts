import express from 'express';
// Services
import * as songService from './song.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(songService.getSongs));
router.get('/:id', catchAsyncErrors(songService.getSongByID));
router.get('/spotify/:id', catchAsyncErrors(songService.getSongFromSpotify));
router.post('/', catchAsyncErrors(songService.createSong));

export default router;
