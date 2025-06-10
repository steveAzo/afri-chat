import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import { UserModel } from "../models/user";
import { UserRole } from "../models/user/index.types";

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers.authorization

    if (!headers || !headers.startsWith('Bearer ')) {
        throw new AppError("Token is missing")
    }

    const token: string = headers.split(' ')[1]
    try {

        const decodedToken = verifyToken(token)

        const user = await UserModel.findById(decodedToken.id)

        if (!user) {
            throw new AppError("User no longer exists", 401)
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
    }

}

// authenticate middleware
export const restrictedTo = (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            if (!req.user) {
                throw new AppError("You are not authenticated", 401)
            }

            if (!allowedRoles.includes(req.user.role as UserRole)) {
                throw new AppError("You are restricted from accessing this route", 403)
            }

            next()
        } catch (error) {
            next(error)
        }

    }
}

