import { Router } from "express";
import { getWallet } from "../controllers/walletController.js";
import validateToken from "../middlewares/tokenMiddleware.js";


const walletRoutes = Router();

walletRoutes.get("/home", validateToken, getWallet);


export default walletRoutes;