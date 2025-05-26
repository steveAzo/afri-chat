import express from 'express'
import { 
    createUserController, 
    getAllUsersController, 
    getUserByIdController, 
    updateUserByIdController, 
    deleteUserController 
} from "../controllers/user.controller";

const userRouter = express.Router()

userRouter.post('/', createUserController)


export default userRouter

