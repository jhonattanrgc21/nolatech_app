// Modules
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { verifyRole } from "../middlewares/roleMiddleware";
import { register, signin } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", authMiddleware, verifyRole(['Admin']), register);
authRouter.post("/login", signin);

export default authRouter;
