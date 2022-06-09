import express from "express";
// Services
import * as slidesService from "../services/slides.service";
// Validations
import toNewSlideEntry from "../validations/slide.validation";

const router = express.Router();

router.get("/", async (_, res) => {
	try {
		const slidesFromDB = await slidesService.getSlides();
		if (slidesFromDB) return res.json(slidesFromDB);
		return res.status(404).json({ message: "Slides not found" });
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const slideFromDB = await slidesService.getSlideById(req.params.id);
		if (slideFromDB) return res.json(slideFromDB);
		return res.status(404).json({ message: "Slide not found" });
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

router.post("/", async (req, res) => {
	try {
		const newSlideEntry = toNewSlideEntry(req.body);
		const addedSlide = await slidesService.addSlide(newSlideEntry);
		return res.status(201).json(addedSlide);
	} catch (error) {
		if (error instanceof Error) return res.status(500).json({ error: error.message });
		return res.status(500).json({ message: "Something went wrong" });
	}
});

export default router;
