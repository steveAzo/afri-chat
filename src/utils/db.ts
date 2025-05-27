import { config } from "../config/config";
import mongoose from "mongoose";
import { AppError } from "./AppError";

export const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(config.dbUrl, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        
        // connection event listeners
        console.log("connected successfully")
        mongoose.connection.on("connected", () => console.log("DB connected successfully"))
        mongoose.connection.on("error", (err) => console.error("MongoDB connection error", err))
        mongoose.connection.on("disconnected", () => console.warn("DB disconnected"))
        return connection
    } catch (error) {
        throw new AppError(`DB connection Error: ${error instanceof Error ? error.message : "Unknown Error"}`, 500)
    }
}