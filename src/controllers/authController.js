import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { database } from "../database/mongodb.js";


async function signInUser(require, response) {
    const { email, password } = require.body
    const user = await database.collection("users").findOne({ email });

    try {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await database
                .collection("personalWallet")
                .insertOne({
                    userId: user._id,
                    token
                });

            return response.status(201).send({token, name: user.name});
        }
        else {
            return response.status(401).send("Incorrect email or password");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Bad request");
    }
};

async function signUpUser(require, response) {
    const signUp = require.body;
    const user = await database.collection("users").findOne({ email: signUp.email });

    if (user) {
        return response.status(422).send("User already exits");
    }

    try {
        const passwordHash = bcrypt.hashSync(signUp.password, 10);
        delete signUp.confirmPassword;

        await database
            .collection("users")
            .insertOne({ ...signUp, password: passwordHash });

        response.status(201).send("Registered user");

    } catch (error) {
        console.error(error);
        response.status(500).send("Bad request");
    }
}

export { signInUser, signUpUser };