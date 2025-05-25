import { IUser, IUserDoc } from "../models/user/index.types";
import QueryOptions from "../types/common";
import { UserModel } from "../models/user";
import { hash } from "bcryptjs";

export const createUser = async (userData: IUser): Promise<IUserDoc> => {
    const pass_ = userData.password
    const hashedPassword = await hash(pass_, 10)
    
    const user = await UserModel.create({...userData, password: hashedPassword})

    return user
}

export const getAllUsers = async ({
    filter = {},
    sort = {},
    limit = 50,
    skip = 0
}: QueryOptions = {}): Promise<IUserDoc[] | null> => {
    const users = await UserModel
    .find(filter)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    return users
}

export const getUserById = async (id: string): Promise<IUserDoc | null> => {
    const user = await UserModel.findById(id)
    
    return user
}

export const updateUserById = async (id: string, updateData: Partial<IUser>): Promise<IUserDoc | null> => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {new: true})

    return updatedUser
}

export const deleteUserById = async (id: string): Promise<IUserDoc | null> => {
    const deletedUser = await UserModel.findByIdAndDelete(id)

    return deletedUser
}