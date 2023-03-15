import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../swagger.json" assert { type: "json" };
import authRouter from "./authRouter.js";
import transactionsRouter from "./transactionsRouter.js";

const router = Router();

router.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.use(authRouter);
router.use(transactionsRouter);

export default router;
