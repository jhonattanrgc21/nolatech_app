import { Types } from "mongoose";

export interface IRole{
    _id: Types.ObjectId;
    name: "Admin" | "Manager" | "Employee";
    createdAt?: Date;
    updatedAt?: Date;
}