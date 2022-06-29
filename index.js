import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const server = express();

const mongoClient = new MongoClient(process.env.MONGO_URI);

server.listen(process.env.PORT, () => {
    console.log(`O servidor está funcionando na porta ${process.env.PORT}`)
});