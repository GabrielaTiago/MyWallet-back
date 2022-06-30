import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signInUser } from "./controllers/authController.js";
dotenv.config();

const server = express();
server.use(json(), cors());



server.post("/sign-in", signInUser);

server.listen(process.env.PORT, () => {
    console.log(`O servidor está funcionando na porta ${process.env.PORT}`);
});