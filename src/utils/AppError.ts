export class AppError extends Error {
    status: number
    code?: number

    constructor(message: string, status = 500, code?: number) {
        super(message)
        this.status = status
        this.code = code 
        this.name = this.constructor.name 
        Error.captureStackTrace(this, this.constructor)
    }
}