import { Document, Types } from "mongoose";

export const UserStatus = ["online", "offline"] as const
export type UserStatusType = typeof UserStatus[number]

export interface IUser {
    name: string
    email: string
    password: string 
    status: UserStatusType
}

export interface IUserDoc extends Document, IUser{}