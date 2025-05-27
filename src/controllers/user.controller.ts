import { Request, Response, NextFunction } from "express";
import { 
    createUser, 
    deleteUserById, 
    getAllUsers, 
    getUserById, 
    updateUserById,
    
 } from "../services/user.service";
import { IUser } from "../models/user/index.types";
import { AppError } from "../utils/AppError";
import { baseController } from "../utils/baseController";
import { userCreateSchema } from "../validation/user.validation";


// export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userData: IUser = req.body
//         const user = await createUser(userData)

//         if (!user) {
//             return res.status(400).json({ error: "User creation failed" })
//         }

//         res.status(201).json(user)
//     } catch (error) {
//         console.error("An error occurred whilst creating user", error)
//         res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" })
//     }
// }


// export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { sort, limit, skip } = req.query
//         const users = await getAllUsers({
//             sort: sort ? JSON.parse(sort as string) : {},
//             limit: Number(limit) || 50,
//             skip: Number(skip) || 0
//         })
//         if (!users?.length) {
//             return res.status(404).json({ error: "No users found" })
//         }

//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" })
//     }
// }

// export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.params.id
//         if (!userId) {
//             return res.status(400).json({ error: "User ID is required" })
//         }

//         const user = await getUserById(userId)
//         if (!user) {
//             return res.status(404).json({ error: "User not found" })
//         }

//         res.status(200).json(user)
//     } catch (error) {
//         res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" })
//     }
// }

// export const updateUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.params.id 
//         if (!userId) {
//             return res.status(400).json({ error: "User ID is required" })
//         }
//         const userData: Partial<IUser> = req.body
//         const updatedUser = await updateUserById(userId, userData)

//         if (!updatedUser) {
//             return res.status(400).json({ error: "An error occured whilst updating user" })
//         }

//         res.status(200).json(updatedUser)
//     } catch (error) {
//         res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" })
//     }
// }

// export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.params.id 
//         if (!userId) {
//             return res.status(400).json({ error: "User ID is required" })
//         }
//         const deletedUser = await deleteUserById(userId)

//         if (!deletedUser) {
//             return res.status(404).json({ error: "No user with this id found" })
//         }

//         res.status(200).json({ message: "User deleted Successfully", data: deletedUser })
//     } catch (error) {
//         res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" })
//     }
// }

export const createUserController = baseController(async (req, res, next) => {
    // const userData: IUser = userCreateSchema.parse(req.body)
    const userData: IUser = req.body

    const user = await createUser(userData)

    if (!user) {
        throw new AppError("Error creating User", 400)
    }

    res.status(201).json(user)
})

export const getAllUsersController = baseController(async (req, res, next) => {
    const { sort, limit, skip } = req.query
    const users = await getAllUsers({
        sort: sort ? JSON.parse(sort as string) : {},
        limit: Number(limit) || 50,
        skip: Number(skip) || 0
    })

    res.status(200).json({ success: true, data: users })
})

export const getUserByIdController = baseController(async (req, res, next) => {
    const userId = req.params.id
    if (!userId) {
        throw new AppError("User ID is required", 400)
    }
    const user = await getUserById(userId)
    if (!user) {
        throw new AppError("User not found", 404)
    }

    res.status(200).json({ success: true, data: user })
})

export const updateUserByIdController = baseController(async (req, res, next) => {
    const userId = req.params.id
    if (!userId) {
        throw new AppError("User ID is required", 400)
    }

    const updateData = req.body

    const updatedUser = await updateUserById(userId, updateData)
    if (!updatedUser) {
        throw new AppError("User update failed", 404)
    }

    res.status(200).json(updatedUser)
})

export const deleteUserController = baseController(async (req, res, next) => {
    const userId = req.params.id 
    if (!userId) {
        throw new AppError("User ID is required", 400)
    }

    const deletedUser = await deleteUserById(userId)
    if(!deletedUser) {
        throw new AppError("User not found or already deleted", 404)
    }

    res.status(200).json({ success: true, message: "User deleted Successfully", data: deletedUser })
})