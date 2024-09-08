import { Request, Response } from "express";
import { createUser, login } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, password, roleId, employeeData } = req.body;

  try {
    await createUser({ email, password, roleId, employeeData });
    res.status(201).json({ message: 'Registro exitoso'});
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { token, userId, role, fullName } = await login(req.body);
    res.status(200).json({ token, userId, role, fullName });
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
