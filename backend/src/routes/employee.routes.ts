// Modules
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { verifyRole } from "../middlewares/roleMiddleware";
import {
  getAllEmployees,
  getEmployeeById,
} from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get(
  "/",
  authMiddleware,
  verifyRole(["Admin", "Manager"]),
  getAllEmployees
);

employeeRouter.get(
  "/:id",
  authMiddleware,
  verifyRole(["Admin", "Manager"]),
  getEmployeeById
);

export default employeeRouter;
