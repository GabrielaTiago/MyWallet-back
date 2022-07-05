import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js"
dotenv.config();

const server = express();
server.use(json(), cors());

server.use(authRouter);
server.use(walletRoutes);

server.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
});