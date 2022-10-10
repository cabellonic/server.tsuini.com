import express from 'express';
// Controllers
import * as authController from './auth.controller';
// Utils
import { catchAsyncErrors } from '../../utils';

const router = express.Router();

router.get('/login', catchAsyncErrors(authController.login));
router.get('/callback', catchAsyncErrors(authController.authCallback));
router.get('/me', catchAsyncErrors(authController.getMe));
router.get('/logout', catchAsyncErrors(authController.logout));
router.get('/refresh', catchAsyncErrors(authController.refresh));

export default router;
