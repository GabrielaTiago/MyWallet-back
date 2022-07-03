import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController.js";
import signInMiddleware from "../middlewares/signInMiddleware.js";
import signUpMiddleware from "../middlewares/signUpMiddleware.js";

const router = Router();

router.post("/sign-in", signInMiddleware, signInUser);
router.post("/sign-up", signUpMiddleware, signUpUser);

export default router;