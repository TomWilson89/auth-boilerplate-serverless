import { Document } from "mongoose";

export interface IUSer {
  email: string;
  password: string;
}

export interface IUserDocument extends IUSer, Document {
  createdAt: Date;
  matchPassword(password: string): Promise<boolean>;
  getResetPasswordToken(): string;
  getToken(): string;
}
