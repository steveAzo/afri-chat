import { Request, Response, NextFunction, response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { config } from "../config/config";

// export interface AppError extends Error {
//     status?: number
// }

// const errorHandler = (
//     err: AppError, 
//     req: Request, 
//     res: Response, 
//     next: NextFunction
// ) => {
//     res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
// }



const errorHandler = (
    err: AppError | ZodError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: err.errors.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            }))
        })
    }

    const status = err instanceof AppError ? err.status : 500
    const message = err.message || "Internal Server Error"

    const isDev = config.nodeEnv != "production"

    res.status(status).json({
        success: false,
        message: message,
        ...(isDev && {stack: err.stack})
    })

}
export default errorHandler;