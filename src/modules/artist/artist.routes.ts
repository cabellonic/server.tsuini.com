import express from 'express';
// Controllers
import * as artistController from './artist.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(artistController.getArtists));
router.get('/:id', catchAsyncErrors(artistController.getArtistByID));
router.get('/spotify/:id', catchAsyncErrors(artistController.getArtistFromSpotify));
router.post('/', catchAsyncErrors(artistController.createArtist));

export default router;
