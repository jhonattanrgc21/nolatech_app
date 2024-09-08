// routes/evaluations.routes.ts
import { Router } from "express";
import { createEvaluation, getEvaluationById, updateEvaluation } from "../controllers/evaluation.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { verifyRole } from "../middlewares/roleMiddleware";

const evaluationRouter = Router();

evaluationRouter.post("/", authMiddleware, verifyRole(["Admin", "Manager"]), createEvaluation);
evaluationRouter.get("/:id", authMiddleware, verifyRole(["Admin", "Manager"]), getEvaluationById);
evaluationRouter.put("/:id", authMiddleware, verifyRole(["Admin", "Manager"]), updateEvaluation);

export default evaluationRouter;