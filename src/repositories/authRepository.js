import { ObjectId } from "mongodb";
import { database } from "../database/mongodb.js";

async function findUserByEmail(email) {
  const user = await database.collection("users").findOne({ email });
  return user;
}

async function createUser(name, email, password) {
  await database.collection("users").insertOne({ name, email, password });
}

async function findUserById(id) {
  const user = await database
    .collection("users")
    .findOne({ _id: ObjectId(id) });
  return user;
}

const authRepository = {
  createUser,
  findUserByEmail,
  findUserById,
};

export default authRepository;
