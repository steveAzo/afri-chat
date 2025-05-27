import { SchemaTypes, Schema, model } from "mongoose";
import { IUserDoc, UserRole, UserStatus } from "./index.types";

const UserSchema = new Schema <IUserDoc> ({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
    },
    password: {
        type: SchemaTypes.String,
    },
    role: {
        type: SchemaTypes.String,
        enum: Object.values(UserRole),
        default: UserRole.User,
    },
    status: {
        type: SchemaTypes.String,
        enum: UserStatus,
        default: "offline",
    }
})

export const UserModel = model('User', UserSchema)