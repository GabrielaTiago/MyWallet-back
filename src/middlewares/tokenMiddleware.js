import { db } from "../dbStrategy/mongodb";

function validateToken(require, response, next) {
    const { authorization } = require.headers;
    const token = authorization?.replace("Bearer ", "");
    const userOnline = await db.collection("").finOne({ "token": token });

    if (userOnline === null){
        return response.status(401).send("Did not find a token");
    }

    response.locals.userOnline = userOnline;

    next();
}

export default validateToken;