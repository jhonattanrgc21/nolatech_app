// Modules
import { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
} from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", getAllEmployees);
employeeRouter.get( "/:id", getEmployeeById);

export default employeeRouter;
