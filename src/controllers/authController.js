import { MongoClient } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
    db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
});


const singInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(4)
});


export async function signInUser (require, response) {
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
};