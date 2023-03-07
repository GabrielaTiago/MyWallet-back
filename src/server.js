import "express-async-errors";
import chalk from "chalk";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import authRouter from "./router/authRouter.js";
import walletRoutes from "./router/walletRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

config();

const server = express();

server.use(json(), cors());

server.use(authRouter);
server.use(walletRoutes);

server.use(errorHandler);

const PORT = Number(process.env.PORT) || 5500;

server.listen(PORT, () => {
  console.log(chalk.bold.green(`The server is up and runnig on port ${PORT}`));
});
