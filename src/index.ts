import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { TypeormStore } from "connect-typeorm";

// TypeORM Data Source
import { AppDataSource } from "./data-source";
// Routes
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import session from "express-session";
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

app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));
