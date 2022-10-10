import express from 'express';
// Services
import * as albumController from './album.controller';

const router = express.Router();

router.get('/', albumController.getAlbums);
router.get('/:id', albumController.getAlbumByID);

export default router;
