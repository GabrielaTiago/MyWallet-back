import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./router/authRouter.js";
import walletRoutes from "./router/walletRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
config();

const server = express();
server.use(json(), cors());

server.use(authRouter);
server.use(walletRoutes);

server.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});
