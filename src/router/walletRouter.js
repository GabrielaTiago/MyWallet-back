import { Router } from "express";
import { getWallet, postTransaction } from "../controllers/walletController.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import schemasValidation from "../middlewares/schemasValidation.js";

const walletRouter = Router();

walletRouter.get("/transactions", validateToken, getWallet);
walletRouter.post(
  "/transactions",
  validateToken,
  schemasValidation("transaction"),
  postTransaction
);

export default walletRouter;
