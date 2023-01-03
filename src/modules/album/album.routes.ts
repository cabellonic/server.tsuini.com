import express from 'express';
// Services
import * as albumController from './album.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(albumController.getAlbums));
router.get('/:id', catchAsyncErrors(albumController.getAlbumByID));
router.get('/spotify/:id', catchAsyncErrors(albumController.getAlbumFromSpotify));
router.post('/', catchAsyncErrors(albumController.createAlbum));

export default router;
