import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

export default function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = {
      type: "unauthorized",
      message: "Missing authorization header",
    };
    throw error;
  }

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    const error = {
      type: "unauthorized",
      message: "Token not found",
    };
    throw error;
  }

  try {
    const JWT_KEY = process.env.JWT_KEY;
    const validToken = jwt.verify(token, JWT_KEY);

    res.locals.user = { id: validToken.id };

    next();
  } catch {
    const error = {
      type: "unauthorized",
      message: "Token inválido",
    };
    throw error;
  }
}
