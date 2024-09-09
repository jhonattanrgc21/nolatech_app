import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../schemas/users.schema";
import { Employee } from "../schemas/employees.schema";
import { Department } from "../schemas/departaments.schema";
import { Position } from "../schemas/positions.schema";
import { UserRegister } from "../interfaces/user-register.interface";
import { LoginRequest } from "../interfaces/login.interface";

export const createUser = async (userData: UserRegister) => {
  const { email, password, roleId, employeeData } = userData;
  const { firstName, lastName, positionId, departmentId } = employeeData;

  // Verificar si el email ya está en uso
  let user = await User.findOne({ email });
  if (user) throw new Error("El correo ya está en uso");

  // Verificar si el departmentId es válido
  const department = await Department.findById(departmentId);
  if (!department) throw new Error("El departamento no se encuentra registrado");

  // Verificar si el positionId es válido
  const position = await Position.findById(positionId);
  if (!position) throw new Error("El cargo no se encuentra registrado");

  // Crear un nuevo usuario
  const salt = await bcrypt.genSalt(10);

  user = new User({ email, password: await bcrypt.hash(password, salt), roleId });
  await user.save();

  // Crear un nuevo empleado asociado al usuario
  const employee = new Employee({
    firstName,
    lastName,
    positionId,
    departmentId,
    userId: user._id,
  });
  await employee.save();
};

export const login = async (loginData: LoginRequest) => {
  const { email, password } = loginData;

  // Verificar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 400, message: "Credenciales incorrectas" };
  }

  // Verificar la contraseña
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw { status: 400, message: "Credenciales incorrectas" };
  }

  // Generar JWT
  const token = jwt.sign(
    { userId: user._id, role: user.roleId },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const employee = await Employee.findOne({ userId: user._id });
  const fullName = employee ? `${employee.firstName} ${employee.lastName}` : '';

  return { token, userId: user._id, roleId: user.roleId, fullName };
};
