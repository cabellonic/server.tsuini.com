import express from 'express';
// Controllers
import * as translationController from './translation.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(translationController.getTranslations));
router.get('/:id', catchAsyncErrors(translationController.getTranslationByID));
router.post('/', catchAsyncErrors(translationController.createTranslation));
router.put('/:id', catchAsyncErrors(translationController.updateTranslation));
router.delete('/:id', catchAsyncErrors(translationController.deleteTranslation));

export default router;
