import { Router } from "express";
import { getWallet, postTransaction } from "../controllers/walletController.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import transactionsMiddleware from "../middlewares/transactionsMiddleware.js";

const walletRoutes = Router();

walletRoutes.get("/transactions", validateToken, getWallet);
walletRoutes.post("/transactions", validateToken, transactionsMiddleware, postTransaction);


export default walletRoutes;