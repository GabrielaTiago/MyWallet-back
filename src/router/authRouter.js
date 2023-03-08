import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController.js";
import schemasValidation from "../middlewares/schemasValidation.js";

const authRouter = Router();

authRouter.post("/sign-in", schemasValidation("sign_in"), signInUser);
authRouter.post("/sign-up", schemasValidation("sign_up"), signUpUser);

export default authRouter;
