import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/users.interface";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 50,
    },
    password: { type: String, trim: true, required: true, minlength: 8 },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
