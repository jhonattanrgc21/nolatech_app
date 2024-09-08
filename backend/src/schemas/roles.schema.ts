import { Schema, model } from 'mongoose';
import { IRole } from '../interfaces/roles.interface';


// Esquema para Role
const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      required: true,
      unique: true
    },
  },
  {
    timestamps: true
  }
);

// Modelo para Role
export const Role = model<IRole>('Role', roleSchema);
