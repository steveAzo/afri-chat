import express from 'express'
import { 
    createUserController, 
    getAllUsersController, 
    getUserByIdController, 
    updateUserByIdController, 
    deleteUserController 
} from "../controllers/user.controller";
import { userCreateSchema, userIdParamsSchema, userUpdateSchema } from '../validation/user.validation';
import validate from '../middleware/validate';
import { getCurrentUser, restrictedTo } from '../middleware/auth.middleware';
import { UserRole } from '../models/user/index.types';

const userRouter = express.Router()

userRouter.post('/', validate(userCreateSchema, "body"), createUserController)
userRouter.get('/:id', validate(userIdParamsSchema, "params"), getCurrentUser, getUserByIdController)
userRouter.patch('/:id', getCurrentUser, validate(userIdParamsSchema, "params"), validate(userUpdateSchema, "body"), updateUserByIdController)
userRouter.get('/', getCurrentUser, restrictedTo(UserRole.Admin), getAllUsersController)
userRouter.delete('/:id', validate(userIdParamsSchema, "params"), getCurrentUser, deleteUserController)


export default userRouter

