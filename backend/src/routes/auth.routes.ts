// Modules
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { verifyRole } from "../middlewares/roleMiddleware";
import { register, signin } from "../controllers/auth.controller";
import { validateUserRegister } from "../middlewares/userRegisterMiddleware";

const authRouter = Router();

authRouter.post("/register", authMiddleware, verifyRole(['Admin']), validateUserRegister, register);
authRouter.post("/login", signin);

export default authRouter;
