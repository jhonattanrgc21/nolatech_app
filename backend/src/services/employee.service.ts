import { Employee } from "../schemas/employees.schema";

export const findAll = async () => {
  return await Employee.find();
};

export const findById = async (id: string) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new Error("Empleado no encontrado");
  }
  return employee;
};
