import { IUserDoc } from "../models/user/index.types";

declare global {
    namespace Express {
        interface Request {
            user?: IUserDoc
        }
    }
}