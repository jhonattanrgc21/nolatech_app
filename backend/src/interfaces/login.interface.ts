import { Types } from "mongoose";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
  fullName: string;
}
