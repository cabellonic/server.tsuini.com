import express from 'express';
// Controllers
import * as rankController from './rank.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(rankController.getRanks));
router.post('/', catchAsyncErrors(rankController.createRank));

export default router;
