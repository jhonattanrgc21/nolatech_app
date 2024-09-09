import { Request, Response } from "express";
import { createUser, login } from "../services/auth.service";
import { UserRegister } from "../interfaces/user-register.interface";
import { LoginRequest, LoginResponse } from "../interfaces/login.interface";

export const register = async (req: Request, res: Response) => {
  const body: UserRegister = req.body;

  try {
    await createUser(body);
    res.status(201).json({ message: 'Registro exitoso'});
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const body: LoginRequest = req.body;
    const response: LoginResponse = await login(body);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
