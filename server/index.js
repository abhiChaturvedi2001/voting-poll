import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import votingRouter from "./routes/votingRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "https://voting-poll-omega.vercel.app",
        credentials: true,
    })
);

// ✅ Use Vercel-Compatible Export
export default async function handler(req, res) {
    await connectDb();
    return app(req, res);
}

app.use("/", authRouter);
app.use("/", votingRouter);
