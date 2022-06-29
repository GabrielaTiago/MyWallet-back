import express, { json } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(json());
server.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
    db = mongoClient.db(process.env.DATABASE)
});



server.post("/sing-in", async (require, response) => {
    const userSingIn = require.body;

    try {
        await db
            .collection("users")
            .insertOne({
                name: name,
            });
    } catch (error) {
        console.error(error);
        response.status(500).send("Erro na requisição");
    }
});

server.listen(process.env.PORT, () => {
    console.log(`O servidor está funcionando na porta ${process.env.PORT}`);
});