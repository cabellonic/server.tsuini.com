import express from "express";
// Services
import * as userService from "../services/users.service";

const router = express.Router();

router.get("/", async (_, res) => {
	try {
		const usersFromDB = await userService.getUsers();
		if (usersFromDB) return res.json(usersFromDB);
		return res.status(404).json({ message: "Users not found" });
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const userFromDB = await userService.getUserById(req.params.id);
		if (userFromDB) return res.json(userFromDB);
		return res.status(404).json({ message: "User not found" });
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

export default router;
