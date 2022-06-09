import express from "express";
import bodyParser from "body-parser";
import expressSession from "express-session";
import cors from "cors";
import dotenv from "dotenv";
// TypeORM
import { TypeormStore } from "connect-typeorm";
import { AppDataSource } from "./data-source";
import { Session } from "./entity";
// Rotues
import authRoutes from "./routes/auth.routes";
import menuRoutes from "./routes/menu.routes";
import slideRoutes from "./routes/slides.routes";
import userRoutes from "./routes/users.routes";

dotenv.config();

AppDataSource.initialize()
	.then(async () => {
		const app = express();
		app.use(
			cors({
				origin: ["http://localhost:3000"],
				methods: "GET,POST,PUT,DELETE",
				credentials: true,
			})
		);

		app.use(
			expressSession({
				secret: process.env.SESSION_SECRET!,
				resave: false,
				saveUninitialized: false,
				store: new TypeormStore({
					cleanupLimit: 0,
					limitSubquery: true,
				}).connect(AppDataSource.getRepository(Session)),
			})
		);

		app.use(bodyParser.json());

		app.use("/api/auth", authRoutes);
		app.use("/api/menu", menuRoutes);
		app.use("/api/slides", slideRoutes);
		app.use("/api/users", userRoutes);

		app.listen(process.env.PORT || 3000);
		console.log(`Express server has started on port ${process.env.PORT || 3000}.`);
	})
	.catch((error) => console.log(error));
