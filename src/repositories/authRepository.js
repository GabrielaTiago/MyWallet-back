import { database } from "../database/mongodb.js";

async function findUserByEmail(email) {
  const user = await database.collection("users").findOne({ email });
  return user;
}

async function createUser(name, email, password) {
  await database.collection("users").insertOne({ name, email, password });
}

const authRepository = {
  createUser,
  findUserByEmail,
};

export default authRepository;
