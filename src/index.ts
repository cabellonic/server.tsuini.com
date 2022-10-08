import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// TypeORM Data Source
import { AppDataSource } from "./data-source";
import { TypeormStore } from "connect-typeorm";
// Routes
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import songRoutes from "./modules/song/song.routes";
import albumRoutes from "./modules/album/album.routes";
import artistRoutes from "./modules/artist/artist.routes";
import playerRoutes from "./modules/player/player.routes";

// Models
import { Session } from "./models";

dotenv.config();

AppDataSource.initialize()
	.then(async () => {
		console.log("Database initialized");
	})
	.catch((error) => console.log(error));

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:5000", "http://localhost:5173"],
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: new TypeormStore({
			cleanupLimit: 0,
			limitSubquery: true,
		}).connect(AppDataSource.getRepository(Session)),
	})
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/player", playerRoutes);

app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));
