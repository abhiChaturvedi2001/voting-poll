import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import cors from "cors"
import authRouter from "./routes/authRoutes.js"
import votingRouter from "./routes/votingRoutes.js"
dotenv.config({})

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://voting-poll-omega.vercel.app",
    credentials: true
}));
app.use("/", authRouter);
app.use("/", votingRouter);

const port = process.env.PORT
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`port on ${port}`)
    })
}).catch((error) => {
    console.log(`${error}`)
})

export default app;
