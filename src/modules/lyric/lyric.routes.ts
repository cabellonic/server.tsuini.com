import express from 'express';
// Controllers
import * as lyricController from './lyric.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(lyricController.getLyrics));
router.get('/:id', catchAsyncErrors(lyricController.getLyricByID));
router.post('/', catchAsyncErrors(lyricController.createLyric));
router.put('/:id', catchAsyncErrors(lyricController.updateLyric));
router.delete('/:id', catchAsyncErrors(lyricController.deleteLyric));

export default router;
