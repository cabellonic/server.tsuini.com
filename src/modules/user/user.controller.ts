import { Request, Response, NextFunction } from "express";
// Services
import * as userService from "./user.service";

export const getUsers = async (req: Request, res: Response, _next: NextFunction) => {
	const users = await userService.getUsers();
	return res.json({ users });
};

export const getUserByID = async (req: Request, res: Response, _next: NextFunction) => {
	const { id } = req.params;
	const user = await userService.getUserByID(id);
	return res.json({ user });
};

export const getUsersByCriteria = async (req: Request, res: Response, _next: NextFunction) => {
	const criteria = req.query;
	const users = await userService.getUsersByCriteria(criteria);
	return res.json({ users });
};
