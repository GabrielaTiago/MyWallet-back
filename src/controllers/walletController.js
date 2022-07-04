import { db } from "../dbStrategy/mongodb.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

async function getWallet(require, response) {
    const userId = response.locals.userOnline._id;

    try {
        const wallet = await db.collection("personalWallet").find({ userId }).toArray();
        response.send(wallet);

    } catch (error) {
        console.error(error);
        response.status(500).send("Bad Request");
    }
}

async function postTransaction(require, response) {
    const userId = response.locals.userOnline._id;
    const {amout, description, status} = require.body;
    const day = dayjs().format("DD-MM");
    
    try {
        if (userId) {
            const transaction = await db.collection("transactions").insertOne({
                day: day,
                amout,
                description,
                status,
                id: userId
            });
            response.sendStatus(201);
        }

    } catch (error) {
        console.error(error);
        response.status(500).send("Bad Request");
    }
}

export { getWallet, postTransaction };