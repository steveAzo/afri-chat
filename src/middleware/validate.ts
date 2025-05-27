import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

const validate = (schema: ZodSchema, source: "body" | "params" | "query" = "body") => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[source])
            next()
        } catch (error) {
            // throw new AppError(`Validation Error: ${error instanceof AppError ? error.message : "Not specified"}`)
            if (error instanceof ZodError) {
                next(error)
            } else {    
                throw new AppError(`Validation Error: ${error instanceof AppError ? error.message : "Not specified"}`)
            }
        }
    }
}

export default validate
