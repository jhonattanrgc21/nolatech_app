import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../schemas/users.schema";
import { Role } from "../schemas/roles.schema";

// Middleware para verificar roles
export const verifyRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res
          .status(401)
          .json({ message: "Acceso denegado. No se proporcionó token." });
      }

      // Verificar el token y obtener los datos del usuario
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      // Buscar al usuario en la base de datos
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado." });
      }

      // Obtener el rol del usuario
      const role = await Role.findById(user.roleId);

      if (!role) {
        return res.status(403).json({ message: "Rol no encontrado." });
      }

      // Verificar si el rol del usuario está permitido
      if (!roles.includes(role.name)) {
        return res
          .status(403)
          .json({
            message: "Acceso denegado. No tienes los permisos adecuados.",
          });
      }

      // El rol es válido, permitir el acceso a la ruta
      next();
    } catch (error) {
      return res.status(500).json({ message: "Error del servidor", error });
    }
  };
};
