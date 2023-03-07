import { Router } from "express";
import { getWallet, postTransaction } from "../controllers/walletController.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import transactionsMiddleware from "../middlewares/transactionsMiddleware.js";

const walletRouter = Router();

walletRouter.get("/transactions", validateToken, getWallet);
walletRouter.post("/transactions", validateToken, transactionsMiddleware, postTransaction);

export default walletRouter;