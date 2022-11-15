import express from 'express';
// Controllers
import * as languageController from './language.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(languageController.getLanguages));
router.get('/:id', catchAsyncErrors(languageController.getLanguageByID));
router.post('/', catchAsyncErrors(languageController.createLanguage));
router.put('/:id', catchAsyncErrors(languageController.updateLanguage));
router.delete('/:id', catchAsyncErrors(languageController.deleteLanguage));

export default router;
