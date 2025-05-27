import { z } from "zod";
import { UserRole, UserStatus } from "../models/user/index.types";

export const userCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(6, "Password must be atleast 6 characters").optional(),
    role: z.enum([UserRole.Admin, UserRole.User]).default(UserRole.User).optional(),
    status: z.enum([UserStatus[0], UserStatus[1]]).default(UserStatus[1]).optional(),
})

export const userUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["user", "admin"]).optional(),
    status: z.enum(["online", "offline"]).optional(),
})

export const userIdParamsSchema = z.object({
    id: z.string().min(1, "ID required")
})