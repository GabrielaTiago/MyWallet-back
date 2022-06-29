import express, { json } from "express";
import { MongoClient } from "mongodb";
import joi from "joi";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(json());
server.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
});


const singInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(4)
});


server.post("/sign-in", async (require, response) => {
    const userSingIn = require.body;

    const validation = singInSchema.validate(userSingIn, { abortEarly: true });

    if(validation.error){
        response.status(422).send(validation.error.details);
    }

    try {
        await db
            .collection("users")
            .insertOne({userSingIn});
    } catch (error) {
        console.error(error);
        response.status(500).send("Erro na requisição");
    }
});

server.listen(process.env.PORT, () => {
    console.log(`O servidor está funcionando na porta ${process.env.PORT}`);
});