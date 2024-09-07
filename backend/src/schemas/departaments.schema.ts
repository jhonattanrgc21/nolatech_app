import { Schema, model } from "mongoose";
import { IDepartment } from "../interfaces/departaments.interface";

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, trim: true, required: true, unique: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Department = model<IDepartment>("Department", departmentSchema);
