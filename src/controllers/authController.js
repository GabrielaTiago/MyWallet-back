import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { singInSchema, signUpSchema } from "../schema/schemas.js"
import { db } from "../dbStrategy/mongodb.js";


async function signInUser(require, response) {
    const { email, password } = require.body;
    const validation = singInSchema.validate(require.body, { abortEarly: true });
    const user = await db.collection("users").findOne({ email });

    if (validation.error) {
        return response.status(422).send(validation.error.details);
    }

    try {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            
            await db
                .collection("personal-wallet")
                .insertOne({
                    userId: user._id,
                    token
                });

            return response.status(201).send("Login successfully")
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
    const validation = signUpSchema.validate(signUp, { abortEarly: true });
    const user = await db.collection("users").findOne({ email: signUp.email });

    if (validation.error) {
        return response.status(422).send(validation.error.details);
    }

    if (user) {
        return response.status(422).send("User already exits");
    }

    try {
        const passwordHash = bcrypt.hashSync(signUp.password, 10);

        await db
            .collection("users")
            .insertOne({ ...signUp, password: passwordHash });

        response.status(201).send("Registered user");

    } catch (error) {
        console.error(error);
        response.status(500).send("Bad request");
    }
}

export { signInUser, signUpUser };