import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
dotenv.config();

const server = express();
server.use(json(), cors());

server.use(router);


server.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
});