import { Request, Response, NextFunction } from 'express';

export const catchAsyncErrors = middleware => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await middleware(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
