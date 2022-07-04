import { db } from "../dbStrategy/mongodb.js";

async function getWallet(require, response) {
    const userId = response.locals.userOnline._id;

    try {
        const transactions = await db.collection("personalWallet").find({ userId }).toArray();
        response.send(transactions);

    } catch (error) {
        console.error(error);
        response.status(500).send("Bad Request");
    }
}

export { getWallet };