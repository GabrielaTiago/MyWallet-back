import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController.js";

const router = Router();

router.post("/sign-in", signInUser);
router.post("/sign-up", signUpUser);

export default router;