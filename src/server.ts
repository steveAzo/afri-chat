import express from 'express'
import { config } from './config/config'
import errorHandler from './middleware/errorHandler'
import userRouter from './routes/user.routes'
import { dbConnection } from './utils/db'

const PORT = config.port

const app = express()

app.use(express.json())

app.use('/user', userRouter)


app.use(errorHandler)

const startServer = async () => {
    try {
        await dbConnection()
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
    } catch (error) {
        console.error("Failed to start server:", error)
        process.exit(1)
    }
}

startServer()
