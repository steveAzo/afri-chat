import { Document, Types } from "mongoose";

export const UserStatus = ["online", "offline"] as const
export type UserStatusType = typeof UserStatus[number]
export enum UserRole {
    User = "user",
    Admin = "admin"
}

export interface IUser {
    name: string
    email: string
    password?: string 
    status?: UserStatusType
    role?: UserRole
}

export interface IUserDoc extends Document, IUser{}