import { IUser } from "../models/user/index.types";
import { baseController } from "../utils/baseController";
import { UserModel } from "../models/user";
import { AppError } from "../utils/AppError";
import { compare } from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const loginController = baseController( async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new AppError("email or password required")
    }

    const user = await UserModel.findOne({ email })
    if (!user) {
        throw new AppError("User not found", 404)
    }

    const isPasswordCorrect = await compare(password, user.password!)
    if (!isPasswordCorrect) {
        throw new AppError("Password is invalid")
    }

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    }

    const token = generateToken(payload)

    res.status(200).json({
        success: true,
        message: "Login Successful",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        }
    })
 
})