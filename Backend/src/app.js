import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import aiRouter from "./routes/ai.routes.js"; // ✅ CORRECT
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [process.env.ALLOWED_SITE], // ✅ correct for Vite frontend
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRouter);     // ✅ OK
app.use("/api/resumes", resumeRouter); // ✅ OK
app.use("/api/ai", aiRouter);          // ✅ REQUIRED & CORRECT

export default app;
