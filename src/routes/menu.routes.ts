import express from "express";
// Services
import * as menuService from "../services/menu.service";
// Validations
import toNewMenuItem from "../validations/menuItem.validation";

const router = express.Router();

router.get("/", async (_, res) => {
	try {
		const menuItemsFromDB = await menuService.getMenuItems();
		if (menuItemsFromDB) return res.json(menuItemsFromDB);
		return res.status(404).json({ message: "Menu items not found" });
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const menuItemFromDB = await menuService.getMenuItemById(req.params.id);
		if (menuItemFromDB) return res.json(menuItemFromDB);
		return res.status(404).json({ message: "Menu Item not found" });
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

router.post("/", async (req, res) => {
	try {
		const newMenuItem = toNewMenuItem(req.body);
		const addedMenuItem = await menuService.addMenuItem(newMenuItem);
		return res.status(201).json(addedMenuItem);
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

export default router;
