import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signInUser, signUpUser } from "./controllers/authController.js";
dotenv.config();

const server = express();
server.use(json(), cors());


server.post("/sign-in", signInUser);
server.post("/sign-up", signUpUser);

server.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
});