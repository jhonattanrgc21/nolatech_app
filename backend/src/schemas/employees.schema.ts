import { Schema, model } from "mongoose";
import { IEmployee } from "../interfaces/employees.interface";

const employeeSchema = new Schema<IEmployee>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    positionId: { type: Schema.Types.ObjectId, ref: "Position", required: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    evaluations: [{ type: Schema.Types.ObjectId, ref: "Evaluation" }],
  },
  { timestamps: true }
);

export const Employee = model<IEmployee>("Employee", employeeSchema);
