import dotenv from 'dotenv'

dotenv.config()

export interface Config {
    port: number;
    nodeEnv: string;
    dbUrl: string
}

export const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DB_URL || 'mongoose',
}