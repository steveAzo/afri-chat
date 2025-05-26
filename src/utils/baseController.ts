import { Request, Response, NextFunction } from "express";

// this is how every controller function will look like
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const baseController = (controller: AsyncController) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}