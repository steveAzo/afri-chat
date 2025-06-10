import dotenv from 'dotenv'

dotenv.config()

export interface Config {
    port: number;
    nodeEnv: string;
    dbUrl: string
    jwtSecret?: string
}

export const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DB_URL || 'mongoose',
    jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET',
}