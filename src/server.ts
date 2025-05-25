import express from 'express'
import { config } from '../src/config/config'
import errorHandler from './middleware/errorHandler'

const PORT = config.port

const app = express()

app.use(express.json())


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})