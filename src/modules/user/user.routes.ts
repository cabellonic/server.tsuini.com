import express from 'express';
// Controllers
import * as userController from './user.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/', catchAsyncErrors(userController.getUsers));
router.get('/:id', catchAsyncErrors(userController.getUserByID));
router.get('/filter', catchAsyncErrors(userController.getUsersByCriteria));

export default router;
