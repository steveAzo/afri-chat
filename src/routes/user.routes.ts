import express from 'express'
import { 
    createUserController, 
    getAllUsersController, 
    getUserByIdController, 
    updateUserByIdController, 
    deleteUserController 
} from "../controllers/user.controller";
import { userCreateSchema } from '../validation/user.validation';
import validate from '../middleware/validate';

const userRouter = express.Router()

userRouter.post('/', validate(userCreateSchema, "body"), createUserController)


export default userRouter

