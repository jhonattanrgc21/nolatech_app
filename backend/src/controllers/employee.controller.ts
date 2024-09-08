import { Request, Response } from "express";
import { findAll, findById } from "../services/employee.service";
import { IEmployee } from "../interfaces/employees.interface";

export const getAllEmployees = async (req: Request, res: Response) => {
  const employees: IEmployee[] = await findAll();
  res.json({employees});
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await findById(id);
      return res.status(200).json({employee});
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  };