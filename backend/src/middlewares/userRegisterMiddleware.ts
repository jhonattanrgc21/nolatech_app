import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Role } from "../schemas/roles.schema";
import { Position } from "../schemas/positions.schema";
import { Department } from "../schemas/departaments.schema";

export const validateUserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, roleId, employeeData } = req.body;

  // Validación de campos obligatorios
  if (!email || !password || !roleId || !employeeData) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  // Validar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Formato de email inválido" });
  }

  // Validar la longitud de la contraseña
  if (password.length < 8) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
  }

  // Validar si roleId es un ObjectId válido y si el rol existe
  if (!mongoose.Types.ObjectId.isValid(roleId)) {
    return res.status(400).json({ message: "El roleId no es válido" });
  }

  const roleExists = await Role.findById(roleId);
  if (!roleExists) {
    return res.status(404).json({ message: "Rol no encontrado" });
  }

  // Validar los campos de employeeData
  const { firstName, lastName, positionId, departmentId } = employeeData;

  if (!firstName || !lastName || !positionId || !departmentId) {
    return res.status(400).json({ message: "Todos los campos de employeeData son obligatorios" });
  }

  // Validar si positionId es un ObjectId válido y si la posición existe
  if (!mongoose.Types.ObjectId.isValid(positionId)) {
    return res.status(400).json({ message: "El positionId no es válido" });
  }

  const positionExists = await Position.findById(positionId);
  if (!positionExists) {
    return res.status(404).json({ message: "Posición no encontrada" });
  }

  // Validar si departmentId es un ObjectId válido y si el departamento existe
  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    return res.status(400).json({ message: "El departmentId no es válido" });
  }

  const departmentExists = await Department.findById(departmentId);
  if (!departmentExists) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }

  // Si todas las validaciones pasan, continuar con el siguiente middleware/controlador
  next();
};
