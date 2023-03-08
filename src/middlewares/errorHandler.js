import { ERRORS } from "../errors/errors.js";

export default function errorHandler(error, req, res, next) {
  const { type, message } = error;
  const statusCode = ERRORS[type];

  if (statusCode) {
    res.status(statusCode).send(message);
  }

  console.error(error);
  res.status(500).status("Internal Server Error");
}
