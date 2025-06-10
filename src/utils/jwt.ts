import jwt from "jsonwebtoken"
import { config } from "../config/config"

interface jwtPayload {
    id: string,
    email: string,
    role: string
}

export const generateToken = (payload: object) => {
    return jwt.sign(payload, config.jwtSecret!, {
        expiresIn: '7d',
    })
}

export const verifyToken = (token: string): jwtPayload  => {
    return jwt.verify(token, config.jwtSecret!) as jwtPayload
}