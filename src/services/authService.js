import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository.js";

config();

async function signUpUser({ name, email, password }) {
  const user = await authRepository.findUserByEmail(email);

  if (user) {
    const error = { type: "conflict", message: "Esse email já foi cadastrado" };
    throw error;
  }

  const encryptedPassword = passwordCryptographer(password);

  await authRepository.createUser(name, email, encryptedPassword);
}

async function signInUser({ email, password }) {
  const user = await authRepository.findUserByEmail(email);
  const validPassword = checkUserPassword(password, user.password);

  if (user && validPassword) {
    const token = generatesToken(user._id, email);
    return { message: "Autenticado com sucesso!", token, name: user.name };
  } else {
    const error = {
      type: "unauthorized",
      message: "Email e/ou senha incorretos",
    };
    throw error;
  }
}

function passwordCryptographer(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

function checkUserPassword(password, savedPassword) {
  return bcrypt.compareSync(password, savedPassword);
}

function generatesToken(id, email) {
  const payload = { id, email };
  const key = process.env.JWT_KEY;
  const expiration = { expiresIn: "1d" };

  const token = jwt.sign(payload, key, expiration);
  return token;
}

const authServices = {
  signInUser,
  signUpUser,
};

export default authServices;
