import { Router } from "express";
import transactionsController from "../controllers/transactionsController.js";
import schemasValidation from "../middlewares/schemasValidation.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const { createTransaction, getAllTransactions } = transactionsController;

const transactionsRouter = Router();

transactionsRouter.use(tokenValidation);
transactionsRouter.get("/transactions", getAllTransactions);
transactionsRouter.post(
  "/transactions",
  schemasValidation("transaction"),
  createTransaction
);

export default transactionsRouter;
