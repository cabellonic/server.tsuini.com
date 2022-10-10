import express from 'express';
// Services
import * as songService from './song.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(songService.getSongs));
router.get('/:id', catchAsyncErrors(songService.getSongByID));

export default router;
