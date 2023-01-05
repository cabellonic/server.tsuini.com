import { AxiosError } from 'axios';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	console.error(error.message);
	if (error instanceof AxiosError) {
		return res.status(error.response.status).json(error.response.data);
	}
	return res.status(500).json({ message: 'Internal server error.' });
};
