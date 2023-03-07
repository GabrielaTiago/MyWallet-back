import { Router } from "express";
import { getWallet, postTransaction } from "../controllers/walletController.js";
import schemasValidation from "../middlewares/schemasValidation.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const walletRouter = Router();

walletRouter.use(tokenValidation);
walletRouter.get("/transactions", getWallet);
walletRouter.post(
  "/transactions",
  schemasValidation("transaction"),
  postTransaction
);

export default walletRouter;
