import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController.js";
import signInMiddleware from "../middlewares/signInMiddleware.js";
import signUpMiddleware from "../middlewares/signUpMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-in", signInMiddleware, signInUser);
authRouter.post("/sign-up", signUpMiddleware, signUpUser);

export default authRouter;